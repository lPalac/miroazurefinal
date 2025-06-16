import { supabase } from "./utils/index.js";

export async function init() {
  miro.board.ui.on("icon:click", async () => {
    await miro.board.ui.openPanel({ url: "app.html" });
  });
  miro.board.ui.on("app_card:open", (event) => {
    const { appCard } = event;
    //TODO change base URL
    const baseUrl = "http://localhost:3000";
    let currentStatus, PBIId;

    if (appCard.fields) {
      currentStatus = appCard.fields[0].value;
      PBIId = appCard.fields[1].value;
    }

    // Fetch a specific app card by specifying its ID
    const url = `${baseUrl}/appcard-modal.html?appCardId=${appCard.id}&appCardTitle=${appCard.title}&currentStatus=${currentStatus}&PBIId=${PBIId}`;

    // Open the modal to display the content of the fetched app card
    miro.board.ui.openModal({
      url,
      width: 520,
      height: 570,
    });
  });
  miro.board.ui.on("items:delete", async (event) => {
    const ids = event.items
      .filter((item) => item.type === "app_card")
      .map((item) => item.id);

    if (ids.length) {
      await supabase.from("PBI-mapping").delete().in("miroCardId", ids);
    }
  });
}

init();
