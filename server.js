// Web server: gets the scraped data and shows it on the landing page.
const express = require('express');
const path = require('path');
const { getSiteData } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// Home page
app.get('/', async (req, res, next) => {
  try {
    const data = await getSiteData();
    res.render('index', { data, sent: req.query.sent === '1' });
  } catch (err) {
    next(err);
  }
});

// Raw scraped data as JSON (handy for checking the scraper)
app.get('/api/data', async (req, res, next) => {
  try {
    res.json(await getSiteData());
  } catch (err) {
    next(err);
  }
});

// Contact form: only logs the message for now. Connect email or a database here.
app.post('/contact', (req, res) => {
  console.log('New inquiry:', req.body);
  res.redirect('/?sent=1#contact');
});

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
