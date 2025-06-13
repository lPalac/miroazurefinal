import * as React from "react";
import ReactDOM from "react-dom";
import { AzureIssueHeader, Loader } from "./components";
import { Azure } from "./components/index.js";
import { insertAzureAppCards } from "./utils/miro.js";

import { fetchAzureIssues } from "./issues.js";
import { getStatusColor } from "./utils";
const Modal = () => {
  const [PBIs, setPBIs] = React.useState([]);
  const [selectedPBIs, setSelectedPBIs] = React.useState([]);
  React.useEffect(() => {
    const getPBIs = async () => {
      const project = "7interactive-DiVerso";

      const pbiResponse = await fetch(
        `https://dev.azure.com/lilcodelab/${project}/_apis/wit/wiql?top=200&api-version=7.1`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic bHVrYS5wYWxhY0BsaXR0bGVjb2RlLmNvbTp0QWxxYW1xTXE5eXFGM1k1NUpoSDVBUG5OcXlqNkpmOG12Qk16Qk5Cdmw0QXNkQ3k3dlJiSlFRSjk5QkZBQ0FBQUFBdjZYWnZBQUFTQVpETzRhTUg=`,
          },
          body: JSON.stringify({
            query: `SELECT [System.Id] FROM WorkItems WHERE [System.TeamProject] ='${project}' ORDER BY [System.ChangedDate] DESC`,
          }),
        }
      ).then((res) => res.json());
      const PBIsID = pbiResponse.workItems.map((pbi) => pbi.id);

      const response = await fetch(
        `https://dev.azure.com/lilcodelab/7interactive-DiVerso/_apis/wit/workitems?ids=${PBIsID.join(
          ","
        )}&api-version=7.1`,
        {
          headers: {
            Authorization: `Basic bHVrYS5wYWxhY0BsaXR0bGVjb2RlLmNvbTp0QWxxYW1xTXE5eXFGM1k1NUpoSDVBUG5OcXlqNkpmOG12Qk16Qk5Cdmw0QXNkQ3k3dlJiSlFRSjk5QkZBQ0FBQUFBdjZYWnZBQUFTQVpETzRhTUg=`,
          },
        }
      ).then((res) => res.json());

      setPBIs(
        response.value.map((item) => ({
          id: item.id,
          title: item.fields["System.Title"],
          state: item.fields["System.State"],
          description: item.fields["System.Description"],
          create_at: item.fields["System.CreatedDate"],
          assignedTo:
            item.fields["System.AssignedTo"]?.displayName || "Unassigned",
        }))
      );
    };
    getPBIs();
  }, []);
  const handleImportClick = async () => {
    try {
      const selected = PBIs.filter((pbi) => selectedPBIs.includes(pbi.id));
      if (selected.length === 0) {
        console.error("No PBIs selected");
        return;
      }
      await insertAzureAppCards(selected);
      await miro.board.ui.closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e, selectedId) => {
    if (e.target.checked) {
      setSelectedPBIs([...selectedPBIs, selectedId]);
    } else {
      setSelectedPBIs(selectedPBIs.filter((id) => id !== selectedId));
    }
  };
  return (
    <div>
      <div className="azure-header">
        <h1 className="azure-modal-title">Import Azure DevOps PBIs</h1>
        <button
          className="button button-primary"
          type="button"
          onClick={handleImportClick}
          disabled={selectedPBIs.length === 0}
        >
          Import
        </button>
      </div>
      <div className="appcard-modal-button-container">
        <button
          className="button button-secondary"
          type="button"
          //TODO: remove this button
          onClick={() => fetchAzureIssues(3458764631645069034)}
        >
          TEST
        </button>
      </div>
      <div className="modal-grid">
        {PBIs.length === 0 ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <>
            <AzureIssueHeader />
            {PBIs.map((issue, index) => (
              <React.Fragment key={issue.id}>
                <div className="grid-checkbox">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      tabIndex={0}
                      checked={selectedPBIs.includes(issue.id)}
                      onChange={(e) => handleChange(e, issue.id)}
                    />
                    <span></span>
                  </label>
                </div>
                <div className="grid-title">
                  <p className="Azure-issue-title">{issue.title}</p>
                </div>

                <div className="grid-status">
                  <div
                    className="tag-container"
                    style={{ backgroundColor: getStatusColor(issue.state) }}
                  >
                    <p>{issue.state}</p>
                  </div>
                </div>
                <div className="grid-date">
                  <p>
                    {new Date(issue.create_at).toLocaleDateString("hr-HR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
ReactDOM.render(<Modal />, document.getElementById("modal-root"));
