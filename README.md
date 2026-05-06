# 🔥 Fire Response Coverage

An interactive drive-time response zone mapper built for the Westlake, TX Fire Department.

## What It Does

Staff open a URL, type a station address (or drop a pin), press **Run**, and instantly see the real road-network drive-time coverage zone on a map. No GIS software. No training required.

## Features

- 📍 Address search or map pin drop
- 🚒 Up to 5 stations simultaneously
- ⏱️ 4, 5, or 6.5-minute drive time zones (single or 3-ring mode)
- 🕐 NFPA 1710 turnout time subtracted automatically
- 🗺️ Westlake town boundary overlay
- 🌐 Runs in any browser — just a URL

## Tech Stack

Leaflet.js · CartoDB Positron · OpenRouteService · Photon Geocoder · Nominatim · Vercel Serverless

**Total cost: $0/month**

## Deployment

1. Fork this repo
2. Import into [Vercel](https://vercel.com)
3. Add environment variable: `ORS_KEY` = your [OpenRouteService](https://openrouteservice.org/dev/#/signup) API key (free)
4. Deploy and share the URL

## Author

Built by Yi Zhang for the Town of Westlake, TX Fire Department.
*Making spatial analysis accessible to the people who need it most.*
