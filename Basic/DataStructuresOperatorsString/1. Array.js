const bills = [125,555,44];
const tips = [];
const total = [];
const calcTip = (bill) => {
    return 50<=bill && bill <=300 ? bill*15/100 : bill*20/100;
} 
// const calcTip = bill => 50<=bill && bill <=300 ? bill*15/100 : bill*20/100;
//simple way
// const tips = [calcTip(bills[0]),calcTip(bills[1]),calcTip(bills[2])];
// const total = [bills[0]+tips[0],bills[1]+tips[1],bills[2]+tips[2]];
//loop way
for(let i=0;i<bills.length;i++){
    tips.push(calcTip(bills[i]));
    total.push(bills[i]+tips[i]);
    console.log(`bill: ${bills[i]}, tip: ${tips[i]}, total: ${total[i]}`);
}

console.log(tips);
console.log(total);

//continue and break
const obj = [
    'John',
    200,
    'smoking','swimming',
    14,
    214
]
console.log(obj);
console.log('---------------continue-----------------');
for(let i=0;i<obj.length;i++){
    if(typeof obj[i] !== 'string') continue;
    console.log(obj[i], typeof obj[i]);
}
console.log('---------------break-----------------');
for(let i=0;i<obj.length;i++){
    if(typeof obj[i] === 'number') break;
    console.log(obj[i], typeof obj[i]);
}


