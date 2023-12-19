import { useState } from "react";
import { MyAccountData, registrationData } from "../../l18n";
import { Input, Button } from "../../modules/index";
import { useAuth } from "../../AuthContext";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function MyAccount() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [storage, setStorage] = useState(user.info.max_storage);

  const handleChangeEmail = () => {};

  return (
    <div className="df col" style={{ padding: "0 20px" }}>
      <h1>{MyAccountData.title}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "400px 250px",
        }}
      >
        <div
          className="df col"
          style={{
            marginRight: "100px",
          }}
        >
          <span
            style={{
              fontWeight: 500,
              padding: "5px",
            }}
          >
            {MyAccountData.email}
          </span>
          <Input
            placeholder={user.info.email}
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Button style={{ marginTop: "12px" }} onClick={handleChangeEmail}>
            {MyAccountData.edit}
          </Button>
        </div>
        <div className="df col">
          <span
            style={{
              fontWeight: 500,
              padding: "5px",
            }}
          >
            {MyAccountData.currentStorage}
          </span>

          <Slider
            step={20}
            dots
            value={storage}
            min={user.info.max_storage}
            max={100}
            onChange={(e) => setStorage(e)}
            railStyle={{
              background: "var(--grey)",
            }}
            trackStyle={{
              background: "var(--primary)",
            }}
            dotStyle={{
              background: "var(--lightprimary)",
            }}
            activeDotStyle={{
              border: "2px solid var(--grey)",
              background: "var(--lightprimary)",
            }}
            style={{
              marginTop: "12px",
            }}
          />
          <Button style={{ marginTop: "20px" }}>{` ${
            MyAccountData.goTo
          } ${storage} ${MyAccountData.giga} : ${
            storage === user.info.max_storage ? 0 : storage - 20
          } ${MyAccountData.euro}`}</Button>
        </div>
      </div>
    </div>
  );
}
