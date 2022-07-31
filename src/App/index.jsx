import { useSelector } from "react-redux";

// Components
import { Modal, Notifications } from "../Components";
import Routes from "./Routes";
import { Toaster } from "react-hot-toast";

// Functions
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");

function App() {
  const { modalProps, notifications } = useSelector((state) => {
    return state.uiData;
  });

  return (
    <>
      {modalProps && <Modal {...modalProps}></Modal>}

      <Toaster
        position="top-center"
        toastOptions={{
          style: { fontSize: "1.2rem", padding: "0.75rem" },
        }}
      />

      {/* {notifications.length && <Notifications notifications={notifications} />} */}

      <Routes />
    </>
  );
}

export default App;
