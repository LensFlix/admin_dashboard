import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { MoralisProvider } from "react-moralis";
import { Provider } from "react-redux";
import App from "./App.jsx";
import Navbar from "./Components/Navbar.jsx";
import store from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MoralisProvider initializeOnMount={false}>
    <ChakraProvider>
      <Provider store={store}>
        <Navbar />
        <App />
      </Provider>
    </ChakraProvider>
  </MoralisProvider>
);
