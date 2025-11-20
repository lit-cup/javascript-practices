import addSongToList, { list } from '../musicList.js';
addSongToList('New Song', 10);
addSongToList('Another Song', 7);
addSongToList('Third Song', 3);
console.log(list);


// top-level-await
const getlastPost = async () =>{
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    return {title: data.at(-1).title, text: data.at(-1).body};
}
getlastPost() // Promise{....} async function always returns a promise

// so we can use await to get the resolved value
const lastPost = await getlastPost();
console.log(lastPost); // {title: '...', text: '...'}

