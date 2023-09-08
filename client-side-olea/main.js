document.querySelector('button').addEventListener('click',getSpecial)

async function getSpecial(){
        const response = await fetch('https://upload.cyclic.app/api/olea');
        const data = await response.json();
        console.log(data);            
}