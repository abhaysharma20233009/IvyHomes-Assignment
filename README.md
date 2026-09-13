# Ivy Homes Property Platform

A React + Vite property discovery platform built as part of the Ivy Homes assignment.

The application integrates with the Ivy Homes Property API and provides property listings, rentals, projects, filtering, sorting, property details, saved listings, and analytics-oriented views.

## Features

- 🏠 Property listing discovery
- 🔎 Search and filtering by locality, BHK, property type, etc.
- 💰 Price and area information
- 🏢 Rental property browsing
- 🏗️ Builder project discovery
- 📊 Analytics dashboard
- ❤️ Save/favourite listings
- 📋 Detailed property information
- 📱 Responsive UI
- 🔐 API authentication
- ⚡ Pagination, sorting and API-driven data

## Tech Stack

- **Frontend:** React, Vite
- **Styling:** CSS
- **API:** Ivy Homes Property API
- **Authentication:** API Key + Bearer Token
- **Deployment:** Vercel / Netlify / other hosting

## API Verification

The provided API reference was treated as a **hypothesis rather than the source of truth**, as instructed.

The running API was tested directly, and discrepancies between the documentation and actual API behavior were recorded.

### Important API discrepancies

| Area | Documented | Actual |
|---|---|---|
| API Key | `api_key` query parameter | `X-API-Key` header |
| Access token expiry | 24 hours | **15 minutes** |
| Refresh token | Not available | **Available** |
| Pagination | `page` + `limit` | **`offset` + `limit`** |
| Maximum limit | 200 | **50** |
| Listing active status | Active listings only | Inactive listings can also be returned |
| Listing `min_price` | Supported | **Ignored** |
| Listing `max_price` | Supported | **Ignored** |
| Listing `furnishing` | Supported | **Ignored** |
| Single listing endpoint | Documented | **404** |
| Similar listings endpoint | Documented | **404** |
| Favourites API | Documented | **404 / unavailable** |
| Analytics endpoint | Documented | **404** |

The API's actual behavior was used for data collection and analysis.

## Dataset Verification

Exhaustive traversal of the API produced:

| Dataset | Records |
|---|---:|
| Listings | **5,100** |
| Live listings | **4,017** |
| Rentals | **2,100** |
| Projects | **590** |
| Corrupt listings | **33** |
| Projects with incorrect listing counts | **166** |

The API-reported totals were not blindly trusted. For example:

- Listings reported `4,816`, but **5,100** records were reachable.
- Rentals reported `1,983`, but **2,100** records were reachable.
- Projects reported `557`, but **590** records were reachable.

Therefore, complete datasets were obtained through exhaustive pagination using the API's actual `offset` behavior.

## Assignment Results

Using the assignment reference timestamp:

`2026-09-10T00:00:00+05:30`

| # | Metric | Result |
|---:|---|---:|
| 1 | Total listing records | **5,100** |
| 2 | Unique property types | **5** |
| 3 | Active listings | **4,017** |
| 4 | Corrupt listing IDs | **33** |
| 5 | Total monthly rent in Powai | **₹8,000,100** |
| 6 | Average price/sq ft for live 2BHKs | **₹37,726.41** |
| 7 | Costliest project | **P50016 — Assetz Serenity** |
| 8 | Listings posted in last 7 days | **167** |
| 9 | Fake listing IDs | **252** |
| 10 | Projects with incorrect listing counts | **166** |

### Costliest Project

**P50016 — Assetz Serenity**

Maximum price: **₹12.44 crore**

## Data Quality Findings

The API dataset contains several inconsistencies that were identified during verification:

- Inactive listings can appear in the listings collection.
- Collection `total` values do not always represent the complete dataset.
- Some documented filters are ignored by the running API.
- Negative property prices exist in the dataset.
- Some project `total_listings` values do not match live listing counts.
- Several documented endpoints are unavailable.

These issues were handled based on the actual API responses rather than assumptions from the reference documentation.

## Verification Status

All practical API claims were verified except the `429` rate-limit behavior.

No rate-limit stress test was performed because it was unnecessary for the assignment and would conflict with the no-attack constraint.

> **Principle followed:** When the documentation and running API disagreed, the running API was treated as authoritative after reproducing the behavior.

## Project Status

✅ Frontend implementation completed  
✅ API integration completed  
✅ API behavior verified  
✅ Dataset exhaustively analyzed  
✅ Assignment questions answered  
✅ `submission.json` prepared
