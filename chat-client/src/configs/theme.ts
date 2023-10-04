import { createTheme } from "@mui/material"
export const PRIMARY_MAIN = "#20a258"
export const PRIMARY_LIGHT = "#3bad6c"
export const SECONDARY_MAIN = "#feab0b"
export const SECONDARY_LIGHT = "#feab0bbf"
export const BACKGROUND_COLOR = "#f4ede2a6"

const MONTSERRAT_FONT = "'Montserrat', sans-serif"
const POPPINS_FONT = "'Poppins', sans-serif"

export const theme = createTheme({
  // Palette
  palette: {
    primary: {
      main: PRIMARY_MAIN,
      light: PRIMARY_LIGHT,
    },
    secondary: {
      main: SECONDARY_MAIN,
      light: SECONDARY_LIGHT,
    },
  },

  // Typography
  typography: {
    fontFamily: MONTSERRAT_FONT,
    h1: { fontSize: "4rem" },
    h2: { fontSize: "3rem" },
    h3: { fontSize: "2.5rem" },
    h4: { fontSize: "1.25rem", fontWeight: 700 },
    h5: { fontSize: "1.75rem" },
    h6: { fontSize: "1rem", fontWeight: 700 },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: PRIMARY_MAIN,
        },
      },
    },

    MuiToolbar: {
      styleOverrides: {
        gutters: {
          padding: "8px 14px",
          minHeight: "auto !important",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          minWidth: "100px",
          minHeight: "3em",
          borderRadius: "20px",
          backgroundColor: PRIMARY_MAIN,
          color: "#fff",
          textTransform: "none",
          "& > span": {
            fontWeight: 500,
          },
          "&:hover": {
            borderColor: "transparent",
            backgroundColor: PRIMARY_LIGHT,
          },
        },
        contained: {
          boxShadow: "none",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          border: "1px solid transparent",
          outline: "none",
          fontFamily: POPPINS_FONT,
          backgroundColor: "#f6f6f6",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: PRIMARY_LIGHT,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: PRIMARY_MAIN,
          },
        },
        notchedOutline: {
          borderColor: "#f6f6f6",
        },
        input: {
          "&::placeholder": {
            opacity: 0.8,
            fontSize: "0.9rem",
            fontWeight: 500,
          },
        },
      },
    },
  },
})
