
import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage();
  
  // Collect console logs and errors
  page.on("console", msg => console.log("BROWSER:", msg.text()));
  page.on("pageerror", err => console.log("ERROR:", err.message));
  
  await page.goto("http://localhost:5000");
  
  // Wait a bit for any async errors
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  await browser.close();
})();

