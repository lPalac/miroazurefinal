import * as React from "react";
import Select from "../Select";
import ColorPicker from "./ColorPicker";

const Selection = ({ onSelectColumn, onSelectColor, color }) => {
  /**
   * Store information pulled from Azure API
   */
  const [AzureProjects, setAzureProjects] = React.useState([]);
  const [AzureColumns, setAzureColumns] = React.useState([]);

  /**
   * Store selection options
   */
  const [selectedProject, setSelectedProject] = React.useState({
    name: "",
    body: "",
    id: 0,
  });

  // Fetch Projects from Azure
  /*React.useEffect(() => {
    const getAzureProjects = async () => {
      try {
        const AzureProjects = await fetchAzureProjects(username, repo);
        setAzureProjects([...AzureProjects]);
      } catch (error) {
        console.error(error);
      }
    };

    getAzureProjects();
  }, []);

  // Fetch Columns from selected Project
  React.useEffect(() => {
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

  // After fetching columns from Azure, set default to the first one
  React.useEffect(() => {
    onSelectColumn(AzureColumns[0]);
  }, [AzureColumns]);

  return (
    <div className="selection-container">
      <Select
        label="Select Azure Project"
        required={true}
        options={AzureProjects}
        onChange={(e) => setSelectedProject(JSON.parse(e.target.value))}
      />
      <Select
        label="Column"
        required={true}
        options={AzureColumns}
        onChange={(e) => onSelectColumn(JSON.parse(e.target.value))}
      />
      <ColorPicker
        color={color.background}
        setColor={(color) => onSelectColor(color)}
      />
    </div>
  );
};

export default Selection;
