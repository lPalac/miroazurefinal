import * as React from "react";
import ReactDOM from "react-dom";
import { Checkbox, GitHubIssueHeader, Loader } from "./components";
import { insertGitHubAppCards } from "./utils/miro";

import { fetchGitHubIssues } from "./issues.js";
const Modal = () => {
  const [PBIs, setPBIs] = React.useState([]);
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

      console.log(PBIsID);

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
          assignedTo:
            item.fields["System.AssignedTo"]?.displayName || "Unassigned",
        }))
      );
    };
    getPBIs();
  }, []);
  const handleImportClick = async () => {
    try {
      await insertGitHubAppCards(PBIs);

      await miro.board.ui.closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="modal-grid">
      {PBIs.length === 0 ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <GitHubIssueHeader />
          {PBIs.map((issue, index) => (
            <>
              <div className="grid-checkbox">
                <Checkbox />
              </div>
              <div className="grid-title">
                <p className="github-issue-title">{issue.title}</p>
              </div>
              <div className="grid-status">
                <div
                  className="tag-container"
                  style={{ backgroundColor: "#FAF" }}
                >
                  <p>{issue.state}</p>
                </div>
              </div>
            </>
          ))}
        </>
      )}
      <button
        className="button button-primary"
        type="button"
        onClick={handleImportClick}
        // disabled={selectedGitHubIssues.length === 0}
      >
        Import
      </button>
      <button
        className="button button-primary"
        type="button"
        onClick={() => fetchGitHubIssues(213)}
      >
        TEST
      </button>
    </div>
  );
};
ReactDOM.render(<Modal />, document.getElementById("modal-root"));
