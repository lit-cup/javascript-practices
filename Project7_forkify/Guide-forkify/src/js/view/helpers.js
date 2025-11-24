import { TIMEOUT_SEC } from "../config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// function we want reuse
export const getJson = async function(url){
    try {

        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = res.json();
        if(!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (error) {
        throw error;   // here using throw error to return reject promise so it could error exactly 
    }
}