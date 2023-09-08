document.querySelector('button').addEventListener('click',getSpecial)

async function getSpecial(){
    let specialItem = document.querySelector('input').value;
    const response = await fetch(`https://upload.cyclic.app/api/olea-items/${specialItem}`);
    const data = await response.json();
    console.log(data);        
    document.querySelector('h2').innerHTML = 
    `${data.category}<br><br>
    ${data.name}<br><br>
    ${data.description}<br><br>
    ${data.price}<br><br>
    ${data.allergies}<br>
    `;    
}