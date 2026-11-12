# Lab Creator landing page (Node.js)

Scrapes https://labcreator.in and shows the content on its own landing page.

## Run
    npm install
    npm start        # http://localhost:3000

## How it works
- `scraper.js`   axios downloads the site, cheerio reads services, projects, FAQ, testimonials and images. Cached for 1 hour.
- `data/fallback.js`   backup content, used if the site is down or its layout changes.
- `server.js`    Express server: `/` page, `/api/data` JSON, `/contact` form handler.
- `views/index.ejs` and `public/style.css`   the page design.

Images load directly from labcreator.in, so they show when the app runs on a normal machine or server.
