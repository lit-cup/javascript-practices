const city = {
    west: ['Chiayi', 'Changhua','Yunlin','Chiayi County'],
    north: ['Taipei','Taoyuan','Keelung'],
    weather: {
        Chiayi: {
            Cold: 12,
            HOT: 22,
        },
        Taipei: {
            Cold: 15,
            HOT: 26,
        },
        Yunlin: {
            Cold: 17,
            HOT: 21,
        },
    },
    setCity: function(mainCity, ...otherCity){
        console.log(mainCity);
        console.log(otherCity);
    }
        
};


// Rest pattern:
// use where we would write variable names, separated by commas

// Sperator operator:
// use where we would otherwise write values, separated by a comma



// 1) destructuring

// SPREAD, because on RIGHT side of =
const arr = [1,2, ...[3,4]];
console.log(arr); //1 2 3 4

// REST, beacuse of LEFT side of =
const [a, b, ...others] = [1,2,3,4,5];
console.log(a, b, others) //1, 2, [3, 4, 5];

// REST Pattern
const [Taipei, ,Chiayi, ...otherCity]=[...city.west, ...city.north];
console.log(Taipei,Chiayi,otherCity); //Chiayi Yunlin Array(4) [ "Chiayi County", "Taipei", "Taoyuan", "Keelung" ]

// Objects
const {Yunlin, ...allcity} = city.weather;
console.log(allcity);
// Object { Chiayi: {…}, Taipei: {…} }
// ​Chiayi: Object { Cold: 12, HOT: 22 }
// ​Taipei: Object { Cold: 15, HOT: 26 }

// 2) Function

const add = function(...numbers){
    // 2-1) console.log(numbers) // print every coming number
    let sum = 0;
    for(let i=0; i<numbers.length; i++){
        sum +=numbers[i];
        console.log(sum);
    }
}
// 2-1)
// add(2,3);
// add(3,4,5,6);
// add(3,4,5,6,7,8,9);

// 2-2) usage of count arry with function
const x = [22,1,5];
add(...x);

// 2-3) 
city.setCity('Tainan', 'Taitung', 'Pingtung'); // Tainan [Taitung, Pingtung]
// alert
city.setCity('Tainan'); // Tanina [] <- empty array



