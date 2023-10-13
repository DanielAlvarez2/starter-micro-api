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
    document.querySelector('#display-ID').innerText = editID;
    document.querySelector('#edit-id').value = editID;
    document.querySelector('#edit-category').value = this.parentNode.childNodes[3].innerText;
    document.querySelector('#edit-category').value = this.parentNode.childNodes[3].innerText;
    document.querySelector('#edit-name').value = this.parentNode.childNodes[5].innerText;
    document.querySelector('#edit-description').value = this.parentNode.childNodes[7].innerText;
    document.querySelector('#edit-price').value = this.parentNode.childNodes[9].innerText;
    document.querySelector('#edit-allergies').value = this.parentNode.childNodes[11].innerText;
}


async function deleteSpecial(){
    const _id = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteSpecial',{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                '_id': _id
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(error){
        console.log(error)
    }
}