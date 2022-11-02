import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import App from "./App";
import Login from "./pages/Login";
import Overlay from "./components/Overlay/Overlay";

import { Modal } from "./components";
import { Toaster } from "react-hot-toast";

const index = () => {
  let { isLoading, modalProps } = useSelector((state) => {
    return state.uiData;
  });
  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "1.2rem",
            padding: "0.75rem",
          },
        }}
      />

      {isLoading && <Overlay isLoading={isLoading} />}

      {modalProps && <Modal {...modalProps} />}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="app/*" element={<App />} />
      </Routes>
    </div>
  );
};

export default index;
