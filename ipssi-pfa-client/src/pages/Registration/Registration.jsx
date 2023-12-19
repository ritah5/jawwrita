import { useState } from "react";
import { errorData, registrationData } from "../../l18n";
import { Button, Input } from "../../modules";
import axios from "axios";
import { capitalizeFirstLetter } from "../../utils";
import { useAuth } from "../../AuthContext";
export default function Registration() {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[A-Za-z]).{8,}$/;

  const [loginMode, setLoginMode] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setLogged, dispatchUser } = useAuth();
  const handleRegister = () => {
    setError(null);
    if (
      !password ||
      !email ||
      (!lastname && !loginMode) ||
      (!firstname && !loginMode)
    ) {
      setError(registrationData.missingFields);
      return;
    }
    if (!email.match(emailRegex)) {
      setError(registrationData.emailRegex);
      return;
    }
    if (!password.match(passwordRegex)) {
      setError(registrationData.passwordRegex);
      return;
    }
    setLoading(true);
    if (loginMode) {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          {
            email,
            password,
          },
          {
            withCredentials: "include",
          }
        )
        .then((res) => {
          setLogged(true);
          dispatchUser({
            selection: "info",
            action: { ...data },
          });
          setLoading(false);
        })
        .catch((err) => {
          setError(registrationData.invalidCredentials);
          setLoading(false);
        });
      return;
    } else {
      axios
        .post(`${import.meta.env.VITE_API_URL}/auth/register`, {
          email,
          password,
          firstname: capitalizeFirstLetter(firstname),
          lastname: capitalizeFirstLetter(lastname),
        })
        .then(({ data }) => {
          setLogged(true);
          dispatchUser({
            selection: "info",
            action: { ...data },
          });
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            setError(registrationData.alreadyUsedMail);
          } else {
            setError(registrationData.invalidCredentials);
          }
          setLoading(false);
        });
      return;
    }
  };
  return (
    <div className="df col aic jcc">
      <form className="df col aic">
        <h1>
          {loginMode ? registrationData.login : registrationData.register}
        </h1>
        {!loginMode ? (
          <Input
            autoComplete="on"
            onChange={({ target }) => setFirstname(target.value)}
            value={firstname}
            placeholder={registrationData.firstnamePlaceholder}
          />
        ) : null}
        {!loginMode ? (
          <Input
            autoComplete="on"
            style={{
              marginTop: "20px",
            }}
            onChange={({ target }) => setLastName(target.value)}
            value={lastname}
            placeholder={registrationData.lastnamePlaceholder}
          />
        ) : null}
        <Input
          autoComplete="on"
          style={{
            marginTop: "20px",
          }}
          onChange={({ target }) => setEmail(target.value)}
          value={email}
          placeholder={registrationData.emailPlaceholder}
        />
        <Input
          autoComplete="on"
          style={{
            marginTop: "20px",
          }}
          onChange={({ target }) => setPassword(target.value)}
          value={password}
          placeholder={registrationData.passwordPlaceholder}
        />
        {loginMode ? (
          <div className="df aic">
            <span
              style={{
                cursor: "pointer",
                justifySelf: "end",
              }}
            >
              {registrationData.forgottenPassword}
            </span>
          </div>
        ) : null}
      </form>
      <div
        className="df col"
        style={{
          marginTop: "20px",
        }}
      >
        <span
          onClick={() => setLoginMode((prev) => !prev)}
          style={{
            textDecoration: "underline",
            marginLeft: "5px",
            cursor: "pointer",
          }}
        >
          {loginMode
            ? registrationData.notSignedIn
            : registrationData.alreadySignedIn}
        </span>

        <Button
          style={{ width: "15rem", marginTop: "2.5px" }}
          onClick={handleRegister}
          loading={loading}
        >
          {loginMode
            ? registrationData.btn.login
            : registrationData.btn.register}
        </Button>
      </div>
      {error ? (
        <span
          style={{
            color: "red",
            marginTop: "2.5px",
          }}
        >
          {error}
        </span>
      ) : null}
    </div>
  );
}
