// With this city's obj the weather data in the orign is write inside and to Enhance is write outside.
// Also we can custom objs and using in the weather's obj
const twcity = ['Chiayi', 'Taipei', 'Yunlin'];
const weather = {
    [twcity[0]]: {
        Cold: 12,
        HOT: 22,
    },
    [twcity[1]]: {
        Cold: 15,
        HOT: 26,
    },
    //Or simple litral
    [`city-${1+2}`]: {
        Cold: 17,
        HOT: 21,
    },
};


const city = {
    west: ['Chiayi', 'Changhua','Yunlin','Chiayi County'],
    north: ['Taipei','Taoyuan','Keelung'],
    // And call inside the city's obj ES6 enhanced object literals
    weather,
    // Other Enhanced is remove the function we could use simply like below
    // original: setCity: function(mainCity, ...otherCity){}
    setCity(westindex, northindex){
        return [this.west[westindex], this.north[northindex]]
    }
        
};

// Case 1 can't see content in the obj like
console.log(city.weather.Yunlin.Cold);

// WITH optional chaining: " ?. "
// if weather is exist, if Yunlin is exist
console.log(city.weather?.Yunlin?.Cold);

// Example if the city is exist check with nullish operator
const tcity = ['Chiayi', 'Taipei', 'Yunlin'];
for(const citys of tcity){
    const tep = city.weather[citys]?.Cold ?? 'Not exist';
    console.log(`At ${citys}, the lowest degress is ${tep}`);
}

// To Methods check
console.log(city.setCity?.(0, 1) ?? 'Method does not exist');

console.log(city.setCityOr?.(0,1) ?? 'Method does not exist');

// To Array check
const users = [{
        name: 'Shou',
        email: 'test@haha.io',}]
const users2 = [];
console.log(users[0]?.name ?? 'User Array empty');
console.log(users2[0]?.name ?? 'User Array empty');

// users2[0]?.name ?? 'User Array empty', logical is like below
if(users2.length > 0) console.log(users2[0].name);
else console.log('User array empty');