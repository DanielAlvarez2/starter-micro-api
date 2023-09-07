document.querySelector('button').addEventListener('click',getSpecial)

async function getSpecial(){
        const response = await fetch('https://daniel.cyclic.app/api/olea');
        const data = await response.json();
        console.log(data);            
}