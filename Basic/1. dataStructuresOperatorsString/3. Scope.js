'use strict';
function calcAge(birthYear){
    const age = 2037- birthYear;
    //1. Scope could read by parent layer because of scope chain
    //(O)console.log(firstName);
    function printAge(){
        const output = `You are ${age}, born in ${birthYear}`;
        console.log(output);
    }
    printAge();

    //block scope
    if(birthYear>= 1989 && birthYear<=2020){
        //var is spical can read anywhere not recommend to use
        var millenial = true;
        //Creating New Variable with same name as outer scope's variable
        const firstName='Josho';
        const str=`You are quite Younger, ${firstName}`;
        console.log(str);

        function add(a,b){
            return a+b;
        }

        //Could reassinging outer variable
        output='NEW';
        //but can't defined in the same
        //(X)const output = "NEW";
    }
    console.log(millenial);
    //if it is not static mode it will work
    // console.log(add(1,3));
    console.log(output);
    return age;
}

const firstName = 'Hano';
calcAge(2000)
//Parent layer can't read child funtion and value
//(X)console.log(age)
//(X)printAge()