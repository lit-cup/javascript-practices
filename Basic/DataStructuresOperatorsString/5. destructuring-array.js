'use strict'
const restaurant ={
    name: 'Beef-noodle',
    location: 'Taiwan',
    categories: ['Taiwan', 'China', 'Japan'],
    staterMenu: ['Beef-noodle', 'Dumplings', 'beef-soup'],
    mainMenu: ['Beef-noodle', 'rice', 'Beef-Dumplings'],
    order: function(staterIndex, mainIndex){
        return [this.staterMenu[staterIndex], this.mainMenu[mainIndex]];
    }
};
//destructuring array
const [first, section]=restaurant.categories;
//Result = Taiwan China

//Switching variables
let [main, , secondary]=restaurant.categories;
const temp = main;
main = secondary;
secondary = temp;
//===
[main, secondary] = [secondary, main];
//Result = China Taiwn

//Receive 2 return values from a function
const [starter, mainCourse]= restaurant.order(2,0);
//Result = Beef-soup Beef-noodle


//Nested destructuring
const nested = [2, 4, [5, 6]];
const [i, ,j] =nested;
//Result = 2 [5,6]
const [k, , [l, n]] = nested;
//Result = 2, 5, 6 skiped 4

//default values
const [p,q,r]= [8,9];
//Result = 8,9 undefined
//But if we set value
const [a=1, b=1, c=1] = [8,9];
//Result become = 8, 9, 1
//Useful to check get API