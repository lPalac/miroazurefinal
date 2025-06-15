import { getStatusColor, supabase } from "./index.js";

export const insertAzureAppCards = async (PBIs) => {
  await Promise.all(
    PBIs.map(async (issue, index) => {
      //  Get current Miro board
      const info = await miro.board.getInfo();

      // Get issue status color
      //const color = getStatusColor(issue.state);
      const color = getStatusColor(issue.state);

      // Create App Card
      const appCard = await miro.board.createAppCard({
        x: index * 350,
        y: 0,
        title: issue.title,
        description: "issue.body",
        style: {
          cardTheme: getStatusColor(issue.state),
          fillBackground: true,
        },
        fields: [
          {
            value: issue.state,
            iconUrl: "https://cdn-icons-png.flaticon.com/512/3867/3867669.png",
            iconShape: "square",
            fillColor: color,
            textColor: "#000000",
            tooltip: "State",
          },

          {
            value: String(issue.id),
            iconShape: "square",
            fillColor: color,
            textColor: "#000000",
            tooltip: "Azure PBI ID",
          },
        ],
        status: "connected",
      });
      console.log(appCard.id);

      //await supabase.from("PBI-mapping").select({});
      //TODO check if miroCardId already exists
      await supabase.from("PBI-mapping").insert({
        miroCardId: appCard.id,
        azurePBIId: issue.id,
      });

      if (index === 0) {
        await miro.board.viewport.zoomTo(appCard);
      }
    })
  );
};
