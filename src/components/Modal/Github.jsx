import * as React from "react";

const statuses = [
  { name: "New", color: "#1F77B4" },
  { name: "Approved", color: "#17BECF" },
  { name: "Committed", color: "#9467BD" },
  { name: "Dev Review", color: "#FF7F0E" },
  { name: "Blocked", color: "#D62728" },
  { name: "Done", color: "#28A745" },
];
const GitHub = () => {
  const handleChooseGithubClick = async () => {
    miro.board.ui.openModal({
      url: "modal.html",
      fullscreen: false,
    });
  };

  return (
    <div className="github-container">
      <h3>Synced changes</h3>
      <p>
        any changes you apply, either in Miro or in AzureDevOps, are synced
        between both tools.
      </p>
      <h3>Legend</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {statuses.map((status) => (
          <li
            key={status.name}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "16px",
                height: "16px",
                backgroundColor: status.color,
                marginRight: "8px",
                borderRadius: "3px",
              }}
            />
            <span>{status.name}</span>
          </li>
        ))}
      </ul>
      <button
        className="button button-primary"
        type="button"
        onClick={handleChooseGithubClick}
      >
        Choose from AzureDevOps PBIs
      </button>
    </div>
  );
};

export default GitHub;
