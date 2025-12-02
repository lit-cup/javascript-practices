'use strict';

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};


// Promise.all()
// const getThreeConturies = async function(c1,c2,c3){
//     try{
        
//         // basicaly way data load time step by step
//         // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//         // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//         // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
//         // console.log(data1.capital, data2.capital, data3.capital);

//         // to save loading time at same time using parallel: Promise.all() one reject all reject as well
//         const data = await Promise.all(
//             [getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//             getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//             getJSON(`https://restcountries.com/v3.1/name/${c3}`),]
//         );
//         console.log(data.map(d => d[0].capital.toString()));
//     }catch(err){
//         console.error(err);
//     }
// }

// getThreeConturies('USA','canada', 'Taiwan');

// Promise.race(): short circuits whenever one of the promise gets settled, which one win the race
// useful to prevent against never ending promise or also very long promise
// etc user have really bad internet connection than a fetch request in our application
(async function () {
    const res = await Promise.race([ 
         getJSON(`https://restcountries.com/v3.1/name/USA`),
         getJSON(`https://restcountries.com/v3.1/name/canada`),
         getJSON(`https://restcountries.com/v3.1/name/Taiwan`),
        ]);
    console.log(res[0]);
})();
// this might be too long so we could create automatically reject after a certain time has passed
const timeout = function(sec){
    return new Promise(function(_, reject){
        setTimeout(function(){
            return reject(new Error('Reuqest too long!!!'));
        }, sec*1000);
    });
}
//test if 0.001 sec not have result from fetch log error sign
Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/USA`),
    timeout(0.001),
]).then(res => console.log(res))
  .catch(err => console.error(err));
// IIFE need to be careful with this sitution
// before IIFE need ending ; than it will have type error
// const getJson = function(){} <- miss ending mark
// (async function(){....}());


//Promise.allSettled() is like Promise.all() but simply never short circuits return all the result of promise
Promise.allSettled([
    Promise.resolve('Sucess'),
    Promise.reject('ERROR'),
    Promise.resolve('another sucess'),
]).then(res=> console.log(res));
// result
// (3) [{…}, {…}, {…}]
// 0
// : 
// {status: 'fulfilled', value: 'Sucess'}
// 1
// : 
// {status: 'rejected', reason: 'ERROR'}
// 2
// : 
// {status: 'fulfilled', value: 'another sucess'}
// length
// : 
// 3
// [[Prototype]]
// : 
// Array(0)

// not like .all() when reject it short circuits
Promise.all([
    Promise.resolve('Sucess'),
    Promise.reject('ERROR'),
    Promise.resolve('another sucess'),
]).then(res=> console.log(res));
// result
// index.html:1 Uncaught (in promise) ERROR

// Promise.any() result always is first fullfill promise ignore reject 
Promise.any([
    Promise.resolve('any Sucess'),
    Promise.reject('any ERROR'),
    Promise.resolve('any another sucess'),
]).then(res=> console.log(res));