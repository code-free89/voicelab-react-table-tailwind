import React, { useEffect, useState } from "react";
import { MyInput } from "./components/myInput";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Layout } from "./layout";
import { MySelect } from "./components/mySelect";
import { DataTable } from "./components/dataTable";
import axios from "axios";
import { dataType } from "./interface/dataType";
import styles from "./App.module.css";

function App() {
  const speciesItems = [
    "Human",
    "Alien",
    "Humanoid",
    "Poopybutthole",
    "Mythological",
    "Creature",
    "Animal",
    "Robot",
    "Cronenberg",
    "Disease",
    "unknown",
  ];
  const tableHeadItems = ["Name", "Avatar", "Origin", "Gender", "Status"];
  const [selectedItems, setSelectedItems] = useState<string[]>(speciesItems);
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const [characters, setCharacters] = useState<number>(0);
  const [tableData, setTableData] = useState<dataType[]>([]);

  const getCharactersBySpecies = async () => {
    const charaterNumber: number[] = Array.from(Array(characters).keys());
    const characterString: string = charaterNumber
      .slice(1)
      .join(",")
      .toString();
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${characterString}`
      );
      const responseData: dataType[] = response.data;
      const characterData = responseData.filter(
        (character) =>
          selectedItems.includes(character.species) &&
          character.name.includes(searchText)
      );
      const totalCharacters = characterData.length;
      const totalPages = Math.floor(totalCharacters / 20) + 1;
      setPages(totalPages);
      setTableData(
        characterData.slice(
          (currentPage - 1) * 20,
          currentPage === totalPages ? totalCharacters : currentPage * 20 - 1
        )
      );
    } catch (error) {
      setTableData([]);
      console.error(error);
    }
  };

  const getCharacters = async () => {
    if (selectedItems.length !== speciesItems.length) {
      getCharactersBySpecies();
    } else {
      let params: { [key in string]: any } = {};
      params = { ...params, page: currentPage };
      if (searchText.replace(/\s/g, "").length > 0) {
        params = { ...params, name: searchText };
      }
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character`,
          { params }
        );
        setPages(response.data.info.pages);
        setCharacters(response.data.info.count);
        setTableData(response.data.results);
      } catch (error) {
        setTableData([]);
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getCharacters();
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 1) {
      getCharacters();
    } else {
      setCurrentPage(1);
    }
  }, [searchText, selectedItems]);

  return (
    <Layout>
      <div className="flex">
        <MyInput
          type="input"
          placeHolder="Search"
          iconPosition="tail"
          onChange={setSearchText}
          icon={
            <MagnifyingGlassIcon
              className={styles.appInputIcon}
              aria-hidden="true"
            />
          }
        />
        <MySelect
          items={speciesItems}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
      <DataTable
        isCheckable={true}
        header={tableHeadItems}
        tableData={tableData}
        isPagination={true}
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Layout>
  );
}

export default App;
