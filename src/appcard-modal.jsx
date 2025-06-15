import * as React from "react";
import ReactDOM from "react-dom";
import { Input } from "./components";
import { getStatusColor } from "./utils";
//TODO maknit ako necu koristit import Select from "./components/Select";

function App() {
  // Keep information about app card in state
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(window.location.search, "window.location.search");

  const [appCardId, setAppCardId] = React.useState("");
  const [newTitle, setNewTitle] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");
  const [newState, setNewState] = React.useState(() => {
    return urlParams.get("currentStatus") || "New";
  });

  /**
   * Store information pulled from Azure API
   */
  const [AzureProjects, setAzureProjects] = React.useState([]);
  const [AzureColumns, setAzureColumns] = React.useState([{ name: "", id: 0 }]);

  /**
   * Store selected project options
   */
  const [selectedProject, setSelectedProject] = React.useState({
    name: "",
    body: "",
    id: 0,
  });

  /**
   * Store selected column options
   */
  const [selectedColumn, setSelectedColumn] = React.useState({
    name: "",
    id: 0,
  });

  // Get and store appCardId, title, and description from window location
  React.useEffect(() => {
    // Get URL parameters

    const appCardId = urlParams.get("appCardId");
    const appCardTitle = urlParams.get("appCardTitle");
    const appCardDescription = urlParams.get("appCardDescription");
    const currentStatus = urlParams.get("currentStatus");
    if (appCardId && appCardTitle && appCardDescription && currentStatus) {
      const status = AzureColumns.find(
        (column) => column.name === currentStatus
      );

      setAppCardId(appCardId);
      setNewTitle(appCardTitle);
      setNewDescription(appCardDescription);
      if (status) {
        setSelectedColumn(status);
      }
    }
  }, [AzureColumns]);

  // Fetch Azure Projects
  /*React.useEffect(() => {
    const getAzureProjects = async () => {
      try {
        const AzureProjects = await fetchAzureProjects(username, repo);

        setAzureProjects([...AzureProjects]);
        setSelectedProject(AzureProjects[0]);
      } catch (error) {
        console.error(error);
      }
    };

    getAzureProjects();
  }, []);*/

  // Fetch Azure Columns
  /* React.useEffect(() => {
    const getAzureColumns = async () => {
      if (AzureProjects.length > 0) {
        try {
          const AzureColumns = await fetchAzureColumns(
            AzureProjects
              .filter((project) => project.id !== selectedProject.id)[0]
              .id.toString(),
          );

          setAzureColumns([...AzureColumns]);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getAzureColumns();
  }, [AzureProjects]);*/

  const handleSaveClick = async () => {
    // Update App Card via SDK
    const [currentAppCard] = await miro.board.get({ id: appCardId });
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const currentStatus = urlParams.get("currentStatus");
    const PBIId = urlParams.get("PBIId");
    const patchOperations = [
      {
        op: "replace",
        path: "/fields/System.Title",
        value: newTitle,
      },
    ];
    if (currentAppCard) {
      currentAppCard.title = newTitle;

      //currentAppCard.description = "d";
      currentAppCard.fields = [...currentAppCard.fields];
      currentAppCard.fields[0] = {
        value: newState,
        iconShape: "square",
        fillColor: getStatusColor(newState),
        textColor: "#000000",
        tooltip: "test",
        iconUrl: "https://cdn-icons-png.flaticon.com/512/3867/3867669.png",
      };

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
            Authorization: `Basic bHVrYS5wYWxhY0BsaXR0bGVjb2RlLmNvbTp0QWxxYW1xTXE5eXFGM1k1NUpoSDVBUG5OcXlqNkpmOG12Qk16Qk5Cdmw0QXNkQ3k3dlJiSlFRSjk5QkZBQ0FBQUFBdjZYWnZBQUFTQVpETzRhTUg=`,
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
      <h1>Edit Azure card</h1>
      <Input
        label="Title"
        required
        placeholder="Title"
        value={newTitle.replace(/<\/?[^>]+(>|$)/g, "")}
        onChange={(value) => setNewTitle(value)}
      />
      <Input
        label="Description"
        required
        placeholder="Description"
        value={newDescription}
        onChange={(value) => setNewDescription(value)}
      />

      {/* TODO dodat mozda komponentu select umjesto 
<div className="selection-container">
        <Select
          label="PBI State"
          required={true}
          options={AzureProjects}
          onChange={(e) => setSelectedProject(JSON.parse(e.target.value))}
        />
      </div> */}

      <label className="select-label">State</label>
      <select
        label="State"
        className="select"
        value={newState}
        onChange={(e) => {
          const value = e.target.value;
          console.log("Selected column:", value);
          setNewState(value);
        }}
      >
        <option value="New">New</option>
        <option value="Approved">Approved</option>
        <option value="Committed">Committed</option>
        <option value="Dev Review">Dev Review</option>
        <option value="Blocked">Blocked</option>
        <option value="Done">Done</option>
      </select>

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
