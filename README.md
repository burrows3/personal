# Bryan Burrows Portfolio

Portfolio website for Bryan Burrows focused on finance, analytics, product, and founder work.

## Run locally

This is a static site with no build step.

1. Open `index.html` directly in your browser, or
2. Run a lightweight local server:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy on GitHub Pages with Custom Domain

This repository is configured for:

- Primary domain: `bryanburrows.com`
- `CNAME` file included at repo root

### GitHub Settings

1. Go to repo **Settings -> Pages**
2. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / root
3. In **Custom domain**, enter:
   - `bryanburrows.com`
4. Enable **Enforce HTTPS** (after certificate is issued)

### GoDaddy DNS Records

Add these DNS records in GoDaddy:

- `CNAME` record
  - **Host:** `www`
  - **Value/Points to:** `burrows3.github.io`
  - **TTL:** default

- `A` record
  - **Host:** `@`
  - **Value:** `185.199.108.153`
- `A` record
  - **Host:** `@`
  - **Value:** `185.199.109.153`
- `A` record
  - **Host:** `@`
  - **Value:** `185.199.110.153`
- `A` record
  - **Host:** `@`
  - **Value:** `185.199.111.153`

The apex `@` records support redirect and reliability even when `www` is your primary host.
