import * as React from "react";
import Tag from "../Tag";

const GitHubIssueRow = ({ title, date, status, onSelect }) => {
  const issueDate = new Date();
  const month = issueDate.getUTCMonth() + 1;
  const day = issueDate.getUTCDate();
  const year = issueDate.getUTCFullYear();

  const [color, setColor] = React.useState("#C3C4C3");

  React.useEffect(() => {
    async function generateStatusColor() {
      const color = "#fafa";
      setColor(color);
    }

    generateStatusColor();
  });

  return (
    <>
      <div className="grid-checkbox"></div>
      <div className="grid-title">
        <p className="github-issue-title">{title}</p>
      </div>
      <div className="grid-status">
        <Tag status={status} color={color} />
      </div>
      <div className="grid-date">
        <p>{day + "/" + month + "/" + year}</p>
      </div>
    </>
  );
};

export default GitHubIssueRow;
