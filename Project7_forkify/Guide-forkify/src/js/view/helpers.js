// function we want reuse
export const getJson = async function(url){
    try {
        const res = await fetch(url);
        const data = res.json();
        if(!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (error) {
        throw error;   // here using throw error to return reject promise so it could error exactly 
    }
}