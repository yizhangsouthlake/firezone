export default async function handler(req, res) {
  const { lat, lng, minutes, profile } = req.query;
  if (!lat || !lng || !minutes) return res.status(400).json({ error: 'Missing parameters' });
  const ORS_KEY = process.env.ORS_KEY;
  if (!ORS_KEY) return res.status(500).json({ error: 'ORS_KEY not configured' });
  const routeProfile = profile || 'driving-car';
  const driveSeconds = Math.round(parseFloat(minutes) * 60);
  try {
    const r = await fetch(`https://api.openrouteservice.org/v2/isochrones/${routeProfile}`, {
      method: 'POST',
      headers: {
        'Authorization': ORS_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/geo+json'
      },
      body: JSON.stringify({
        locations: [[parseFloat(lng), parseFloat(lat)]],
        range: [driveSeconds],
        range_type: 'time',
        smoothing: 60
      })
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.error?.message || JSON.stringify(data) });
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
