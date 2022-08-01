
document.getElementById('clear_task').addEventListener('click', () => {
    let task_local;
    if (localStorage.getItem('task_local') != null) {
        task_local = []
        localStorage.setItem('task_local', JSON.stringify(task_local))
        taskGetStorage()
    }
})


// const clearStorage = () => {
    
// }

const createList = val => {
    let li = document.createElement('li')
    li.classList.add('list-group-item', 'my-2', 'border-0', 'border-bottom')
    li.appendChild(document.createTextNode(val))

    let btn = document.createElement('button')
    btn.classList.add('btn', 'btn-danger', 'float-end', 'btn-sm')
    btn.appendChild(document.createTextNode('remove'))

    li.appendChild(btn)
    document.getElementById('task_list').appendChild(li)
    // console.log(task_array)
}


const taskGetStorage = () => {

    let task_array = []
    if (localStorage.getItem('task_local') != null) {
        task_array = JSON.parse(localStorage.getItem('task_local'))

        if(task_array.length == 0){
            document.getElementById('task_list').innerHTML = ''
        }
        else{
            task_array.forEach(value => {
            createList(value)
        })

        }

        
    }

}




document.getElementById('task_submit_btn').addEventListener('click', () => {
    let val = document.getElementById('task_input').value;
    taskSaveStorage(val)
////////////////////
    createList(val)
///////////////////////////

    document.getElementById('task_input').value = ''

})



const taskSaveStorage = value => {

    let task_local;
    if (localStorage.getItem('task_local') != null) {
        task_local = JSON.parse(localStorage.getItem('task_local'))
    }
    else {
        task_local = []
    }
    task_local.push(value)
    localStorage.setItem('task_local', JSON.stringify(task_local))
    // console.log(task_local);
}


taskGetStorage()