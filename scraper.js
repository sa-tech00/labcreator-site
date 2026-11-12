// Scraper: reads labcreator.in and turns it into clean data.
// If the site cannot be reached or changes, it falls back to data/fallback.js.
const axios = require('axios');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));
const cheerio = require('cheerio');
const fallback = require('./data/fallback');

const BASE = 'https://labcreator.in';
const CACHE_MS = 60 * 60 * 1000; // re-scrape at most once an hour
let cache = null;

const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
const abs = (src) => (src ? new URL(src, BASE).href : null);

// Climb up from an element until a block containing the given tag is found.
function nearestBlock($, el, tag) {
  let box = $(el);
  for (let i = 0; i < 4 && box.find(tag).length === 0; i++) box = box.parent();
  return box;
}

function scrapeProjects($) {
  const seen = new Set();
  const items = [];
  $('img').each((_, el) => {
    const src = $(el).attr('src') || '';
    if (!/img\/content\/history-/.test(src)) return;
    const box = nearestBlock($, el, 'h3');
    const title = clean(box.find('h3').first().text());
    if (!title || seen.has(title)) return;
    seen.add(title);
    items.push({ title, text: clean(box.find('p').first().text()), image: abs(src) });
  });
  return items;
}

function scrapeIndustries($) {
  const seen = new Set();
  const items = [];
  $('img').each((_, el) => {
    const src = $(el).attr('src') || '';
    if (!/img\/portfolio\//.test(src)) return;
    const box = nearestBlock($, el, 'h3');
    const name = clean(box.find('h3').first().text());
    if (!name || seen.has(name)) return;
    seen.add(name);
    items.push({ name, image: abs(src) });
  });
  return items;
}

function scrapeFaq($) {
  const items = [];
  $('h5, h6').each((_, el) => {
    const q = clean($(el).text());
    if (!/^\d+\.\s/.test(q)) return;
    items.push({ q: q.replace(/^\d+\.\s*/, ''), a: clean($(el).nextAll('p').first().text()) });
  });
  return items;
}

function scrapeTestimonials($) {
  const items = [];
  $('img').each((_, el) => {
    if (!/avatars\/avatar-/.test($(el).attr('src') || '')) return;
    const box = nearestBlock($, el, 'h4');
    const name = clean(box.find('h4').first().text());
    const quote = clean(box.find('p').first().text());
    if (name && quote) items.push({ name, quote, image: abs($(el).attr('src')) });
  });
  return items;
}

function scrapeServices($) {
  const items = [];
  $('h3 a').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (!/(turnkeyservices|Supportservice|planningservice)/.test(href)) return;
    const h3 = $(el).parent();
    items.push({ title: clean($(el).text()), text: clean(h3.nextAll('p').first().text()), link: abs(href) });
  });
  return items;
}

async function scrape() {
  const { data: html } = await axios.get(BASE, { timeout: 10000, headers: { 'User-Agent': 'Mozilla/5.0' } });
  const $ = cheerio.load(html);
  const text = clean($('body').text());

  // For each part: use scraped data if found, otherwise the fallback.
  const pick = (scraped, fb, min = 1) => (scraped.length >= min ? scraped : fb);

  return {
    source: 'scraped',
    scrapedAt: new Date().toISOString(),
    title: clean($('title').text()) || fallback.title,
    description: $('meta[name="description"]').attr('content') || fallback.description,
    logo: abs('/img/logos/logolc.png'),
    email: (text.match(/[\w.+-]+@labcreator\.in/i) || [fallback.email])[0],
    phone: (text.match(/\+91\s?\d{10}/) || [fallback.phone])[0],
    address: fallback.address,
    services: pick(scrapeServices($), fallback.services, 3),
    projects: pick(scrapeProjects($), fallback.projects, 3),
    industries: pick(scrapeIndustries($), fallback.industries, 3),
    faq: pick(scrapeFaq($), fallback.faq, 2),
    testimonials: pick(scrapeTestimonials($), fallback.testimonials, 2),
    process: fallback.process,
    products: fallback.products,
  };
}

async function getSiteData() {
  if (cache && Date.now() - cache.time < CACHE_MS) return cache.data;
  let data;
  try {
    data = await scrape();
  } catch (err) {
    console.warn('Scraping failed, using fallback data:', err.message);
    data = { ...fallback, source: 'fallback', scrapedAt: null };
  }
  cache = { time: Date.now(), data };
  return data;
}

module.exports = { getSiteData };
