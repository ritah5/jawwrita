import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { dashboardData } from "./l18n";

export const AuthContext = createContext();

function reducer(state, action) {
  return {
    ...state,
    [action.selection]: action.action,
  };
}
export const AuthProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(reducer, {
    info: { email: "", firstname: "", lastname: "", max_storage: 20 },
  });
  const [isLoading, setLoading] = useState(false);
  const [isLogged, setLogged] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  const logout = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        setLogged(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const value = {
    isLogged,
    logout,
    setAdmin,
    setLogged,
    user,
    dispatchUser,
  };

  useEffect(() => {
    const getAuth = async () => {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/auth/check-cookie`, {
          withCredentials: true,
        })
        .then(({ data }) => {
          dispatchUser({
            selection: "info",
            action: {
              ...data,
            },
          });
          setLogged(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getAuth();
  }, []);
  if (isLoading) {
    return (
      <div
        className="df aic jcc"
        style={{
          height: "100vh",
        }}
      >
        {dashboardData.loading}
      </div>
    );
  } else {
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
