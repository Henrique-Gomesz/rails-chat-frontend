import { ToastContainer } from "react-toastify";

interface MainScreenProps {
  children: React.ReactNode;
}

export const MainScreen = ({ children }: MainScreenProps) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        progressStyle={{ background: "#cb141c" }}
      />
    </>
  );
};
