// issues.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_DATABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);
//TODO remove this or place it somewhere else

export async function fetchAzureIssues(miroCardId) {
  if (!miroCardId) {
    console.error("Azure Issue ID is required");
    return [];
  }
  // Fetch card mapping data from Supabase
  const { data, error } = await supabase
    .from("PBI-mapping")
    .select("miroCardId, created_at, azurePBIId")
    .eq("miroCardId", miroCardId);

  console.log("Fetched from DB:", data);
  if (error) {
    console.error(error);
  }
  if (data) {
    return data.map((item) => ({
      id: item.id,
      miroCardId: item.miroCardId,
      azurePBIId: item.azurePBIId,
    }));
  }
  console.error(data);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Request sent" }),
  };
}
