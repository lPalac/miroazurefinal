import * as React from "react";
import ReactDOM from "react-dom";
import { Input } from "./components";
import { getStatusColor } from "./utils";
import linkIcon from "./assets/10758963_link_iconfinder.svg";
import Tag from "./components/Tag.jsx";
import Select from "./components/Select.jsx";

function App() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const PBIId = urlParams.get("PBIId");
  const appCardId = urlParams.get("appCardId");
  const [newTitle, setNewTitle] = React.useState(urlParams.get("appCardTitle"));
  const [newState, setNewState] = React.useState(() => {
    return urlParams.get("currentStatus") || "New";
  });
  const statuses = [
    { value: "New", label: "New" },
    { value: "Approved", label: "Approved" },
    { value: "Committed", label: "Commited" },
    { value: "Dev Review", label: "Dev Review" },
    { value: "Blocked", label: "Blocked" },
    { value: "Done", label: "Done" },
  ];

  const handleSaveClick = async () => {
    // Update App Card via SDK
    const [currentAppCard] = await miro.board.get({ id: appCardId });
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const currentStatus = urlParams.get("currentStatus");

    const patchOperations = [
      {
        op: "replace",
        path: "/fields/System.Title",
        value: newTitle,
      },
    ];
    if (currentAppCard) {
      currentAppCard.title = newTitle;
      currentAppCard.fields = [...currentAppCard.fields];
      currentAppCard.fields[0] = {
        value: newState,
        iconShape: "square",
        fillColor: getStatusColor(newState),
        textColor: "#000000",
        tooltip: "Status",
        iconUrl: "https://cdn-icons-png.flaticon.com/512/3867/3867669.png",
      };
      currentAppCard.style.cardTheme = getStatusColor(newState);
      currentAppCard.style.fillBackground = true;

      if (newState !== currentStatus) {
        patchOperations.push({
          op: "replace",
          path: "/fields/System.State",
          value: newState,
        });
      }
      await currentAppCard.sync();
      const pbisRepsonse = await fetch(
        `https://dev.azure.com/lilcodelab/_apis/wit/workitems/${PBIId}?api-version=7.1`,
        {
          headers: {
            Authorization: `Basic ${import.meta.env.VITE_AZURE_ACCESS_TOKEN}`,
            "Content-Type": "application/json-patch+json",
          },
          method: "PATCH",
          body: JSON.stringify(patchOperations),
        }
      ).then((res) => res.json());
      //TODO remove console.log
      console.log("PBI updated:", pbisRepsonse);
      await miro.board.ui.closeModal();
    }
  };

  const handleCancelClick = async () => {
    await miro.board.ui.closeModal();
  };

  return (
    <div className="appcard-modal-container">
      <div className="appcard-modal-header">
        <h1>Edit Azure card</h1>
        <Tag status={{ name: newState }} color={getStatusColor(newState)} />
        <a
          href={`https://dev.azure.com/lilcodelab/_workitems/edit/${PBIId}`}
          target="_blank"
          rel="noreferrer"
          className="appcard-modal-link"
        >
          <img src={linkIcon} alt="PBI link" />
        </a>
      </div>
      <Input
        label="Title"
        required
        placeholder="Title"
        value={newTitle.replace(/<\/?[^>]+(>|$)/g, "")}
        onChange={(value) => setNewTitle(value)}
      />

      <Select
        label="State"
        value={newState}
        required={true}
        options={statuses}
        onChange={(e) => {
          const value = e.target.value;
          setNewState(value);
        }}
      />

      <div className="appcard-modal-button-container">
        <button className="button button-primary" onClick={handleSaveClick}>
          Save
        </button>
        <button className="button button-secondary" onClick={handleCancelClick}>
          Cancel
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("appcard-modal-root"));
