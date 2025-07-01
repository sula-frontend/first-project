// import puppeteer from "puppeteer";
import axios from "axios";
import { dataType } from "./type";
import { getProfiles } from "./dolphin/dolphin";
import { starknet } from "./starknet/starknet";
import { wait } from "./utils/waitFunction";

const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(stealthPlugin());

//  main function
// (async () => {

//     const myArgs: string[] = [
//         `--start-maximized`,
//         `--load-extension=${process.env.ARGENT_PATH}`,
//         // `--user-data-dir=${'/Users/sultan/Library/Application Support/Google/Chrome'}`,
//         // `--profile-directory=${'Profile 1'}`
//     ];

//     const browser = await puppeteer.launch({
//         headless: false,
//         executablePath: executablePath(),
//         args: myArgs
//     });
//     const page = await browser.newPage();

// // argent login
//     await argentConnection(browser, false, true);

// // avnu
//     await page.goto(`https://app.avnu.fi/en`);
//     await wait(1000);
    
//     await page.click('.css-19jshjo');
//     await wait(500);
//     await page.click('.css-159qwc2');
//     await wait(1000);

//     // argent confirmation
//     await argentConfirmation(browser);
//     await wait(1000);

//     const input = await page.$('.css-1xzvzls');
//     await input.click({ clickCount: 3 })
//     await input.type('1');
// })();


// import * as puppeteer from 'puppeteer';

// const wait = (time: number) => {
//     return new Promise(function(resolve) { 
//         setTimeout(resolve, time)
//     });
// }

// (async () => {
//     const browser = await puppeteer.launch({headless: false});

//     const page = await browser.newPage();

//     await page.setViewport({
//         width: 1100,
//         height: 980,
//       });

//     await page.goto('chrome-extension://dlcobpjiigpikoobohmabehhmhfoodbb/account/tokens');

//     await wait(3000);

//     await page.screenshot({path: 'screen.png'});


//     await browser.close();
// })





// dolphin




// (async () => {
//     // Получение id профилей Dolphin
//     const profilesId = await getProfiles();

//     // Выбранные аккаунты
//     const needlessProfiles = [profilesId[0]];

//     // Цикл по выбранным аккаунтам
//     for(let i = 0; i < needlessProfiles.length; i++){
//         const { data } = await axios.get(`http://localhost:3001/v1.0/browser_profiles/${needlessProfiles[i]}/start?automation=1`);
//         const { port, wsEndpoint } = data.automation;
      
//         const browser = await puppeteer.connect({
//             browserWSEndpoint: `ws://127.0.0.1:${port}${wsEndpoint}`
//         });

//         await wait(2000);

//         // Starknet
//         // starknet(browser);

//         await metamaskConnection(browser, false, false);

//         const page = await browser.newPage();

//         await page.goto(`https://mint.fun/fundrop`);
//         await wait(2000);
//     }
// })();

export const dataInput: dataType = {
    value: 16,
    defies: [
        // {
        //     defi: 'zkLend',
        //     networks: ['ETH'],
        //     value: 0.001,
        //     action: 'SUPPLY',
        // },
        {
            defi: 'jediSwap',
            networks: ['USDT', 'USDC'],
            value: 0,
        },
        // {
        //     defi: 'avnu',
        //     networks: ['ETH', 'DAI'],
        //     value: 0,
        // },
        // {
        //     defi: 'tenKSwap',
        //     networks: ['DAI', 'USDT'],
        //     value: 0,
        // },
    ]
};

(async () => {
    // try{
        // Получение id профилей Dolphin
        const profilesId = await getProfiles();

        // Выбранные аккаунты
        const needlessProfiles = [profilesId[0]];

        // Цикл по выбранным аккаунтам
        for(let i = 0; i < needlessProfiles.length; i++){
            const { data } = await axios.get(`http://localhost:3001/v1.0/browser_profiles/${needlessProfiles[i]}/start?automation=1`);
            const { port, wsEndpoint } = data.automation;
        
            const browser = await puppeteer.connect({
                browserWSEndpoint: `ws://127.0.0.1:${port}${wsEndpoint}`
            });

            await wait(3, 5);

            // Starknet
            const responce = await starknet(browser, dataInput);
            if(responce !== undefined) throw new Error('Error!');
        }
        // const myArgs: string[] = [
        //     `--start-maximized`,
        //     `--load-extension=${process.env.METAMASK_PATH}`,
        //     // `--user-data-dir=${'/Users/sultan/Library/Application Support/Google/Chrome'}`,
        //     // `--profile-directory=${'Profile 1'}`
        // ];

        // const browser = await puppeteer.launch({
        //     headless: false,
        //     executablePath: executablePath(),
        //     args: myArgs
        // });






        // await wait(2000);

        // await metamaskConnection(browser, false);

        // await wait(2000);

        // const page = await browser.newPage();
        // await page.goto('https://app.holograph.xyz/');

        // await wait(2500);

        // await page.click('.w-full.flex.items-center.justify-between.border');
        // await wait(400);
        // await page.click('#ConnectWalletModal button.cursor-pointer');
        // await wait(1000);

        // await metamaskConfirmation(browser, false, true);

        // await wait(2000);

        // await page.click('.slick-slide.slick-active.slick-current button.relative.transition-colors.duration-500.py-4');
        // await wait(1000);
        // await page.click('.slick-slide.slick-active.slick-current button.relative.transition-colors.duration-500.py-4');
        // await wait(400);
    // }catch(err: any){
    //     console.log('index')
    //     return err;
    // }
})();


// FT

// const puppeteer = require('puppeteer-extra');
// const stealthPlugin = require('puppeteer-extra-plugin-stealth');

//  puppeteer.use(stealthPlugin());

//  const { executablePath } = require('puppeteer');

// const ftFunc = async () => {
//     const myArgs: string[] = [
//         `--start-maximized`,
//         `--load-extension=${process.env.USER_AGENT_PATH}`,
//         // `--user-data-dir=${'/Users/sultan/Library/Application Support/Google/Chrome'}`,
//         // `--profile-directory=${'Profile 1'}`
//     ];

//     const browser = await puppeteer.launch({
//         headless: false,
//         executablePath: executablePath(),
//         args: myArgs
//     });
//     const page = await browser.newPage();

//     await page.goto('chrome-extension://bhchdcejhohfmigjafbampogmaanbfkg/data/popup/index.html');
//     await wait(2000);

//     await page.select('select#os', 'Android');
//     await wait(2000);

//     await page.click('td:nth-child(2)');
//     await wait(500);

//     await page.click('input:nth-child(7)');
//     await wait(1000);

//     await page.goto('https://www.friend.tech/');
//     await wait(2000);

    
// }