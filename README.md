# Smart Gas Billing - Calculation Engine (API)

The core logic engine for the Smart Gas Billing system. This NestJS API handles complex billing rules, VAT calculations, and persists pricing configurations to a PostgreSQL database.

## Live API URL
- **Production:** https://acme-project-gass-billing-backend-api.onrender.com

## Tech Stack
- **Framework:** NestJS
- **Database:** PostgreSQL (via Supabase)
- **ORM:** TypeORM
- **Deployment:** Render

## API Endpoints
- `POST /billing/calculate` : Calculates total bill based on consumption logic.
- `GET /billing/config` : Fetches current gas rates and charges.
- `PATCH /billing/config` : Updates pricing rules (Requires Admin PIN).

## Local Setup
1. **Clone the repo:**
   ```bash
   git clone https://github.com/Jayed-Bin-Alamgir/acme-project-gass-billing-backend-api.git
   cd utility-billing-backend
