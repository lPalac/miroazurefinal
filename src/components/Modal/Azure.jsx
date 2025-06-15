import * as React from "react";
import "../../assets/style.css";

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
