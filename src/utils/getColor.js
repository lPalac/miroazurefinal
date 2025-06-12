export const getStatusColor = (status) => {
  switch (status) {
    case "To Do":
    case "Approved":
      return "#17BECF";
    case "New":
      return "#1F77B4";
    case "Committed":
    case "In Progress":
      return "#2CA02C";
    case "Dev review":
      return "#FF7F0E";
    case "Blocked":
      return "#D62728";
    case "Done":
      return "#7F7F7F";
    default:
      return "#7F7F7F";
  }
};
