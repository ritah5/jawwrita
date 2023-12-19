import { useDropzone } from "react-dropzone";

import { Button } from "../../../modules";
import { dashboardData, toasterData } from "../../../l18n";
import { HiDocumentText } from "react-icons/hi2";
import toast from "react-hot-toast";
import axios from "axios";
import { formatSize } from "../../../utils";
export default function FileDropper({ setData }) {
  const onFileDrop = (file) => {
    if (file.size > 30000000) {
      toast.error("File is too large");
      return {
        code: "size-too-large",
        message: `file is larger than 30MB`,
      };
    }

    return null;
  };

  const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: true,
    maxFiles: 5,
    maxSize: 5000000,
    validator: onFileDrop,
  });

  const handleSaveFile = () => {
    const form = new FormData();
    acceptedFiles.forEach((file, i) => {
      form.append("file", file);
    });

    toast.promise(
      axios
        .post(`${import.meta.env.VITE_API_URL}/user/put-file`, form, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          setData(data);
        })
        .catch((err) => {
          throw err;
        }),
      {
        success: toasterData.putSuccess,
        error: toasterData.error,
        loading: toasterData.loading,
      }
    );
  };
  return (
    <div>
      <div
        {...getRootProps({ className: "dropzone df col aic jcc" })}
        style={{
          border: "1px dashed var(--grey)",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px 250px",
          }}
        >
          <div
            className="df aic jcc"
            style={{
              boxShadow:
                "0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)",
              borderRadius: "8px",
              marginRight: "12px",
              height: "100px",
              background: "var(--verydark)",
            }}
          >
            <HiDocumentText size={40} color="var(--primary)" />
          </div>
          {!acceptedFiles.length ? (
            <div className="df col">
              <span
                style={{
                  fontWeight: 500,
                  fontSize: "1.2rem",
                }}
              >
                {dashboardData.dropFile}
              </span>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  whiteSpace: "nowrap",
                  color: "var(--primary)",
                }}
              >
                {dashboardData.format}
              </span>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  whiteSpace: "nowrap",
                  color: "var(--primary)",
                }}
              >
                {dashboardData.maxLength}
              </span>
            </div>
          ) : (
            <div
              className="df col"
              style={{
                overflowY: "scroll",
                height: "100px",
              }}
            >
              {acceptedFiles.map((file) => (
                <div className="df" key={file.path}>
                  <span
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "150px",
                    }}
                  >
                    {file.path}
                  </span>

                  <span>{`- ${formatSize(file.size)}`}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button style={{ marginTop: "20px" }} onClick={open}>
          {dashboardData.chooseFile}
        </Button>
        {acceptedFiles.length ? (
          <Button style={{ marginTop: "20px" }} onClick={handleSaveFile}>
            {dashboardData.saveFiles}
          </Button>
        ) : null}

        <input {...getInputProps()} />
      </div>
    </div>
  );
}
