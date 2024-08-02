const localStorageName = 'to-do-list'

newTask = () => {
    let input = document.querySelector("#input-new-task")

    // validation
    if(!input.value){
        input.style.border = '1px solid red'
        alert("Digite algo para colocar na lista!")
    } else if(validateNewTask()){
        input.style.border = '1px solid red'
        alert("Essa tarefa já existe!")
    } else{
        //  increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageName)|| "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageName,JSON.stringify(values))
        input.style.border = 'none'
        showValues()
    }
    input.value = ''
    input.focus()
}

showValues = () => {
    let values = JSON.parse(localStorage.getItem(localStorageName)|| "[]")
    let list = document.querySelector("#to-do-list")
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++){
        list.innerHTML += `<li class="task"><p onclick="editTask('${values[i].name}') " title="edit">${values[i].name}</p><button id="btn-ok" onclick="removeItem('${values[i].name}')">✓</button></li>`
    }
}

removeItem = (data) => {
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index, 1)
    localStorage.setItem(localStorageName, JSON.stringify(values))
    showValues()
}

validateNewTask = () => {
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    let input = document.querySelector("#input-new-task")
    let exists = values.find(x => x.name == input.value)
    return !exists ? false : true

}

editTask = (data) => {
    showValues()
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    let index = values.findIndex(x => x.name == data)
    let textToEdit = document.querySelectorAll(".task")

    for(let i = 0; i < values.length; i++){
        if(index === i){
            textToEdit[i].innerHTML = `<input type="text" value="${textToEdit[i].firstChild.textContent}" class="newValue">
            <button class="btn-edit-done" onclick="confirmEdit('${index}')">✓</button>
            <button class="btn-edit-cancel" onclick="showValues()">X</button>`
            return
        }
    }
}

confirmEdit = (data) => {
    let newValueEdit = document.querySelector(".newValue")
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]")
    let index = data

    if(!values.find(x => x.name == newValueEdit.value)){
        for(let i = 0; i < values.length; i++){
            if (i == index){
                console.log(`${values[i]} vai virar ${newValueEdit.value}`)
                values[i].name = newValueEdit.value
                console.log(values[i])
            }
        }
    }else{
        alert("Essa tarefa já existe!")
    }
    localStorage.setItem(localStorageName, JSON.stringify(values))
    showValues()
}
showValues()