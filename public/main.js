const deleteText = document.querySelectorAll('.del')
const deleteArchiveText = document.querySelectorAll('.delete-archive')
const editText = document.querySelectorAll('.edit')
const archiveText = document.querySelectorAll('.archive')
const unarchiveText = document.querySelectorAll('.unarchive')
const moveUpText = document.querySelectorAll('.move-up')
const moveDownText = document.querySelectorAll('.move-down')

Array.from(deleteArchiveText).forEach((element)=>{
    element.addEventListener('click',deleteArchive)
})
Array.from(moveUpText).forEach((element)=>{
    element.addEventListener('click',moveUp)
})
Array.from(moveDownText).forEach((element)=>{
    element.addEventListener('click',moveDown)
})

Array.from(archiveText).forEach((element)=>{
    element.addEventListener('click', archiveSpecial)
})

Array.from(unarchiveText).forEach((element)=>{
    element.addEventListener('click', unarchiveSpecial)
})

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteSpecial)
})

Array.from(editText).forEach((element)=>{
    element.addEventListener('click', populateEditForm)
})

async function moveUp(){
    const _id = this.parentNode.childNodes[3].innerText
    const category = this.parentNode.childNodes[5].innerText
    const sequence = this.parentNode.childNodes[7].innerText

    const response = await fetch('moveUp',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            '_id': _id,
            sequence: sequence,
            category: category
            // appetizerCount: appetizerCount,
            // entreeCount: entreeCount,
            // dessertCount: dessertCount
        })
    })
    const data = await response.json()
    location.reload()
}
async function moveDown(){
    const _id = this.parentNode.childNodes[3].innerText
    const category = this.parentNode.childNodes[5].innerText
    const sequence = this.parentNode.childNodes[7].innerText

    const response = await fetch('moveDown',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            '_id': _id,
            sequence: sequence,
            category: category
            // appetizerCount: appetizerCount,
            // entreeCount: entreeCount,
            // dessertCount:dessertCount
        })
    })
    const data = await response.json()
    location.reload()
}

function populateEditForm(){
    const editID = this.parentNode.childNodes[3].innerText
    document.querySelector('#display-ID').innerText = editID;
    document.querySelector('#edit-id').value = editID;
    document.querySelector('#edit-category').value = this.parentNode.childNodes[5].innerText;
    document.querySelector('#edit-sequence').value = this.parentNode.childNodes[7].innerText;
    document.querySelector('#edit-name').value = this.parentNode.childNodes[9].innerText;
    document.querySelector('#edit-description').value = this.parentNode.childNodes[11].innerText;
    document.querySelector('#edit-price').value = this.parentNode.childNodes[13].innerText;
    document.querySelector('#edit-allergies').value = this.parentNode.childNodes[15].innerText;
}

async function archiveSpecial(){
    // alert('archive()')
    const _id = this.parentNode.childNodes[3].innerText
    const category = this.parentNode.childNodes[5].innerText
    const sequence = this.parentNode.childNodes[7].innerText
    try{
        const response = await fetch('archiveSpecial',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                '_id': _id,
                sequence: sequence,
                category: category
                // appetizerCount: appetizerCount,
                // entreeCount: entreeCount,
                // dessertCount: dessertCount
            })
        })
        const data = await response.json()
        location.reload()
    }catch(error){
        // console.log(error)
    }
}

async function unarchiveSpecial(){
    const _id = this.parentNode.childNodes[1].innerText
    const category = this.parentNode.childNodes[3].innerText
    // let count;
    // if (this.parentNode.childNodes[3].innerText == "SPECIALS: Appetizer"){count=appetizerCount}
    // if (this.parentNode.childNodes[3].innerText == "SPECIALS: Entrée"){count=entreeCount}
    // if (this.parentNode.childNodes[3].innerText == "SPECIALS: Dessert"){count=dessertCount}
    // count++
    // count = new String(count)

    try{
        const response = await fetch('unarchiveSpecial',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                '_id': _id,
                category: category
                // 'sequence': new String(`${count+1}`)
                // sequence: count
            })
        })
        const data = await response.json()
        console.log(data);
        location.reload()
    }catch(error){
        // console.log(error)
    }
}
async function deleteSpecial(){
    const _id = this.parentNode.childNodes[3].innerText
    const category = this.parentNode.childNodes[5].innerText
    const sequence = this.parentNode.childNodes[7].innerText
    try{
        const response = await fetch('deleteSpecial',{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                '_id': _id,
                category: category,
                sequence: sequence
                // appetizerCount: appetizerCount,
                // entreeCount: entreeCount,
                // dessertCount: dessertCount
            })
        })
        const data = await response.json()
        // setTimeout(()=>{location.reload()},250)
        location.reload() 
    }catch(error){
        console.log(error)
    }
}
async function deleteArchive(){
    console.log('1'+this.parentNode.childNodes[1].innerText);
    console.log('2'+this.parentNode.childNodes[2].innerText);
    console.log('3'+this.parentNode.childNodes[3].innerText);
    console.log('4'+this.parentNode.childNodes[4].innerText);
    console.log('5'+this.parentNode.childNodes[5].innerText);
    const _id = this.parentNode.childNodes[1].innerText

    const response = await fetch('deleteArchive',{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            '_id': _id
        })
    })
    const data = await response.json()
    location.reload()
}
