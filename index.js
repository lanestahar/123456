const puppeteer = require('puppeteer');
const json2csv = require('json2csv');
const fs = require('fs');
//deploy this file in cloud code and edit it to set wuery results to database objects
//import Parse from "parse/react-native";

//Parse.initialize('R8LhSpyeiIN5kLhe5WWf2lnos9eVTuE5t2Yr3oSO','GauzzcQiVspo0wYmQ7MgajrEej4yTUdAIiEqnLrY');




exports.happyCrawler = async () => {
    //open the browser, navigate to the page and wait for it to load
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.dogus.edu.tr/duyurular");
    await page.waitForTimeout(1000);

    //evaluate the page to extract data from it
    //page.evaluate function returns a promise
    //we need to set our data as the value of that promise
    const news = page.evaluate(() => {
        //define an array to hold the exracted data
        const linksArr = [];
        //query and extract data
        document.querySelector("div.announcements-list.grid").querySelectorAll("a").forEach(async a => {
            await a.click(); //here I achieved navigate through pages, next part is tp figure out what to do when it goes to page
            console.log("This line works!");
            const newsDetail = page.evaluate(() => {
                try {
                    const title = document.querySelector("article > h1").innerText;
                    const date = document.querySelector("article > span").innerText;
                    const content = document.querySelectorAll("p").forEach(p => {
                        const c = c + p.innerText;
                        return c;
                    });
                    linksArr.push(
                        title,
                        date,
                        content
                    );
                    return newsArr;
                }
                catch (error) {
                    console.log("Error is located inside here!");
                    console.log(error.message);
                }
                return linksArr;
            });
            newsDetail.then(val => {
                fs.writeFile('./annuoncements.txt', val, 'utf-8');
            }).catch(err => (console.log(err)));
        });
        //return the array as value of the promise 
        return linksArr;
    });
    //resolve the promise with the array that holds our extracted data
    news.then((value) => {
        console.log(value);
    }).catch(err => (console.log(err)));
}

