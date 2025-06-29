import * as React from "react";
import ReactDOM from "react-dom";
import { AzureIssueHeader, Loader } from "./components";
import { insertAzureAppCards } from "./utils/miro.js";

import { getStatusColor, supabase } from "./utils";
const Modal = () => {
  const [PBIs, setPBIs] = React.useState([]);
  const [selectedPBIs, setSelectedPBIs] = React.useState([]);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const project = urlParams.get("project");
  React.useEffect(() => {
    const getPBIs = async () => {
      // Fetch PBIs from Azure DevOps

      const pbiResponse = await fetch(
        `https://dev.azure.com/lilcodelab/${project}/_apis/wit/wiql?top=200&api-version=7.1`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic  ${import.meta.env.VITE_AZURE_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            query: `SELECT [System.Id] FROM WorkItems WHERE [System.TeamProject] ='${project}' ORDER BY [System.ChangedDate] DESC`,
          }),
        }
      ).then((res) => res.json());
      const { data, error } = await supabase
        .from("PBI-mapping")
        .select("azurePBIId");
      const allPBIs = data.map((pbi) => Number(pbi.azurePBIId));
      const PBIsId = pbiResponse.workItems
        .map((pbi) => pbi.id)
        .filter((id) => !allPBIs.includes(id))
        .slice(0, 199);

      const response = await fetch(
        `https://dev.azure.com/lilcodelab/${project}/_apis/wit/workitems?ids=${PBIsId.join(
          ","
        )}&api-version=7.1`,
        {
          headers: {
            Authorization: `Basic  ${import.meta.env.VITE_AZURE_ACCESS_TOKEN}`,
          },
        }
      ).then((res) => res.json());

      setPBIs(
        response.value.map((item) => ({
          id: item.id,
          title: item.fields["System.Title"],
          state: item.fields["System.State"],
          url: `https://dev.azure.com/lilcodelab/_workitems/edit/${item.id}`,
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
                  <a
                    className="azure-issue-title"
                    href={issue.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {issue.title}
                  </a>
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
