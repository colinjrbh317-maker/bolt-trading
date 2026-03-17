import { neon } from "@neondatabase/serverless";

function getDb() {
  const url = import.meta.env.DATABASE_URL || process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

export async function query(sql: string, params: unknown[] = []) {
  const db = getDb();
  return db(sql, params);
}

export { getDb };
