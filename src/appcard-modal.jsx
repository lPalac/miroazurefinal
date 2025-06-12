import * as React from "react";
import ReactDOM from "react-dom";
import { Input } from "./components";

function App() {
  // Keep information about app card in state
  const [appCardId, setAppCardId] = React.useState("");
  const [newTitle, setNewTitle] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");

  /**
   * Store information pulled from GitHub API
   */
  const [gitHubProjects, setGitHubProjects] = React.useState([]);
  const [gitHubColumns, setGitHubColumns] = React.useState([
    { name: "", id: 0 },
  ]);

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
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const appCardId = urlParams.get("appCardId");
    const appCardTitle = urlParams.get("appCardTitle");
    const appCardDescription = urlParams.get("appCardDescription");
    const currentStatus = urlParams.get("currentStatus");

    if (appCardId && appCardTitle && appCardDescription && currentStatus) {
      const status = gitHubColumns.find(
        (column) => column.name === currentStatus
      );

      setAppCardId(appCardId);
      setNewTitle(appCardTitle);
      setNewDescription(appCardDescription);
      if (status) {
        setSelectedColumn(status);
      }
    }
  }, [gitHubColumns]);

  // Fetch GitHub Projects
  /*React.useEffect(() => {
    const getGitHubProjects = async () => {
      try {
        const gitHubProjects = await fetchGitHubProjects(username, repo);

        setGitHubProjects([...gitHubProjects]);
        setSelectedProject(gitHubProjects[0]);
      } catch (error) {
        console.error(error);
      }
    };

    getGitHubProjects();
  }, []);*/

  // Fetch GitHub Columns
  /* React.useEffect(() => {
    const getGitHubColumns = async () => {
      if (gitHubProjects.length > 0) {
        try {
          const gitHubColumns = await fetchGitHubColumns(
            gitHubProjects
              .filter((project) => project.id !== selectedProject.id)[0]
              .id.toString(),
          );

          setGitHubColumns([...gitHubColumns]);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getGitHubColumns();
  }, [gitHubProjects]);*/

  const handleSaveClick = async () => {
    /*const { data, error } = await supabase
      .table("PBI-mapping")
      .select(
        "id, miroCardId::text, gitHubIssueId, miroUserId::text, gitHubUsername, created_at, miroBoardId, gitHubIssueNumber, gitHubProjectCardId",
      )
      .eq("miroCardId", appCardId);

    if (error) {
      console.error(error);
    }
    if (data) {
      Promise.all(
        data.map(async (item) => {
          const gitHubIssueNumber = item.gitHubIssueNumber;
          const color = await getStatusColor(selectedColumn.name);

          // Update GitHub Issue
          await updateGitHubIssue(username, repo, gitHubIssueNumber, {
            title: newTitle,
            body: newDescription,
          });

          // Update GitHub Project Card
          await updateGitHubProjectCard(item.gitHubProjectCardId, {
            columnId: selectedColumn.id,
            card_id: item.gitHubProjectCardId,
            position: "top",
          });
*/
    // Update App Card via SDK
    const [currentAppCard] = await miro.board.get({ id: appCardId });
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const currentStatus = urlParams.get("currentStatus");
    const PBIId = urlParams.get("PBIId");
    if (currentAppCard) {
      currentAppCard.title = newTitle;
      /*   currentAppCard.description = "d";
      currentAppCard.fields = [
        {
          value: currentStatus,
          iconShape: "square",
          fillColor: "#DADADA",
          textColor: "#ffffff",
          tooltip: "test",
          iconUrl: "https://cdn-icons-png.flaticon.com/512/3867/3867669.png",
        },
      ];
      currentAppCard.style.cardTheme = "#DADAda";
      */
      await currentAppCard.sync();
      const project = "7interactive-DiVerso";
      const pbisRepsonse = await fetch(
        `https://dev.azure.com/lilcodelab/_apis/wit/workitems/${PBIId}?api-version=7.1`,
        {
          headers: {
            Authorization: `Basic bHVrYS5wYWxhY0BsaXR0bGVjb2RlLmNvbTp0QWxxYW1xTXE5eXFGM1k1NUpoSDVBUG5OcXlqNkpmOG12Qk16Qk5Cdmw0QXNkQ3k3dlJiSlFRSjk5QkZBQ0FBQUFBdjZYWnZBQUFTQVpETzRhTUg=`,
            "Content-Type": "application/json-patch+json",
          },
          method: "PATCH",
          body: JSON.stringify([
            {
              op: "replace",
              path: "/fields/System.Title",
              value: newTitle,
            },
          ]),
        }
      ).then((res) => res.json());

      console.log("PBI updated:", pbisRepsonse);
      await miro.board.ui.closeModal();
    }
  };

  const handleCancelClick = async () => {
    await miro.board.ui.closeModal();
  };

  return (
    <div className="appcard-modal-container">
      <h1>Edit GitHub card</h1>
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
