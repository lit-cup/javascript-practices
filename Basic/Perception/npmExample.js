import cloneDeep from "../Perception/node_modules/lodash-es/cloneDeep.js";

// this example show how to use npm package in native javascript module
// we use lodash-es package to perform deep clone of an object
// we create a sample object with nested properties
// then we use lodash-es cloneDeep function to create a deep clone of the object
// then we change the original object to show that the deep clone is working by changes to the original object
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