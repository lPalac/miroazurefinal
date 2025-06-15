import * as React from "react";
import NoSelection from "./NoSelection";
import Selection from "./Selection";

const Miro = () => {
  const [itemsSelected, setItemsSelected] = React.useState(false);
  const [selectedColumn, setSelectedColumn] = React.useState({
    name: "",
    id: 0,
  });
  const [selectedColor, setSelectedColor] = React.useState({
    background: "#1A1A1A",
  });
  const [selectedItems, setSelectedItems] = React.useState([]);

  // Handle creating Azure Issue & Card (inside project) in Azure
  const handleCreateAzureCards = (selectedItems) => {
    selectedItems.map(async (item) => {
      /* const cleanedContent = item.content.replace(/<\/?[^>]+(>|$)/g, "");

      const AzureIssue = await createAzureIssue(username, repo, {
        title: cleanedContent,
        body: "Imported from Miro",
      });

      const AzureProjectCard = await createAzureProjectCard(
        `${selectedColumn.id}`,
        {
          note: null,
          content_id: AzureIssue.id,
          content_type: "Issue",
        },
      );

      await insertAppCards(item, selectedColor, AzureProjectCard, AzureIssue);
      await removeSelectedItem(item);*/
    });
  };

  // Get selection on initialization
  React.useEffect(() => {
    // Listen to selection updates
    miro.board.ui.on("selection:update", async (event) => {
      const selectedItems = event.items;

      // Filter sticky notes from the selected items
      const stickyNotes = selectedItems.filter(
        (item) => item.type === "sticky_note"
      );

      // Check to see if sticky notes are selected
      if (stickyNotes.length > 0) {
        setItemsSelected(true);
        setSelectedItems([...selectedItems]);
      } else {
        setItemsSelected(false);
        setSelectedItems([]);
      }
    });
  }, []);

  return (
    <div className="miro-container">
      {!itemsSelected ? (
        <NoSelection />
      ) : (
        <Selection
          onSelectColumn={(column) => setSelectedColumn(column)}
          onSelectColor={(color) => setSelectedColor(color)}
          color={selectedColor}
        />
      )}
      <button
        className="button button-primary"
        disabled={!itemsSelected}
        onClick={() => handleCreateAzureCards(selectedItems)}
      >
        Convert to AzureDevOps card
      </button>
    </div>
  );
};

export default Miro;
