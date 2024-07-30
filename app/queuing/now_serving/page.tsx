import { getCurrentPatients } from "./lib/getCurrentPatients";
import NowServingClient from "./NowServingClient";

export default async function NowServing() {
  const currentPatients = await getCurrentPatients(); // Fetching the posts from the database.

  return <NowServingClient currentPatients={currentPatients} />;
}
