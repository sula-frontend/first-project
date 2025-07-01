import { defiFuncType } from "../../type";
import { wait } from "../../utils/waitFunction";

export const tenKSwap: defiFuncType = async (browser, sum, tokens) => {
    const page = await browser.newPage();

    try{
        await page.goto(`https://10kswap.com/swap`);
        await wait(3, 4); 
    
        if(tokens.length !== 2) return;
    
        // from:
        await page.click('.l0k-swap-currency-input-panel:nth-child(1) .l0k-swap-select-token--button');
        await wait(1.2, 1.8);
    
        const fromTokenElement = await page.evaluate((token) => {
            const allTokens = document.querySelectorAll('.l0k-swap-currency-input-panel:nth-child(1) .l0k-swap-select-token--token');
            let tokenElement
            let tokenName;
    
            for(let i = 0; i <= allTokens.length; i++){
                tokenName = document.querySelector(`.l0k-swap-currency-input-panel:nth-child(1) .l0k-swap-select-token--token:nth-child(${i}) .l0k-swap-text`)?.innerHTML;
                tokenElement = `.l0k-swap-currency-input-panel:nth-child(1) .l0k-swap-select-token--token:nth-child(${i})`;
    
                if(tokenName === token){
                    return tokenElement;
                }
            }
    
            return '';
        }, tokens[0]);
    
        await page.click(fromTokenElement);
        await wait(1, 1.5);
    
        // to:
        await page.click('.l0k-swap-currency-input-panel:nth-child(3) .l0k-swap-select-token--button');
        await wait(1.2, 1.8);
    
        const toTokenElement = await page.evaluate((token) => {
            const allTokens = document.querySelectorAll('.l0k-swap-currency-input-panel:nth-child(3) .l0k-swap-select-token--token');
            let tokenElement
            let tokenName;
    
            for(let i = 0; i <= allTokens.length; i++){
                tokenName = document.querySelector(`.l0k-swap-currency-input-panel:nth-child(3) .l0k-swap-select-token--token:nth-child(${i}) .l0k-swap-text`)?.innerHTML;
                tokenElement = `.l0k-swap-currency-input-panel:nth-child(3) .l0k-swap-select-token--token:nth-child(${i})`;
    
                if(tokenName === token){
                    return tokenElement;
                }
            }
    
            return '';
        }, tokens[1]);
    
        await page.click(toTokenElement);
        await wait(1, 1.5);
    
    
        const input = await page.$('input');
    
        if(input){
            await input.click({ clickCount: 3 });
            await wait(1.8, 2);
    
            await input.type(sum);
            await wait(3, 5);
    
            await page.click('.l0k-swap-button.l0k-swap-button--primary.l0k-swap-button--large.l0k-swap-button--bold');
            await wait(1.5, 2);
    
            await page.waitForSelector('.l0k-swap-button.l0k-swap-button--primary.l0k-swap-button--normal.l0k-swap-button--bold');
            await wait(1, 1.5);

            await page.click('.l0k-swap-button.l0k-swap-button--primary.l0k-swap-button--normal.l0k-swap-button--bold').catch((err) => {
                throw new Error('Insifluent balance')
            });
        }
    
        await wait(2, 3);
        await page.close();
    
        console.log('✅ 10k completed');
    }catch(err: any){
        if(err.message === 'Insifluent balance') console.log(`❌ 10k error\n (${err.message})\n`);
        else console.log(`❌ 10k error\n`);

        await page.close();
        return err;
    }
}