
// const arr = [1, 2, 3, 4, 5]
// arr.splice(1,1)
// console.log(arr);

const clearCompleteTask = () => {
    let completeTask;
    if (localStorage.getItem('completeTask') != null) {
        completeTask = []
        localStorage.setItem('completeTask', JSON.stringify(completeTask))
        getCompleteTask()
    }
}

const createCompleteTaskList = (val) => {
    let li = document.createElement('li')
    li.classList.add('list-group-item', 'my-2', 'border-0', 'border-bottom')
    let s = document.createElement('s')
    s.appendChild(document.createTextNode(val))
    li.appendChild(s)
    document.getElementById('complete_task').appendChild(li)
}

const getCompleteTask = () => {
    document.getElementById('complete_task').innerHTML = ''
    let completeTask;
    if (localStorage.getItem('completeTask') != null) {
        completeTask = JSON.parse(localStorage.getItem('completeTask'))
        if (completeTask.length == 0) {
            let p = document.createElement('p')
            p.classList.add('text-center', 'p-3')
            p.appendChild(document.createTextNode('No task completed'))
            document.getElementById('complete_task').appendChild(p)
        }
        else {
            completeTask.forEach((value) => {
                createCompleteTaskList(value)
            })
        }
    }

}

const saveCompleteTaskStorage = value => {
    let completeTask;
    if (localStorage.getItem('completeTask') != null) {
        completeTask = JSON.parse(localStorage.getItem('completeTask'))
    }
    else {
        completeTask = []
    }
    completeTask.push(value)
    localStorage.setItem('completeTask', JSON.stringify(completeTask))
    getCompleteTask()
}


const deleteTaskStorage = number => {
    let task_local;
    task_local = JSON.parse(localStorage.getItem('task_local'))
    // console.log(task_local);
    task_local.splice(number, 1)
    console.log(task_local)
    localStorage.setItem('task_local', JSON.stringify(task_local))
    taskGetStorage()
}

document.getElementById('clear_complete').addEventListener('click', clearCompleteTask)


document.getElementById('complete_all').addEventListener('click', () => {
    let task_local;
    if (localStorage.getItem('task_local') != null) {
        task_local = JSON.parse(localStorage.getItem('task_local'))
/////////////////////////
        let completeTask;
        if (localStorage.getItem('completeTask') != null) {
            completeTask = JSON.parse(localStorage.getItem('completeTask'))
            completeTask = completeTask.concat(task_local)

            localStorage.setItem('completeTask', JSON.stringify(completeTask))
            getCompleteTask()
        }
///////////////////////
        task_local = []
        localStorage.setItem('task_local', JSON.stringify(task_local))
        taskGetStorage()
    }

})


const createList = (val, index) => {
    let li = document.createElement('li')
    li.classList.add('list-group-item', 'my-2', 'border-0', 'border-bottom')
    li.appendChild(document.createTextNode(val))

    let btn = document.createElement('button')
    btn.classList.add('btn', 'btn-danger', 'btn-sm',)
    btn.appendChild(document.createTextNode('remove'))
    li.appendChild(btn)
    btn.addEventListener('click', () => {
        saveCompleteTaskStorage(val)
        deleteTaskStorage(index)
        console.log(val, index);
    })
    li.classList.add('d-flex','justify-content-between')
    document.getElementById('task_list').appendChild(li)
    // console.log(task_array)
}


const taskGetStorage = () => {

    document.getElementById('task_list').innerHTML = ''
    let task_array = []
    if (localStorage.getItem('task_local') != null) {
        task_array = JSON.parse(localStorage.getItem('task_local'))

        if (task_array.length == 0) {
            let p = document.createElement('p')
            p.appendChild(document.createTextNode('Yee! No more task to do'))
            p.classList.add('text-center', 'p-3')
            document.getElementById('task_list').appendChild(p)
        }
        else {
            task_array.forEach((value, index) => {
                createList(value, index)
            })

        }

    }

}


document.getElementById('task_submit_btn').addEventListener('click', () => {
    let val = document.getElementById('task_input').value;
    taskSaveStorage(val)
    taskGetStorage()
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
}


taskGetStorage()
getCompleteTask()