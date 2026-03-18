import { neon } from "@neondatabase/serverless";

function getDb() {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    import.meta.env.DATABASE_URL ||
    import.meta.env.POSTGRES_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

export async function query(sql: string, params: unknown[] = []) {
  const db = getDb();
  return db.query(sql, params);
}

export { getDb };
