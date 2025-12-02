const obj = {
    main: ['Mi','MO','ME','Mw','MN'],
    second: ['MJ','MG','MK','MB','MS'],
};
const allobj = [...obj.main, ...obj.second];

for ( const index of allobj) console.log(index);

for(const index of allobj.entries()){
    console.log(index);
    console.log(`${index[0]+1}: ${index[1]}`);
}
// Indexs:
//  Array [0, "Mi"]
//   0: 0
//   1: "Mi"
//   length: 2
//  .....
// entries() could defined the index, content, length

//More better way: destructure at loop index -> [i, el]
for(const [i, el] of allobj.entries()){
    console.log(i,el);
    console.log(`${i+1}: ${el}`);
}