
// All functions =>


const clearCompleteTask = () => {
    if (confirm('Are you sure?')) {
        let completeTask;
        if (localStorage.getItem('completeTask') != null) {
            completeTask = []
            localStorage.setItem('completeTask', JSON.stringify(completeTask))
            getCompleteTask()
        }
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
    task_local.splice(number, 1)
    localStorage.setItem('task_local', JSON.stringify(task_local))
    taskGetStorage()

}


const createList = (val, index) => {
    let li = document.createElement('li')
    li.classList.add('list-group-item', 'my-2', 'border-0', 'border-bottom', 'task_list_li')
    li.appendChild(document.createTextNode(val))

    let btn = document.createElement('button')
    btn.classList.add('btn', 'btn-danger', 'btn-sm',)
    btn.appendChild(document.createTextNode('remove'))
    li.appendChild(btn)
    btn.addEventListener('click', () => {
        saveCompleteTaskStorage(val)
        deleteTaskStorage(index)
    })
    li.classList.add('d-flex', 'justify-content-between')
    document.getElementById('task_list').appendChild(li)
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


const filterTask = (event) => {
    let val = event.target.value.toLowerCase()
    console.log('val: '+val);
    let li = document.querySelectorAll('.task_list_li')
    li.forEach((item, index) => {
        let i = item.firstChild.textContent.toLowerCase()
        console.log('i: ' + i);
        if (i.indexOf(val) != -1) {
            item.classList.add = 'd-block'
        }
        else {
            item.remove()
        }



    })
}



// All documents =>


document.getElementById('clear_complete').addEventListener('click', clearCompleteTask)


document.getElementById('complete_all').addEventListener('click', () => {
    if (confirm('Sure?')) {
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
    }

})

document.getElementById('task_submit_btn').addEventListener('click', () => {
    let val = document.getElementById('task_input').value;
    taskSaveStorage(val)
    taskGetStorage()
    document.getElementById('task_input').value = ''

})

document.getElementById('filter_task').addEventListener('keyup', filterTask)

document.addEventListener('DOMContentLoaded', taskGetStorage)
document.addEventListener('DOMContentLoaded', getCompleteTask)
// taskGetStorage()
// getCompleteTask()
