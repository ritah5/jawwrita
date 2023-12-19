import { Link } from "react-router-dom";
import { Button } from ".";
import { headerData } from "../l18n";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { HiUser } from "react-icons/hi2";

import { useAuth } from "../AuthContext";
import LOGO from "../assets/logo.png";
import { useAppState } from "../StateContext";
export default function Header() {
  const { isLogged, setLogged, logout } = useAuth();
  const { appState, dispatchAppState } = useAppState();

  return (
    <div
      style={{
        background: "var(--verydark)",
        borderBottom: "1px solid var(--dark-divider)",
        marginLeft: !isLogged
          ? ""
          : appState.sidebar.isOpen && isLogged
          ? "200px"
          : "100px",
      }}
    >
      <div
        className="df aic jcsb"
        style={{
          height: "80px",
          padding: "0 10px",
        }}
      >
        <div
          style={{
            marginLeft: "12px",
          }}
        >
          {isLogged ? (
            <TbLayoutSidebarLeftCollapse
              className="btn"
              size={24}
              cursor="pointer"
              style={{
                border: "none",
              }}
              onClick={() => {
                dispatchAppState({
                  selection: "sidebar",
                  action: { isOpen: !appState.sidebar.isOpen },
                });
              }}
            />
          ) : (
            <img
              src={LOGO}
              width={100}
              style={{
                filter: "invert(1)",
              }}
            />
          )}{" "}
        </div>
        {!isLogged ? (
          <div className="df">
            <Link className="btn link-btn" style={{ marginRight: "12px" }}>
              {headerData.register}
            </Link>
            <Link className="btn link-btn">{headerData.login}</Link>
          </div>
        ) : (
          <div className="df">
            <Link
              to={{
                pathname: "/my-account",
              }}
              className="btn link-btn df aic"
              style={{
                marginRight: "12px",
              }}
            >
              <HiUser
                size={16}
                style={{
                  marginRight: "5px",
                }}
              />
              <span>{headerData.myAccount}</span>
            </Link>
            <Button className="btn link-btn" onClick={logout} style={{}}>
              {headerData.logout}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
