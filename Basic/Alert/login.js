var datebase = [
    {
        name: "a",
        password: "123"
    },
    {
        name: "b",
        password: "123"
    }
];

var newsFeed = [
    {
        username: "b",
        timeline: "AHHHHHH"
    },
    {
        username: "c",
        timeline: "bHHHHHH"
    }
];

function isUserValid(user,pass){
    for(var i=0; i<datebase.length;i++){
        if(user === datebase[i].name && 
            pass === datebase[i].password){
                return true;
            }
    }
    return fasle;
}

function signIn(user,pass){
    if(isUserValid(user,pass)){
        console.log("Welcome!!");
        console.log(newsFeed);
    }else{
        alert("sorry");
    }
}
var userName = prompt("What's your username?");
var password = prompt("What's your password?");
 signIn(userName,password);