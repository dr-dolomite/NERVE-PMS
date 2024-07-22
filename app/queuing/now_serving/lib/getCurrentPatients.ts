// lib/getCurrentPatients.ts

import { fetchPosts } from "../../db/queries/posts";

export async function getCurrentPatients() {
  const currentPatients = await fetchPosts();
  return currentPatients;
}
