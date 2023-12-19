import { dashboardData, toasterData } from "../../l18n";
import FileDropper from "./modules/fileDropper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { Button, Checkbox } from "../../modules";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { formatSize, formaterDate } from "../../utils";
import { HiDownload } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi2";

import "./Dashboard.css";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const { user } = useAuth();

  const handleFileDownload = async (key) => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/user/download-file`,
        { filename: key },
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        const a = document.createElement("a");
        a.href = data;
        a.click();
      });
  };

  const handleFileDelete = async (key) => {
    toast.promise(
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/user/delete-file`,
          { filename: key },
          {
            withCredentials: true,
          }
        )
        .then((data) => setData((prev) => prev.filter((e) => e.Key !== key)))
        .catch((err) => {
          throw err;
        }),
      {
        success: toasterData.deletedSuccess,
        loading: toasterData.loading,
        error: toasterData.error,
      }
    );
  };
  useEffect(() => {
    const getData = async () => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user/get-info`, {
          withCredentials: true,
        })
        .then(({ data }) => {
          setData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getData();
  }, []);

  return (
    <div className="df col" style={{ padding: "0 20px" }}>
      <h1>{`${dashboardData.title} ${user.info.firstname}`}</h1>

      <div className="df aic jcsb">
        <FileDropper setData={setData} />
      </div>
      <div
        style={{
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div className="df col">
          <div
            className="df col"
            style={{
              background: "var(--verydark)",
              border: "1px solid var(--grey)",
              borderRadius: "8px",
              marginBottom: "20px",
              padding: "12px 16px",
            }}
          >
            <div className="df aic jcsb">
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "1.3rem",
                  color: "var(--grey)",
                }}
              >
                Fichiers
              </span>
              <Button className="btn df aic link-btn">
                Ajouter un nouveau fichier
                <HiOutlinePlusCircle size={30} />
              </Button>
            </div>

            <div
              style={{
                display: "grid",
                marginTop: "20px",
                color: "var(--grey)",
                fontWeight: 500,
                gridTemplateColumns: "100px 350px 1fr 1fr 100px",
              }}
            >
              <Checkbox
                style={{
                  justifySelf: "start",
                  marginLeft: "10px",
                }}
              />
              <span>Nom du fichier</span>
              <span>Taille</span>
              <span>Modifié le</span>
            </div>
            <div
              style={{
                borderBottom: "2px solid var(--grey)",
                marginTop: "10px",
              }}
            />
            <div>
              {data
                .sort(
                  (a, b) => new Date(b.LastModified) - new Date(a.LastModified)
                )
                .map((e, i) => (
                  <div className="item-dl-row" key={i}>
                    <Checkbox
                      style={{
                        justifySelf: "start",
                        marginLeft: "10px",
                      }}
                    />
                    <span>{e.Key.slice(e.Key.indexOf("/") + 1)}</span>
                    <span>{formatSize(e.Size)}</span>
                    <span>{formaterDate(e.LastModified)}</span>
                    <div className="df aic">
                      <HiDownload
                        className="btn btn-icon"
                        size={20}
                        onClick={() => handleFileDownload(e.Key)}
                      />
                      <HiOutlineTrash
                        className="btn btn-icon btn-red"
                        size={20}
                        style={{ marginLeft: "12px" }}
                        onClick={() => handleFileDelete(e.Key)}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
