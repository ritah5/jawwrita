import { Link, useLocation } from "react-router-dom";
import LOGO from "../assets/logo.png";
import { navbarData } from "../l18n";
import { useAppState } from "../StateContext";
export default function Navbar() {
  const { appState } = useAppState();
  const location = useLocation();
  return (
    <div
      className="df col jcsb"
      style={{
        background: "var(--verydark)",
        width: appState.sidebar.isOpen ? "200px" : "100px",
        borderRight: "1px solid var(--dark-divider)",
        transition: " all 0.3s ease 0s",
        overflowX: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        overflowY: "auto",
      }}
    >
      <div
        className="df jcc aic col"
        style={{
          marginTop: "20px",
        }}
      >
        <img
          src={LOGO}
          width={appState.sidebar.isOpen ? 150 : 75}
          style={{
            filter: "invert(1)",
          }}
        />
      </div>

      <div
        className="df col"
        style={{
          margin: "0 20px",
        }}
      >
        {navbarData.links.map((e, i) => (
          <Link
            to={e.path}
            className={`btn df aic jcc ${
              appState.sidebar.isOpen ? "" : "btn-icon"
            } ${location.pathname === e.path ? "selected" : ""} `}
            key={i}
            style={{
              marginTop: "10px",
              padding: appState.sidebar.isOpen ? "10px 20px" : "10px",
            }}
          >
            {appState.sidebar.isOpen ? e.icon : e.fat_icon}
            {appState.sidebar.isOpen ? (
              <span
                style={{
                  marginLeft: "5px",
                  fontSize: "1.1rem",
                }}
              >
                {e.name}
              </span>
            ) : null}
          </Link>
        ))}
      </div>
      <div></div>
    </div>
  );
}
