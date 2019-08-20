function test() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('TEST async/await');
        }, 1000);
    })
}

export default test;