export interface dataType {
  id: number;
  name: string;
  image: string;
  origin: {
    name: string;
    url: string;
  };
  gender: string;
  status: "Alive" | "unknown" | "Dead";
  species: string;
  isChecked: boolean;
}
