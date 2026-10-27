# Kofix Loyalty Card — Vision 2030 (demo prototype)

Static site: HTML + CSS + vanilla JS. No backend, login, API keys or external scripts/fonts.

## Folder structure
- `index.html` — all 13 sections
- `css/style.css` — black, white and gold theme
- `js/app.js` — sample data and every interaction
- `assets/` — Kofix logos (white and black) and favicon

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.

## Deploy free on Netlify
1. Sign in at app.netlify.com.
2. Sites > Add new site > Deploy manually.
3. Drag this whole folder (or the unzipped folder) onto the drop area.
4. Rename the site under Site configuration if you wish.

## Simulation vs production
| Feature | In this demo | Needed for real use |
|---|---|---|
| Points, tiers, card number, QR | Fake, local state, "DEMO" labelled | Backend database, real member IDs, secure QR |
| Dashboard and transactions | Sample data | Verified bookings and an admin system |
| Referral link, share, tracking | Sample link, toasts only | Unique links, tracking, fraud checks, written reward rules |
| Earnings simulator | Example maths, no promises | Legal programme terms, approved commission rules |
| Academy, quizzes, badges | Works fully in browser | Accounts to keep progress across devices |
| Marketing tools, calendar, tracker | Local browser storage, fictional data | Accounts, privacy policy, data-protection compliance |
| Marketplace redemption | Simulated | Partner agreements, stock/voucher system |
| Partners | Concept only, no real partners | Signed agreements and onboarding |
| Financial vision | Concept diagram only | Licensed partners, Bank of Ghana and other legal approvals |

Use "Reset demo" in the footer to clear saved demo data.

## Version 2 additions
- `js/music.js`: hidden background piano. Six calm piano-style pieces are generated in the browser (no audio files, no licences). A new piece fades in every 90 seconds. There is no button or on-page indicator. Browsers block sound until the visitor first taps, clicks or presses a key, so music starts on that first interaction.
- `css/fx.css` and `js/fx.js`: bubble-style buttons with click pops, floating bubbles, 3D tilt cards, a spinning 3D coin, a scroll progress bar, and four animated explainers (point journey, referral journey, lesson flow, redemption flow). Reduced-motion settings switch the decorative motion off.
