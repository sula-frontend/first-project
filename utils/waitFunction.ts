// function to wait some seconds
export const wait = (from: number, to?: number) => {
    let time = from * 1000;

    if(to) time = (Math.floor(Math.random() * to) + from) * 1000;

    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}