const deleteText = document.querySelectorAll('.del')
const editText = document.querySelectorAll('.edit')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteSpecial)
})

Array.from(editText).forEach((element)=>{
    element.addEventListener('click', populateEditForm)
})

function populateEditForm(){
    const editID = this.parentNode.childNodes[1].innerText
    console.log(editID);
}

async function deleteSpecial(){
    const specialName = this.parentNode.childNodes[3].innerText
    console.log('specialName:')
    console.log(specialName)
    try{
        const response = await fetch('deleteSpecial',{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'specialNameX': specialName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(error){
        console.log(error)
    }
}