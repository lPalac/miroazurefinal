export async function init() {
  miro.board.ui.on("icon:click", async () => {
    await miro.board.ui.openPanel({ url: "app.html" });
  });
  miro.board.ui.on("app_card:open", (event) => {
    const { appCard } = event;
    const baseUrl = "http://localhost:3000";
    let currentStatus;

    if (appCard.fields) {
      currentStatus = appCard.fields[0].value;
      console.log("APPCARD", appCard);
    }

    // Fetch a specific app card by specifying its ID
    const url = `${baseUrl}/appcard-modal.html?appCardId=${appCard.id}&appCardTitle=${appCard.title}&appCardDescription=${appCard.description}&currentStatus=${currentStatus}`;

    // Open the modal to display the content of the fetched app card
    miro.board.ui.openModal({
      url,
      width: 520,
      height: 570,
    });
  });
}

init();
