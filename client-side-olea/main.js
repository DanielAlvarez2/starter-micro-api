document.querySelector('button').addEventListener('click',getSpecial)

async function getSpecial(){
        const response = await fetch('http://localhost:3000/api/olea');
        const data = await response.json();
        console.log(data);            
}