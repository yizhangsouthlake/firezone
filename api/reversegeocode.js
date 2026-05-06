export default async function handler(req, res) {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'Missing lat/lng' });
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    const r = await fetch(url, { headers: { 'User-Agent': 'FireResponseCoverage/1.0' } });
    const data = await r.json();
    const a = data.address || {};
    const parts = [
      a.house_number && a.road ? a.house_number + ' ' + a.road : a.road,
      a.city || a.town || a.village || a.suburb,
      a.state
    ].filter(Boolean);
    const label = parts.length > 0 ? parts.join(', ') : data.display_name;
    res.status(200).json({ label });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
