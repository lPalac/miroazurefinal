import React from "react";
export const getStatusColor = (status) => {
  switch (status) {
    case "To Do":
    case "Approved":
      return "#17BECF";
    case "New":
      return "#1F77B4";
    case "Committed":
    case "In Progress":
      return "#9467BD";
    case "Dev review":
      return "#FF7F0E";
    case "Blocked":
      return "#D62728";
    case "Done":
      return "#28A745";
    default:
      return "#7F7F7F";
  }
};

// Define the status labels and their corresponding colors
const statuses = [
  { name: "New", color: "#1F77B4" },
  { name: "To Do", color: "#17BECF" },
  { name: "Committed", color: "#9467BD" },
  { name: "Dev Review", color: "#FF7F0E" },
  { name: "Blocked", color: "#D62728" },
  { name: "Done", color: "#28A745" },
];

// Legend component that renders a list of colored status markers
export const Legend = () => {
  return (
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
  );
};
