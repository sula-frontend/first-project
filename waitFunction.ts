// function to wait some seconds
export const wait = (time: number) => {
    return new Promise((resolve) => { 
        setTimeout(resolve, time)
    });
}

export const randomizeWait = (from: number, to: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, (Math.floor(Math.random() * to) + from) * 1000);
    });
}