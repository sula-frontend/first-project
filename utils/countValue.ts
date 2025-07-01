import { Page } from "puppeteer";
import { dataInput } from "..";
import { wait } from "./waitFunction";

export const countValue = async (page: Page) => {
    // разобратсья сздесь
    const innerValue = await page.evaluate(() => document.querySelector('.css-r3c6q7')?.innerHTML);

    if(innerValue){
        const newValue = innerValue.split(' ')[0].slice(1);

        dataInput.value = Number(newValue);
    }
}