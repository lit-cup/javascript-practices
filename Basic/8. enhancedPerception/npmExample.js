import addAlbumToList, { list } from './Top-level-await/musiclist.js';
addAlbumToList('1 New Song', 10);
addAlbumToList('Another Song', 7);
addAlbumToList('Third Song', 3);
addAlbumToList('Fourth Song', 5);
addAlbumToList('Fourth Song', 5);
console.log(list);

// this example show how to use npm package in native javascript module
// we use lodash-es package to perform deep clone of an object
// we create a sample object with nested properties
// then we use lodash-es cloneDeep function to create a deep clone of the object
// then we change the original object to show that the deep clone is working by changes to the original object
// import cloneDeep from "../Perception/node_modules/lodash-es/cloneDeep.js";

// we also can use other method to import like below if the bundler support it
import { cloneDeep } from 'lodash-es';

const state = {
    user: {
        name: "Alice",
        preferences: {
            notifications: true,
        },
    },
    items: [1, 2, 3, 4, 5],
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.name = "Bob";
state.user.preferences.notifications = false;

console.log("Shallow Clone:", stateClone);
// output the shallow cloned state using Object.assign
console.log("Deep Clone:", stateDeepClone);
// output the deep cloned state using lodash via npm node_modules package

// Hot Module Replacement (HMR) - only works when using a bundler like Parcel or Webpack
// allows us to update modules in the browser at runtime without a full refresh
// useful for development to see changes instantly without losing state
if(module.hot){
    module.hot.accept();
}

// use babel and polyfill modern JS features for older browsers
// goal: babel and polyfiling purpos let old browsers run modern JS code
// when we write ES6+ code, the function might not be supported in older browsers
// babel can transpile the code to ES5 and polyfill missing features

// BABEL
// babel basically future proof our code by transpiling modern JS syntax to older syntax
// then automatically build step from using bundlers like Webpack or Parcel

// POLYFILLING
// polyfills like plugins or libraries that add missing features to older browsers


// for example we can use core-js to polyfill features like Promise, Array.from, etc.
import 'core-js/stable';

// for async/await support in older browsers, we can use regenerator-runtime
import 'regenerator-runtime/runtime';

// self extra note:
// 1. @babel/prest-env can automatically determine the necessary transformations and polyfills based on the target browser environments we specify

// 2. why use regenerator-runtime?
// because in old browsers that do not support async/await natively, babel transpiles async functions into generator functions

// 3. when we are not use polyfill?
{
// 3-1. when we are targeting modern browsers that already support the features we are using
// 3-2. when we use babel with prest-env usage option to only include necessary polyfills based on target browsers
// 3-3. prest-env usage option include: "usage" | "entry" | "false"
//      "usage": automatically add imports for polyfills based on the code we write
//      "entry": we manually import core-js and regenerator-runtime at the entry point of our application
//      "false": no polyfills are added, we handle it ourselves
// 3-4. small demo, self project, course projects, etc. don't need polyfill for old browsers
}