import { dataInput } from "../..";
import { defiFuncType } from "../../type";
import { wait } from "../../utils/waitFunction";

export const jediSwap: defiFuncType = async (browser, sum, tokens) => {
    const page = await browser.newPage();

    try{
        await page.goto(`https://app.jediswap.xyz/#/swap`);
        await wait(3, 4); 
    
        const warningBtnElement = await page.$('.sc-gqjmRU.gkSFas.sc-hSdWYo.sc-eHgmQL.sc-cvbbAY.dostOq');
    
        if(warningBtnElement){
            await warningBtnElement.click();
            await wait(0.8, 1.2);
        }
    
        if(tokens.length !== 2) return;
    
        // from:
        const fromTokenElement = await page.evaluate(()=>document.querySelector('#swap-currency-input .token-symbol-container')?.innerHTML);
    
        if(fromTokenElement !== tokens[0]){
            await page.click('#swap-currency-input .open-currency-select-button');
            await wait(1.2, 1.6);
        
            await page.type('#token-search-input', tokens[0]);
            await wait(1.1, 1.5);
        
            await page.click('.sc-gqjmRU.sc-ckVGcZ.sc-jKJlTe.sc-likbZx');
            await wait(1.5, 2);
        }
    
        // to:
        const toTokenElement = await page.evaluate(()=>document.querySelector('#swap-currency-output .token-symbol-container')?.innerHTML);
    
        if(toTokenElement !== tokens[1]){
            await page.click('#swap-currency-output .open-currency-select-button');
            await wait(1.2, 1.8);
    
            await page.type('#token-search-input', tokens[1]);
            await wait(1.1, 1.5);
        
            await page.click('.sc-gqjmRU.sc-ckVGcZ.sc-jKJlTe.sc-likbZx');
            await wait(1.5, 2);
        }
    
    
        const input = await page.$('.token-amount-input');
    
        if(input){
            await input.click({ clickCount: 3 });
            await wait(1.8, 2);
    
            await input.type(sum);
            await wait(4, 5);
    
            await page.click('#swap-button');
            await wait(2, 3);
    
            await page.waitForSelector('#confirm-swap-or-send');
            await wait(1, 1.5);

            await page.click('#confirm-swap-or-send').catch((err) => {
                throw new Error('Insifluent balance');
            });;
        }
    
        await wait(2, 3);
        await page.close();


    
        console.log('✅ JediSwap completed');
    }catch(err: any){
        if(err.message === 'Insifluent balance') console.log(`❌ JediSwap error\n (${err.message})\n`);
        else console.log(`❌ JediSwap error\n`);

        await page.close();
        return err;
    }
}