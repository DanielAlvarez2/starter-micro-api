document.querySelector('button').addEventListener('click',getSpecial)

async function getSpecial(){
    let specialItem = document.querySelector('input').value;
    const response = await fetch(`https://upload.cyclic.app/api/olea-items/${specialItem}`);
    const data = await response.json();
    console.log(data);            
}