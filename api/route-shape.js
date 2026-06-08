import fs from 'fs';
import path from 'path';

/**
 * Vercel Serverless Function: /api/route-shape
 * Returns the GeoJSON shape for a given route_id.
 */
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed. Use GET." });
  }

  const { route_id } = req.query;
  if (!route_id) {
    return res.status(400).json({ error: "Missing route_id parameter" });
  }

  // Sanitize route_id to prevent directory traversal
  const sanitizedRouteId = route_id.replace(/[^a-zA-Z0-9_]/g, "");

  try {
    const filePath = path.join(process.cwd(), 'public', 'sugboway', 'shapes', `${sanitizedRouteId}.geojson`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Shape not found" });
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return res.status(200).json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading shape file:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
