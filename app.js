// app.js
const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/assets', express.static('assets'));
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'templates'));
app.get('/', (req, res) => {
    res.render('screen-capture');
});


app.post('/capture', async (req, res) => {
    const { startX, startY, width, height, format } = req.body;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 }); // Set viewport size as needed

    // Adjust the following to navigate to the desired URL
    await page.goto('https://www.example.com');

    // Capture screenshot based on user-selected cropping area
    const screenshot = await page.screenshot({
        clip: {
            x: parseInt(startX),
            y: parseInt(startY),
            width: parseInt(width),
            height: parseInt(height)
        },
        type: format
    });

    await browser.close();

    res.contentType('image/' + format);
    res.send(screenshot);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
