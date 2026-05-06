export default async function handler(req, res) {
  try {
    const url = 'https://nominatim.openstreetmap.org/search?q=Westlake,+Texas,+USA&format=json&polygon_geojson=1&limit=5';
    const r = await fetch(url, { headers: { 'User-Agent': 'FireResponseCoverage/1.0' } });
    const data = await r.json();
    const town = data.find(d => d.osm_type === 'relation' && (d.class === 'boundary' || d.type === 'administrative')) || data[0];
    if (!town || !town.geojson) return res.status(404).json({ error: 'Boundary not found' });
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).json({ name: town.display_name, geojson: town.geojson });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
