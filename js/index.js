

const taskGetStorage = () => {

    let task_array = []
    if (localStorage.getItem('task_local') != null) {
        task_array = JSON.parse(localStorage.getItem('task_local'))

        task_array.forEach(value => {
            let li = document.createElement('li')
            li.classList.add('list-group-item', 'my-2', 'border-0', 'border-bottom')
            li.appendChild(document.createTextNode(value))

            let btn = document.createElement('button')
            btn.classList.add('btn', 'btn-danger', 'float-end')
            btn.appendChild(document.createTextNode('remove'))

            li.appendChild(btn)
            document.getElementById('task_list').appendChild(li)
            console.log(task_array)
        })


    }

}

taskGetStorage()

document.getElementById('task_submit_btn').addEventListener('click', () => {
    let val = document.getElementById('task_input').value;
    taskSaveStorage(val)
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
    console.log(task_local);
    taskGetStorage()
}