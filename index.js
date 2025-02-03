import express from 'express'
import puppeteer from 'puppeteer';   // Automates browser
import fetch from 'node-fetch';      // For direct API calls
import * as auth from 'node-sp-auth';
import fs from 'fs'
import { scrollPageToBottom } from 'puppeteer-autoscroll-down';

const app = express();
const PORT = 8080;

app.use(express.json());
const siteUrl = 'https://szgql.sharepoint.com';

// Choose your authentication method (uncomment the one you want to use)

// **1. Username/Password Authentication**
// const credentials = {
//   username: 'bibhuti@szgql.onmicrosoft.com',
//   password: 'Qipoint20192019'
// };

app.get('/', async(req, res) => {
  try {
  //   const browser = await puppeteer.launch({
  //     headless: false, // Set to true for production
  //     args: ['--no-sandbox', '--disable-setuid-sandbox']
  //   });
  //   const page = await browser.newPage();
  //   page.setDefaultNavigationTimeout(60000);
  //   const loginUrl = 'https://szgql.sharepoint.com/sites/NewProject/SitePages/ECGI-POC.aspx';
  //   await page.goto(loginUrl, { waitUntil: 'networkidle2' });
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   await page.type('input[type="email"]', 'bibhuti@szgql.onmicrosoft.com');
  //   await page.click('input[type="submit"]');
  //   console.log('Email entered and "Next" clicked.');
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   await page.waitForSelector('input[type="password"]', { timeout: 30000 });
  //   await page.type('input[type="password"]', 'Qipoint20192019');
  //   console.log('Clicking Sign In...');
  //   await page.click('input[type="submit"]');
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  //   await page.click('input[type="submit"]');
  //   await page.waitForNavigation();
  //   await page.waitForSelector('[id="spPageCanvasContent"]', { timeout: 10000 });
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  //   await page.evaluate(() => {
  //     document.querySelector('[id="spPageCanvasContent"]').scrollIntoView({ behavior: 'smooth', block: 'center' });
  // });
  //   await new Promise((resolve) => setTimeout(resolve, 4000));
  //   const divContent = await page.evaluate(() => {
  //     const element = document.querySelector('[id="spPageCanvasContent"]');
  //     return element ? element.innerHTML.trim() || "Div found but no text!" : "Div not found!";
  // });
    // res.json({htmlContent:divContent,status:"true"})
    res.json({htmlContent:"HIIII",status:"true"})

    // await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
});

async function autoScroll(page) {
  await page.evaluate(async () => {
    let previousHeight = 0;
    let sameHeightCount = 0; // Counter to track if the scroll height is unchanged multiple times
    const maxAttempts = 10; // Stop after 10 attempts if height doesn't change
    const scrollDelay = 1000;

    while (sameHeightCount < maxAttempts) {
        window.scrollBy(0, window.innerHeight);
        await new Promise(resolve => setTimeout(resolve, scrollDelay));

        let newHeight = document.documentElement.scrollHeight;
        if (newHeight === previousHeight) {
            sameHeightCount++;
        } else {
            sameHeightCount = 0;
        }
        previousHeight = newHeight;
    }
});
}


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
