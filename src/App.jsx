import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/Color";
import RoutesComponent from "./Routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "*",
    element: <RoutesComponent />,
  },
]);

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
