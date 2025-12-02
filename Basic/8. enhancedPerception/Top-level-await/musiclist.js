// Export module
// if await outside of async function has top level await, then it will block further execution imported modules await execute
// until the awaited promise is resolved

// blocking fetch until topLevelAwait.js await is executed
// console.log('Start fetching posts...');
// await fetch('https://jsonplaceholder.typicode.com/posts');
// console.log('Finished fetching posts.');

const pepoleNowListiening = 10000;
export const list = [];

export const addAlbumToList = (album, sold) => {
    list.push({ album, sold });
    console.log(`Added: ${album} topboard ${sold}`);
};

const totalListiening = 20000;
const totalsolds = 5000;

export { totalListiening as tL, totalsolds };

export default (album, sold) => {
    list.push({ album, sold });
    console.log(`Added: ${album} sold ${sold}`);
};