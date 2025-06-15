import * as React from "react";
import "../../assets/style.css";
import Select from "../Select";

const statuses = [
  { name: "New", color: "#1F77B4" },
  { name: "Approved", color: "#17BECF" },
  { name: "Committed", color: "#9467BD" },
  { name: "Dev Review", color: "#FF7F0E" },
  { name: "Blocked", color: "#D62728" },
  { name: "Done", color: "#28A745" },
];
const Azure = () => {
  const handleChooseAzureClick = async () => {
    miro.board.ui.openModal({
      url: "modal.html",
      fullscreen: false,
    });
  };
  const projectsArray = [
    "Piel",
    "Tokyo People",
    "7interactive",
    "Ask2Ai",
    "KTM",
    "Končar",
  ];
  /*
  React.useEffect(() => {
    const [azureProject, setAzureProject] = React.useState([]);

    // TODO Fetch projects from Azure DevOps
    const project = fetch(
      `https://dev.azure.com/lilcodelab/_apis/projects?api-version=7.1-preview.1`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Basic bHVrYS5wYWxhY0BsaXR0bGVjb2RlLmNvbTp0QWxxYW1xTXE5eXFGM1k1NUpoSDVBUG5OcXlqNkpmOG12Qk16Qk5Cdmw0QXNkQ3k3dlJiSlFRSjk5QkZBQ0FBQUFBdjZYWnZBQUFTQVpETzRhTUg=`,
        },
        body: JSON.stringify({}),
      }
    ).then((res) => res.json());

    if (projectsResponse.count === 0) {
      console.error("No projects found");
      return;
    } else {
      setAzureProject(
        projectsResponse.value.map((project) => ({
          value: project.id,
          label: project.name,
        }))
      );
    }
  }, []);

  */
  return (
    <div className="azure-container">
      <h3>
        Import PBIs <br />
        from Azure DevOps
      </h3>
      <p>
        Any changes you apply, either in Miro or in AzureDevOps, are synced
        between both tools.
      </p>
      <div className="selection-container">
        <Select
          label="Select Azure Project"
          required={true}
          //TODO fetch projects from Azure DevOps and make color#222222
          options={projectsArray}
          value={JSON.stringify("7interactive")}
          onChange={(e) => setSelectedProject(JSON.parse(e.target.value))}
        />
      </div>
      <button
        className="button button-primary"
        type="button"
        onClick={handleChooseAzureClick}
      >
        Choose from AzureDevOps PBIs
      </button>
      <h3>States</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {statuses.map((status) => (
          <li className="status-item" key={status.name}>
            <span
              className="status-color-box"
              style={{
                backgroundColor: status.color,
              }}
            />
            <span>{status.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Azure;
