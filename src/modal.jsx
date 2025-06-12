import * as React from "react";
import ReactDOM from "react-dom";
import { Checkbox, GitHubIssueHeader, Loader } from "./components";
import { insertGitHubAppCards } from "./utils/miro";

import { fetchGitHubIssues } from "./issues.js";
const Modal = () => {
  const [PBIs, setPBIs] = React.useState([]);
  React.useEffect(() => {
    const getPBIs = async () => {
      const PBIsID = [8230, 8236];

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
