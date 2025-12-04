import { TIMEOUT_SEC } from "../config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function(url, uploadData = undefined){
    try{
        // combine getJson and sendJson function
        const fetchGetORSend = uploadData ? fetch(url, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(uploadData)
        }) : fetch(url);
        
        const res = await Promise.race([fetchGetORSend, timeout(TIMEOUT_SEC)]);
        const data = res.json();
        if(!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (error) {
        throw error;   // here using throw error to return reject promise so it could error exactly 
    }
  }

// // function we want reuse
// export const getJson = async function(url){
//     try {
//         const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//         const data = res.json();
//         if(!res.ok) throw new Error(`${data.message} (${res.status})`);
//         return data;
//     } catch (error) {
//         throw error;   // here using throw error to return reject promise so it could error exactly 
//     }
// }

// // function we want reuse
// export const sendJson = async function(url, uploadData){
//     try {
//       // method: POST, means we want send data to server
//       // headers: to tell server we send json data
//       // body: the data we want send, need convert to json string using JSON.stringify()
//         const fetchPost = fetch(url, {
//           method: 'POST',
//           headers:{
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(uploadData)
//         })
//         const res = await Promise.race([fetchPost, timeout(TIMEOUT_SEC)]);
//         const data = res.json();
//         if(!res.ok) throw new Error(`${data.message} (${res.status})`);
//         return data;
//     } catch (error) {
//         throw error;   // here using throw error to return reject promise so it could error exactly 
//     }
// }