/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#E5E5E5",
        primary: {
          blue: {
            light: {
              100: "#F5F8FD",
            },
          },
          white: "#FFFFFF",
          anthracite: {
            100: "#1A2328",
            80: "#484F53",
            70: "#5F6569",
            50: "#8C9193",
            25: "#C6C8C9",
          },
        },
        secondary: {
          blue: {
            pale: {
              40: "#BAC6D8",
              30: "#CBD4E2",
              15: "#E5EAF0",
              10: "#EEF1F5",
              5: "#F6F8FA",
              100: "#0088DA",
            },
          },
        },
        alive: {
          icon: "#03A99F",
        },
        "saturated-red-100": "#FF2626",
      },
      fontFamily: {
        oswald: ["Oswald"],
      },
    },
  },
  plugins: [],
};
