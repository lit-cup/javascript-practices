// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")

// 2. Use a loop to calculate the average odd and log it to the console (we already studied how to calculate averages, you can go check if you don't remember)

// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
//     Odd of victory Bayern Munich: 1.33
//     Odd of draw: 3.25
//     Odd of victory Borussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//      {
//          Gnabry: 1,
//          Hummels: 1,
//          Lewandowski: 2
//      }

const game ={
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2034',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
console.log('======== 1 ========')
for(const [index, player] of game.scored.entries()){
    console.log(`Goal ${index+1}: ${player}`);
}

// 2. Use a loop to calculate the average odd and log it to the console (we already studied how to calculate averages, you can go check if you don't remember)
console.log('======== 2 ========')
let total = 0;
const odds = Object.values(game.odds);
for(const index of odds){
    total += index;
}
console.log(`Total Odd: ${total}, Length: ${odds.length}`);
console.log(`Averages: ${total/odds.length}`);


// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
//     Odd of victory Bayern Munich: 1.33
//     Odd of draw: 3.25
//     Odd of victory Borussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names
console.log('======== 3 ========')
for(const index of Object.keys(game.odds)){
    // first try
    // if(index === 'team1') console.log(output+`victory ${game[index]}: ${game.odds[index]}`);
    // else if(index === 'x') console.log(output+`draw: ${game.odds[index]}`);
    // else if(index === 'team2') console.log(output+`victory ${game[index]}: ${game.odds[index]}`);
    //Enhanced
    const teamStr = index === 'x' ? 'draw' : `victory ${game[index]}: `
    console.log(`Odd of ${teamStr} ${game.odds[index]}`);
}

// Guide
// for(const [team, odd] of Object.entries(game.odds)){
//     const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}:`
//     console.log(`Odd of ${teamStr} ${odd}`);
// };

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//      {
//          Gnabry: 1,
//          Hummels: 1,
//          Lewandowski: 2
//      }
console.log('======== BONUS ========')
const scorers = {};
// if scorers is exist
for(const player of game.scored){
    scorers[player] ? scorers[player]++ : ( scorers[player] = 1 );
    // if (scorers[player]) {
    //     scorers[player]++;
    // } else {
    //     scorers[player] = 1;
    // }
}
console.log(scorers);