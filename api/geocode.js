export default async function handler(req, res) {
  const address = req.query.address;
  if (!address) return res.status(400).json({ error: 'No address provided' });
  try {
    const url = 'https://photon.komoot.io/api/?q=' + encodeURIComponent(address) + '&limit=1&lang=en';
    const r = await fetch(url);
    const data = await r.json();
    if (!data.features || data.features.length === 0)
      return res.status(404).json({ error: 'Address not found' });
    const f = data.features[0];
    const [lng, lat] = f.geometry.coordinates;
    const p = f.properties;
    const label = [p.name, p.street, p.city, p.state].filter(Boolean).join(', ');
    res.status(200).json({ lat, lng, label });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
