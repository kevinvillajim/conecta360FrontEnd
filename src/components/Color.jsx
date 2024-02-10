import {createTheme} from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			light: "#e0ecc0",
			main: "#93C120",
			dark: "#306900",
			contrastText: "#fff",
		},
		secondary: {
			light: "#b0dddb",
			main: "#13a19a",
			dark: "#00645b",
			contrastText: "#000",
		},
	},
});

export default theme;
