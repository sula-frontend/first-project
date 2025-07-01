import { defiFuncType } from "../../type";
import { wait } from "../../utils/waitFunction";

export const zkLend: defiFuncType = async (browser, sum, tokens, action) => {
    const page = await browser.newPage();

    const token = tokens[0];

    try{
        await page.goto(`https://app.zklend.com/markets`);
        await wait(3, 5);
    
        const needlessToken = await page.evaluate((token) => {
            const allTokens = document.querySelectorAll('.w-full.justify-between.items-center.text-center.rounded-sm.cursor-pointer.backdrop-blur-sm');
            let tokenElement;
            let tokenName;
    
            for(let i = 0; i <= allTokens.length; i++){
                tokenName = document.querySelector(`.w-full.justify-between.items-center.text-center.rounded-sm.cursor-pointer.backdrop-blur-sm:nth-child(${i}) span.p2`)?.innerHTML;
                tokenElement = `.w-full.justify-between.items-center.text-center.rounded-sm.cursor-pointer.backdrop-blur-sm:nth-child(${i}) span.p2`
    
                if(tokenName === token){
                    return tokenElement;
                }
            }
    
            return '';
        }, token);
    
        await page.click(needlessToken);
        await wait(1, 1.5);
    
        await page.click('.w-full.h-full.l3C');
        await wait(0.4, 1);
    
        if(action === 'SUPPLY'){
            await page.click('.h-full.flex.center.transition-colors.border:nth-child(1)');
            await wait(0.7, 1);
    
            await page.type('input', sum);
            await wait(1, 1.5);
    
            await page.click('button.w-full.h-full.l2C').catch((err) => {
                throw new Error('Insifluent balance');
            });
        }else if(action === 'WITHDRAW'){
            await page.click('.h-full.flex.center.transition-colors.border:nth-child(2)');
            await wait(0.7, 1);
    
            await page.type('input', sum);
            await wait(1, 1.5);
    
            await page.click('button.w-full.h-full.l2C').catch((err) => {
                throw new Error('Insifluent balance');
            });
        }
    
        await wait(2, 3);
        await page.close();
    
        console.log('✅ zkLend completed');
    }catch(err: any){
        if(err.message === 'Insifluent balance') console.log(`❌ ZkLend error\n (${err.message})\n`);
        else console.log(`❌ ZkLend error\n`);

        await page.close();
        return err;
    }
}