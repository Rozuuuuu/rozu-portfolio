/**
 * Vercel Serverless Function: /api/route-stops
 * Returns the ordered list of stops for a given route_id.
 */
const routeStopsData = {
  route_01b: [
    { stop_id: "01b_s1", stop_name: "Sambag 1", lat: 10.3065, lng: 123.8900, stop_sequence: 1 },
    { stop_id: "01b_s2", stop_name: "USC South Campus", lat: 10.3027, lng: 123.8906, stop_sequence: 2 },
    { stop_id: "01b_s3", stop_name: "Private (J. Alcantara St)", lat: 10.3040, lng: 123.8890, stop_sequence: 3 },
    { stop_id: "01b_s4", stop_name: "Asian College of Technology", lat: 10.2995, lng: 123.8938, stop_sequence: 4 },
    { stop_id: "01b_s5", stop_name: "E Mall", lat: 10.2985, lng: 123.8950, stop_sequence: 5 },
    { stop_id: "01b_s6", stop_name: "Leon Kilat St", lat: 10.2975, lng: 123.8960, stop_sequence: 6 },
    { stop_id: "01b_s7", stop_name: "Gaisano Capital South", lat: 10.2955, lng: 123.8995, stop_sequence: 7 },
    { stop_id: "01b_s8", stop_name: "Metro Colon", lat: 10.2946, lng: 123.9015, stop_sequence: 8 },
    { stop_id: "01b_s9", stop_name: "Colonnade Mall", lat: 10.2952, lng: 123.9022, stop_sequence: 9 },
    { stop_id: "01b_s10", stop_name: "University of the Visayas", lat: 10.2965, lng: 123.9030, stop_sequence: 10 },
    { stop_id: "01b_s11", stop_name: "Gaisano Main", lat: 10.2950, lng: 123.9010, stop_sequence: 11 },
    { stop_id: "01b_s12", stop_name: "Sandiego-Yap Ancestral House", lat: 10.2988, lng: 123.9022, stop_sequence: 12 },
    { stop_id: "01b_s13", stop_name: "Brgy. Parian", lat: 10.2978, lng: 123.9032, stop_sequence: 13 },
    { stop_id: "01b_s14", stop_name: "A. Bonifacio St", lat: 10.2988, lng: 123.9042, stop_sequence: 14 },
    { stop_id: "01b_s15", stop_name: "T. Padilla St", lat: 10.3025, lng: 123.9060, stop_sequence: 15 },
    { stop_id: "01b_s16", stop_name: "Pier 4", lat: 10.3035, lng: 123.9180, stop_sequence: 16 },
    { stop_id: "01b_s17", stop_name: "Pier 3", lat: 10.3000, lng: 123.9145, stop_sequence: 17 },
    { stop_id: "01b_s18", stop_name: "Cebu Mactan Ferry Terminal", lat: 10.2990, lng: 123.9135, stop_sequence: 18 },
    { stop_id: "01b_s19", stop_name: "Pier 2", lat: 10.2950, lng: 123.9105, stop_sequence: 19 }
  ],
  route_03b: [
    { stop_id: "03b_s1", stop_name: "Sindulan", lat: 10.3250, lng: 123.9140, stop_sequence: 1 },
    { stop_id: "03b_s2", stop_name: "Mabolo Church", lat: 10.3225, lng: 123.9118, stop_sequence: 2 },
    { stop_id: "03b_s3", stop_name: "Hipodromo", lat: 10.3168, lng: 123.9100, stop_sequence: 3 },
    { stop_id: "03b_s4", stop_name: "Carreta Cemetery", lat: 10.3108, lng: 123.9080, stop_sequence: 4 },
    { stop_id: "03b_s5", stop_name: "G. Maxilom Ave", lat: 10.3115, lng: 123.9020, stop_sequence: 5 },
    { stop_id: "03b_s6", stop_name: "USC North Campus", lat: 10.3135, lng: 123.8985, stop_sequence: 6 },
    { stop_id: "03b_s7", stop_name: "Horizons 101", lat: 10.3148, lng: 123.8962, stop_sequence: 7 },
    { stop_id: "03b_s8", stop_name: "Mango Square", lat: 10.3160, lng: 123.8950, stop_sequence: 8 },
    { stop_id: "03b_s9", stop_name: "Fuente Osmeña Circle", lat: 10.3163, lng: 123.8907, stop_sequence: 9 },
    { stop_id: "03b_s10", stop_name: "Crown Regency Hotel", lat: 10.3160, lng: 123.8895, stop_sequence: 10 },
    { stop_id: "03b_s11", stop_name: "Abellana Sports Complex", lat: 10.3045, lng: 123.8960, stop_sequence: 11 },
    { stop_id: "03b_s12", stop_name: "CNU", lat: 10.3039, lng: 123.8967, stop_sequence: 12 },
    { stop_id: "03b_s13", stop_name: "GV Tower Hotel / SSS", lat: 10.3015, lng: 123.8990, stop_sequence: 13 },
    { stop_id: "03b_s14", stop_name: "Metro Colon", lat: 10.2946, lng: 123.9015, stop_sequence: 14 },
    { stop_id: "03b_s15", stop_name: "Carbon Public Market", lat: 10.2915, lng: 123.9020, stop_sequence: 15 },
    { stop_id: "03b_s16", stop_name: "Cebu City Hall", lat: 10.2928, lng: 123.9018, stop_sequence: 16 },
    { stop_id: "03b_s17", stop_name: "La Nueva (Sto. Niño)", lat: 10.2940, lng: 123.9025, stop_sequence: 17 },
    { stop_id: "03b_s18", stop_name: "MCWD", lat: 10.2965, lng: 123.9050, stop_sequence: 18 },
    { stop_id: "03b_s19", stop_name: "CTU", lat: 10.2970, lng: 123.9085, stop_sequence: 19 },
    { stop_id: "03b_s20", stop_name: "CPILS", lat: 10.2988, lng: 123.9110, stop_sequence: 20 },
    { stop_id: "03b_s21", stop_name: "Museo Sugbo", lat: 10.3042, lng: 123.9048, stop_sequence: 21 }
  ],
  route_13c: [
    { stop_id: "13c_s1", stop_name: "Talamban (Gaisano Grand)", lat: 10.3606, lng: 123.9172, stop_sequence: 1 },
    { stop_id: "13c_s2", stop_name: "USC Talamban Campus", lat: 10.3528, lng: 123.9126, stop_sequence: 2 },
    { stop_id: "13c_s3", stop_name: "Banilad Town Center", lat: 10.3440, lng: 123.9128, stop_sequence: 3 },
    { stop_id: "13c_s4", stop_name: "Gaisano Country Mall", lat: 10.3429, lng: 123.9135, stop_sequence: 4 },
    { stop_id: "13c_s5", stop_name: "University of Cebu Banilad", lat: 10.3413, lng: 123.9126, stop_sequence: 5 },
    { stop_id: "13c_s6", stop_name: "Cebu Country Club", lat: 10.3340, lng: 123.9118, stop_sequence: 6 },
    { stop_id: "13c_s7", stop_name: "BIR (Arch. Reyes Ave)", lat: 10.3265, lng: 123.9075, stop_sequence: 7 },
    { stop_id: "13c_s8", stop_name: "Ayala Center Cebu", lat: 10.3178, lng: 123.9050, stop_sequence: 8 },
    { stop_id: "13c_s9", stop_name: "Gorordo Ave (Hotel Elizabeth)", lat: 10.3168, lng: 123.8995, stop_sequence: 9 },
    { stop_id: "13c_s10", stop_name: "Camp Sotero", lat: 10.3125, lng: 123.8988, stop_sequence: 10 },
    { stop_id: "13c_s11", stop_name: "Gen. Echavez St", lat: 10.3075, lng: 123.9030, stop_sequence: 11 },
    { stop_id: "13c_s12", stop_name: "Sikatuna St", lat: 10.2985, lng: 123.9035, stop_sequence: 12 },
    { stop_id: "13c_s13", stop_name: "Brgy. Parian", lat: 10.2978, lng: 123.9032, stop_sequence: 13 },
    { stop_id: "13c_s14", stop_name: "Gaisano Main", lat: 10.2950, lng: 123.9010, stop_sequence: 14 },
    { stop_id: "13c_s15", stop_name: "University of the Visayas", lat: 10.2965, lng: 123.9030, stop_sequence: 15 },
    { stop_id: "13c_s16", stop_name: "Colonnade Supermarket", lat: 10.2952, lng: 123.9022, stop_sequence: 16 }
  ]
};

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

  const stops = routeStopsData[route_id];
  if (!stops) {
    return res.status(404).json({ error: "Stops not found for this route" });
  }

  // Sort by stop_sequence ascending to prevent spiderweb rendering
  const sortedStops = [...stops].sort((a, b) => a.stop_sequence - b.stop_sequence);

  return res.status(200).json(sortedStops);
}
