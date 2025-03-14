const obj ={
    nameobj: 'test reference',
    mainObj: [1,2,3,4],
    secondObj: [7,8,9,10],
    funObj: function(index1, index2, index3){
        console.log(index1,index2, index3);
    }
};

//When need to mix to array
//The simple way is do 
    const arr = [7,8,9];
    const bedNewArr = [1,2,arr[0],arr[1],arr[2]];

    //but use "..." may be better like this
    const betterNewArr = [1,2, ...arr];

//Than if want to output array also can use like
    console.localStorage(...arr); //7 8 9

//Useage:

//if want make new conbime object array
    const newObj = [...obj.mainObj, '2']; //1 2 3 4 2

//copy array
    const mainObjcopy = [...obj.mainObj];
    //mainObjcopy = 1 2 3 4

//Join 2 arrays
    const twoObj = [...obj.mainObj, ...secondObj]; 
    //twoObj = 1 2 3 4 7 8 9 10

//Iterables: arrays, strings, maps, sets, NOT objects
    const str='Jonas';
    const letters = [...str,' ', 'S.'];
    //letters = J o n a s  S. which mean could splits
    //...str = J o n a s 
    //But couldn't using in ${...str}

//Real-world useage input from ui and output from dateset
    const indexbase = [
        prompt("Let\'s save index! index 1?"),
        prompt('Index 2?'),
        prompt('Index 3'),
    ];
    //save index
    obj.funObj(indexbase[0], indexbase[1], indexbase[2]);
    //or
    obj.funObj(...indexbase);


//Objects useage
    const newObjbase = {
        foundedin: 2000,
        ...obj,
        author: 'Cool',
    };
    //newObjbase become
    // const newObjbase = {
    //     foundedin: 2000,
    //     mainObj: [1,2,3,4],
    //     secondObj: [7,8,9,10],
    //     funObj: function(index1, index2, index3){
    //         console.log(index1,index2, index3);
    //     },
    //     author: 'Cool',
    // };
    //also when trying to change element
    const objcopy = {...obj};
    objcopy.nameobj = 'Change Name';
    //objcopy.nameobj = Change Name;
    //obj.nameobj = test reference, will keep same nothing change
