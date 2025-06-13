import * as React from "react";
import ReactDOM from "react-dom";
import { Miro, Azure } from "./components";

function App() {
  const [selectedTab, setSelectedTab] = React.useState("Azure");

  const handleSelectTab = (value) => {
    setSelectedTab(value);
  };

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <div className="tabs">
          <div className="tabs-header-list">
            <div
              tabIndex={0}
              className={`tab ${selectedTab === "Azure" && "tab-active"}`}
              onClick={() => handleSelectTab("Azure")}
            >
              <div className="tab-text tab-badge">Choose from AzureDevOps</div>
            </div>
            <div
              tabIndex={0}
              className={`tab ${selectedTab === "miro" && "tab-active"}`}
              onClick={() => handleSelectTab("miro")}
            >
              <div className="tab-text tab-badge">Convert from Miro</div>
            </div>
          </div>
        </div>
      </div>

      <div className="cs1 ce12">
        {selectedTab === "Azure" ? <Azure /> : <Miro />}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
