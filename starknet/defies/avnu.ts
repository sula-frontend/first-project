import { defiFuncType } from "../../type";
import { wait } from "../../utils/waitFunction";

export const avnu: defiFuncType = async (browser, sum, tokens) => {
    const page = await browser.newPage();

    try{
        await page.goto(`https://app.avnu.fi/en`);
        await wait(2, 3);
        
        // const isConnected = await page.evaluate(() => document.querySelector('.css-19jshjo'));
    
        // if(isConnected !== null){
        //     await page.click('.css-19jshjo');
        //     await wait(500);
        //     await page.click('.css-159qwc2');
        //     await wait(1000);
        
        //     // argent confirmation
        //     await argentConfirmation(browser);
        //     await wait(1000);
        // }
    
        if(tokens.length !== 2) return;
    
        // from:
        // @ts-ignore
        const fromTokenElement = await page.evaluate(()=>document.querySelector('.chakra-stack.css-11d47qo:nth-child(1) button.chakra-button.css-lg3po7')?.innerText);
    
        if(fromTokenElement !== tokens[0]){
            await page.click('.chakra-stack.css-11d47qo:nth-child(1) button.chakra-button.css-lg3po7');
            await wait(1.2, 1.8);
        
            await page.type('input.chakra-input.css-149nt9l', tokens[0]);
            await wait(1.1, 1.6);
        
            await page.click('.chakra-stack.css-10k9nsp > div');
            await wait(1.5, 2);
        }
    
        // to:
        // @ts-ignore
        const toTokenElement = await page.evaluate(()=>document.querySelector('.chakra-stack.css-11d47qo:nth-child(3) button.chakra-button.css-lg3po7')?.innerText)
    
        if(toTokenElement !== tokens[1]){
            await page.click('.chakra-stack.css-11d47qo:nth-child(3) button.chakra-button.css-lg3po7');
            await wait(1.2, 1.8);
        
            await page.type('input.chakra-input.css-149nt9l', tokens[1]);
            await wait(1.1, 1.6);
        
            await page.click('.chakra-stack.css-10k9nsp > div');
            await wait(1.5, 2);
        }
    
    
        const input = await page.$('.css-1xzvzls');
    
        if(input){
            await input.click({ clickCount: 3 });
            await wait(0.8, 1.2);
    
            await input.type(sum);
            await wait(1.3, 1.8);

            page.click('.chakra-button.css-10jjicg').catch((err) => {
                throw new Error('Insifluent balance')
            });;
        }
        
        await wait(2, 3);
        await page.close();
    
        console.log('✅ Avnu completed');
    }catch(err: any){
        if(err.message === 'Insifluent balance') console.log(`❌ Avnu error\n (${err.message})\n`);
        else console.log(`❌ Avnu error\n`);

        await page.close();
        return err;
    }
}