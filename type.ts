import { Browser } from "puppeteer";

// (browser: Browser, sum: string, tokens: string[], action?: string) => Promise<any>,

// export enum Defies {
//     'zkLend',
//     'jediSwap',
//     'avnu',
//     'tenKSwap'
// }

export type defiesT = 'zkLend' | 'jediSwap' | 'avnu' | 'tenKSwap'

export type defiType = {
    defi: defiesT,
    networks: string[],
    value: number,
    action?: string
};

export type dataType = {
    value?: number,
    defies: defiType[]
}

export type defiDataType = [Browser, string, string[], string | undefined];
export type defiFuncType = (browser: Browser, sum: string, tokens: string[], action?: string) => void | any;