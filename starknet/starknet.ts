import { argentConfirmation, argentConnection } from "../wallets/argent";
import { dataType, defiType } from "../type";

import { Browser } from "puppeteer";
import { defiesConsts } from "../consts";
import { wait } from "../utils/waitFunction";

export const starknet = async (browser: Browser, dataInput: dataType) => {
    try{
        console.log('-------------- Starknet started --------------\n\n');

        // Подключение Argent
        await argentConnection(browser, true, true);

        await wait(2, 3);

        const { defies } = dataInput;

        for(let i = 0; i < defies.length; i++){
            const { defi, value, networks, action } = defies[i];
            const defiFunc = defiesConsts[defi];
            let newValue;
            let oldValue;

            if(Object.values(defies[i])[0] === 'zkLend') newValue = value;
            else if(dataInput.value) newValue = dataInput.value;
            else newValue = value;

            oldValue = newValue;

            const responce = await defiFunc(browser, newValue.toString(), networks, action && action);
            
            if(responce !== undefined) throw new Error('Error!');
            
            if(Object.values(defies[i])[0] !== 'zkLend') {
                await argentConfirmation(browser, true);

                console.log(`${oldValue} ${networks[0]} -> ${newValue} ${networks[1]}\n`);
            }else if(Object.values(defies[i])[0] === 'zkLend'){
                await argentConfirmation(browser, false);

                console.log(`${action} ${newValue} ${networks[0]}\n`);
            }
        }

        console.log('\n\n-------------- Starknet ended --------------');
    }catch(err: any){
        console.log('\n\n-------------- Starknet ended --------------');
        return err.message;
    }
}

// Don't use
// #region mySwap
// const mySwap = async (browser: Browser, sum: string, tokens: string[]) => {
//     const page = await browser.newPage();

//     await page.goto(`https://www.myswap.xyz/`);
//     await wait(3, 4); 

//     const warningBtnElement = await page.$('.cursor-pointer.rounded-lg.flex.p-2.items-center.justify-center.text-white');

//     if(warningBtnElement){
//         await warningBtnElement.click();
//         await wait(0.8, 1.2);
//     }

//     if(tokens.length !== 2) return;

//     // from:
//     await page.click('.p-4:nth-child(2) > .flex.justify-between .select-none');
//     await wait(1.5, 2);

//     const fromTokenElement = await page.evaluate((token) => {
//         const allTokens = document.querySelectorAll('.p-6.mx-4.rounded-xl.m-auto.flex.flex-col.w-full > div:nth-child(2) > div');
//         let tokenElement;
//         let tokenName;

//         for(let i = 1; i <= allTokens.length; i++){
//             tokenName = document.querySelector(`.p-6.mx-4.rounded-xl.m-auto.flex.flex-col.w-full > div:nth-child(2) > div:nth-child(${i}) span.font-bold`)?.innerHTML;
//             tokenElement = `.p-6.mx-4.rounded-xl.m-auto.flex.flex-col.w-full.p-6 div:nth-child(2) > div:nth-child(${i}) span.font-bold`;

//             if(tokenName === token){
//                 return tokenElement;
//             }
//         }

//         return '';
//     }, tokens[0]);

//     await page.click(fromTokenElement);
//     await wait(1, 1.5);

//     // to:
//     await page.click('.p-4:nth-child(4) > .flex.justify-between .select-none');
//     await wait(1.5, 2);

//     const toTokenElement = await page.evaluate((token) => {
//         const allTokens = document.querySelectorAll('.p-6.mx-4.rounded-xl.m-auto.flex.flex-col.w-full > div:nth-child(2) > div');
//         let tokenElement
//         let tokenName;

//         for(let i = 1; i <= allTokens.length; i++){
//             tokenName = document.querySelector(`.p-6.mx-4.rounded-xl.m-auto.flex.flex-col.w-full > div:nth-child(2) > div:nth-child(${i}) span.font-bold`)?.innerHTML;
//             tokenElement = `.p-6.mx-4.rounded-xl.m-auto.flex.flex-col.w-full > div:nth-child(2) > div:nth-child(${i}) span.font-bold`;

//             if(tokenName === token){
//                 return tokenElement;
//             }
//         }

//         return '';
//     }, tokens[1]);

//     await page.click(toTokenElement);
//     await wait(1, 1.5);


//     const input = await page.$('.bg-transparent.text-right.text-white.outline-none.w-full');

//     if(input){
//         await input.click({ clickCount: 3 });
//         await wait(1.8, 2.2);

//         await input.type(sum);
//         await wait(2, 3);

//         await page.click('.mt-4.cursor-pointer.rounded-lg.flex.p-2.items-center.justify-center.text-white');
//     }

//     // await wait(2, 3);
//     // await page.close();

//     // console.log('✅ mySwap completed\n');
// }
// #endregion mySwap