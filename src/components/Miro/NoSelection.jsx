import * as React from "react";

const NoSelection = () => {
  return (
    <>
      <h5>Fetch single AzureDevOps PBI by ID</h5>
      <div className="appcard-modal-button-container">
        <button
          className="button button-secondary"
          type="button"
          //TODO: remove this button
          onClick={() => fetchAzureIssues(3458764631740057917)}
        >
          TEST
        </button>
      </div>
      <h3>Select from Miro board</h3>
      <p>
        From the board, select at least a sticky note or a card to convert it to
        a AzureDevOps PBI.
      </p>
    </>
  );
};

export default NoSelection;
