export const insertGitHubAppCards = async (gitHubIssues) => {
  await Promise.all(
    gitHubIssues.map(async (issue, index) => {
      //  Get current Miro board
      const info = await miro.board.getInfo();
      console.log(info);
      // Get issue status color
      const color = "#FAFA";
      // Create App Card
      const appCard = await miro.board.createAppCard({
        x: index * 350,
        y: 0,
        title: issue.title,
        description: "issue.body",
        style: {
          cardTheme: color,
        },
        fields: [
          {
            value: issue.state,
            iconUrl: "https://cdn-icons-png.flaticon.com/512/3867/3867669.png",
            iconShape: "square",
            fillColor: "#E5E5E5",
            textColor: "#000000",
            tooltip:
              "Caption text displayed in a tooltip when clicking or hovering over the preview field",
          },
        ],
        status: "connected",
      });

      if (index === 0) {
        await miro.board.viewport.zoomTo(appCard);
      }
    })
  );
};
