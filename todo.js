const taskInput = document.getElementById('taskInput')
const addTaskBtn = document.getElementById('addTaskBtn')
const taskList = document.getElementById('taskList')
let taskId = 0

function addTask(){

    const taskText = taskInput.value.trim()
    if(taskText === "") return

    taskId++

    const li = document.createElement('li')
    li.id = `task-${taskId}`

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = `checkbox-${taskId}`

//  checkbox tick/untick
    checkbox.addEventListener('change', () => {
    li.classList.toggle('completed')
})

// connected label from htmlfor to checkbox
    const label = document.createElement('label')
    label.textContent = taskText
    label.htmlFor = `checkbox-${taskId}`


    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'

// remove (li)child from parent
    deleteBtn.addEventListener('click', ()=>{
        taskList.removeChild(li)
    })
// adding in taskList(li)

    li.appendChild(checkbox)
    li.appendChild(label)
    li.appendChild(deleteBtn)

    taskList.appendChild(li)

    taskInput.value = ""
    taskInput.focus()
}

addTaskBtn.addEventListener('click', addTask)

// press enter to add a task
taskInput.addEventListener('keypress',(e)=>{
    if(e.key === "Enter") addTask()
})