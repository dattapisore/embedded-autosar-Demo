# ServiceNow Employee Onboarding Portal

A lightweight web portal for employee onboarding with ServiceNow Table API integration.

## Features
- Employee onboarding intake form
- Progress checklist with dynamic completion meter
- ServiceNow API submission scaffold (`/api/now/table/sc_req_item`)
- Light/Dark theme toggle
- Starter links for ServiceNow documentation and learning

## Run locally
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

## Configure ServiceNow
Open `app.js` and update:
- `instanceUrl`
- `username`
- `password` (prefer OAuth or token vault in production)

## Notes
This demo uses browser-side API calls for simplicity. In production, move credentials and API calls to a backend service.
