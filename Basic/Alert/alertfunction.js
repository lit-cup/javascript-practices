const data1Dolphins = 44+23+71;
const data1Koalas = 65+54+49;
const data2Dolphins = 85+54+41;
const data2Koalas = 23+34+27;

function calcAverage(scores){
    return scores/3;
}

const calcAverage = (a,b,c) => (a+b+c)/3;

const checkWinner = function (scoreDolphins, scoreKoalas){
    const avgDolphins = calcAverage(scoreDolphins);
    const avgKoalas = calcAverage(scoreKoalas);
    if(avgDolphins> avgKoalas*2){
        console.log('Dolphins win ('+avgDolphins+' vs. '+avgKoalas+')');
    }else if(avgKoalas> avgDolphins*2){
        console.log('Koalas win ('+avgKoalas+' vs. '+avgDolphins+')');
    }else{
        console.log('No team wins...')
    }
    
}
checkWinner(data1Dolphins,data1Koalas);