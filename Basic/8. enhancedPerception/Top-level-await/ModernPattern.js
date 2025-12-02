// goal: encapsulate functionality to have private data, and expose a public API using IIFE function
// not reuse code by running it multiple times, create a new scope and return data just once

// using IIFE to invoke function immediately and ensure that it's only called once
// private data inside IIFE not accessible from outside
// we create a variable to hold the returned object from IIFE

// native javascropt module
const musicList = (function(){

    const list = [];
    const pepoleNowListiening = 10000;
    const totalListiening = 20000;
    const totalsolds = 5000;

    const addAlbumToList = (album, sold) => {
        list.push({ album, sold });
        console.log(`Added: ${album} sold ${sold} (people now listen: ${pepoleNowListiening})`);
    };

     const removeAlbumToList = (album, sold) => {
         console.log(`Removed: ${album} sold ${sold}`);
    };
    // to make function accessible from outside IIFE, we need to return them as an object like public API
    // this object contain the elements we want to be public
    return {
        addAlbumToList,
        list,
        tl: totalListiening,
        ts: totalsolds,
    };
})();
// then we can use the public API to interact with the private data we want
musicList.addAlbumToList('The Dark Side of the Moon', 25);
musicList.addAlbumToList('The Life Of A Showgirl', 15);
console.log(musicList); // only have access to public API
console.log(musicList.pepoleNowListiening); // undefined not accessible
// the reason why IIFE run only once is that we immediately invoke the function and store the returned object in musicList variable
// with [closure] the returned object still have access to the private data inside IIFE even after IIFE has finished executing

/////////////////////////////////////////////////////////////////
// CommonJS module pattern used in Node.js
// // Export module
// export.addAlbumToList = (album, sold) => {
//     list.push({ album, sold });
//     console.log(`Added: ${album} sold ${sold}`);
// };
// // import module
// const musicList = require('../musicList.js');