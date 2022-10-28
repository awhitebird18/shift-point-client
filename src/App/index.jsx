import { useSelector } from "react-redux";

// Components
import { Modal } from "../Components";
import Routes from "./Routes";
import { Toaster } from "react-hot-toast";

// Functions
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");

console.log(process.env.REACT_APP_BASE_URL);

function App() {
  const { modalProps } = useSelector((state) => {
    return state.uiData;
  });

  return (
    <>
      {modalProps && <Modal {...modalProps}></Modal>}

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "1.2rem",
            padding: "0.75rem",
          },
        }}
      />

      <Routes />
    </>
  );
}

export default App;
