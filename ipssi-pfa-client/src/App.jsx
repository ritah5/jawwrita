import { Toaster } from "react-hot-toast";
import "./App.css";
import { AuthProvider } from "./AuthContext";
import { StateProvider } from "./StateContext";

import { RouterWrapper } from "./modules/RouterWrapper";
import { IconContext } from "react-icons";
function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <IconContext.Provider value={{ size: 70 }}>
        <AuthProvider>
          <StateProvider>
            <RouterWrapper />
          </StateProvider>
        </AuthProvider>
      </IconContext.Provider>
    </>
  );
}

export default App;
