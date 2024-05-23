import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import theme from "./theme/theme.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nextProvider i18n={i18n}>
    <ChakraProvider theme={theme} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </I18nextProvider>
);
