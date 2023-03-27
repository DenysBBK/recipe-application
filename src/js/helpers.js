import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };


export const AJAX = async function(url, uploadData = undefined){
  try{
    const fetchPro = uploadData ? fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadData)
    }) : fetch (url)
    
      const responce = await Promise.race([fetchPro , timeout(TIMEOUT_SEC)])     
     const data = await responce.json();
  
      if(!responce.ok) throw new Error(`${data.message} Status: ${responce.status}`);
  
      return data
      }catch(err){
  
          throw err;
          
      }
  
}
