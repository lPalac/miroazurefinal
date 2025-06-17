import * as React from "react";
import ReactDOM from "react-dom";
import { Azure } from "./components";

function App() {
  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <Azure />
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
