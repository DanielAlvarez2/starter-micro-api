document.querySelector('button').addEventListener('click',getInfo)

async function getInfo(){
    const sushiInput = document.querySelector('input').value
    const response = await fetch(`http://daniel.cyclic.app/api/sushi/${sushiInput}`)
    const data = await response.json()
    document.querySelector('h2').innerHTML = `${data.japaneseName}<br>${data.englishName}`
    console.log(data);
}