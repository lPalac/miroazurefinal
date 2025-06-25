import * as React from "react";
import ReactDOM from "react-dom";
import { Loader } from "./components";
import pasteurl from "./assets/pasteurl.png";
function App() {
  //TODO remove temp after styliing this page when deployed on server
  const [userId, setUserId] = React.useState("temp");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const clientId = urlParams.get("client_id");
  const teamId = urlParams.get("team_id");
  React.useEffect(() => {
    const getCode = async () => {
      await fetch(`${import.meta.env.VITE_BE_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          code: code,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.user_id) {
            setUserId(res.user_id);
          }
        });
    };
    getCode();
  }, []);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(userId);
  };

  return (
    <div style={{ marginTop: 20 }}>
      {!userId ? (
        <Loader />
      ) : (
        <div className="auth-container">
          <p className="auth-text">
            URL for service hook bi trebalo izgledati ovako:
          </p>
          <p className="auth-service-hook-url">
            https://azuresyncbe.netlify.app?userId=<span>{userId}</span>
            &boardId=uXjVIosIo5c=/
          </p>
          <button
            className="button button-primary"
            onClick={handleCopyToClipboard}
          >
            Copy user ID
          </button>
          <div>
            <img src={pasteurl} alt="Azure service hook paste" />
          </div>
          <div>
            <a
              href={`https://miro.com/app-install-completed/?client_id=${clientId}&team_id=${teamId}`}
            >
              Back to miro boards
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
