 const puppeteer = require('puppeteer');
const extractItems = async (page) => {
    let maps_data = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".Nv2PK")).map((el) => {
            const link = el.querySelector("a.hfpxzc").getAttribute("href");
            return {
                title: el.querySelector(".qBF1Pd")?.textContent.trim(),
                avg_rating: el.querySelector(".MW4etd")?.textContent.trim(),
                image: el.querySelector(".FQ2IWe img")?.getAttribute("src"),
                address: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:last-child")?.textContent.replaceAll("·", "").trim(),
                description: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(2)")?.textContent.replace("·", "").trim(),
                website: el.querySelector("a.lcr4fd")?.getAttribute("href"),
                category: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:first-child")?.textContent.replaceAll("·", "").trim(),
                timings: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(3) > span:first-child")?.textContent.replaceAll("·", "").trim(),
                phone_num: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(3) > span:last-child")?.textContent.replaceAll("·", "").trim(),
                extra_services: el.querySelector(".qty3Ue")?.textContent.replaceAll("·", "").replaceAll("  ", " ").trim(),
                latitude: link.split("!8m2!3d")[1].split("!4d")[0],
                longitude: link.split("!4d")[1].split("!16s")[0],
                link,
                dataId: link.split("1s")[1].split("!8m")[0],
            };
        });
    });
    return maps_data;
}
const sleep = ms => new Promise(res => setTimeout(res, ms));
const scraper = async (res) => {
  const browser = await puppeteer.launch({ headless: false });
        const [page] = await browser.pages();

        await page.goto('https://www.google.com/maps/search/restaurants/@31.506432,74.3243776,10z', {
            waitUntil: 'domcontentloaded',
            timeout: 60000,
        });
      await sleep(5000);
      data = await extractItems(page);
        data = JSON.stringify(data)
        res.send(data);
      await browser.close();
  
}
module.exports = { scraper };