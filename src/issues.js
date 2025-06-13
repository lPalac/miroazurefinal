// issues.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  //TODO vratit se vamo da bude env
  //import.meta.env.VITE_SUPABASE_URL,
  //import.meta.env.VITE_SUPABASE_PASSWORD
  "https://siqbdrtilagiuknevwow.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpcWJkcnRpbGFnaXVrbmV2d293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MDEyNDcsImV4cCI6MjA2NDk3NzI0N30.22eaCXuRoSB--w4qRDzyK2Kioop091NZ4DT0O8gE9Qk"
);

export async function fetchGitHubIssues(miroCardId) {
  if (!miroCardId) {
    console.error("GitHub Issue ID is required");
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
