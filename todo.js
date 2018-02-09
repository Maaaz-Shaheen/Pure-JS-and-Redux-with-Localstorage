
const todoList = (state = { tasks: [] }, action) => {
    switch (action.type) {
        case "ADD":
            return {
                tasks: [...state.tasks, action.task],
            };
        case "DELETE":
            return {
                tasks: [...action.updatedArray],
            };
        case "EDIT":
            return {
                tasks: [...action.updatedArray],
            }
        case "DELETE_ALL": {
            return {
                tasks: [],
            }
        }
        case 'SET_TASKS':
            return {
                tasks: [...action.localTasks],
            };
        default:
            return state;
    }
}

var store = Redux.createStore(todoList);
const userName = prompt('Enter Username!');

const handleSetTasks = () => {
    let localTasks;
    if(JSON.parse(localStorage.getItem(userName))) {
        localTasks = JSON.parse(localStorage.getItem(userName));
    }
    else {
        localStorage.setItem(userName, JSON.stringify([]));
        localTasks = [];
    };

    store.dispatch({
        type: 'SET_TASKS',
        localTasks,
    });
};

var handleAddTask = () => {
    let userTask = document.getElementById('userInput').value;

    const localTasks = JSON.parse(localStorage.getItem(userName));
    console.log(localTasks)
    const newLocalTasks = [...localTasks, userTask];
    const jsonTasks = JSON.stringify(newLocalTasks);
    localStorage.setItem(userName, jsonTasks);

    store.dispatch({
        type: 'ADD',
        task: userTask,
    });

    document.getElementById('userInput').value = '';
};


var handleDeleteAll = () => {
    localStorage.setItem(userName, JSON.stringify([]));
    store.dispatch({
        type: 'DELETE_ALL',
    });
};


var handleDeleteTask = (id) => {
    let currentTasks = [...store.getState().tasks];
    currentTasks.splice(id, 1);
    localStorage.setItem(userName, JSON.stringify(currentTasks));
    store.dispatch({
        type: 'DELETE',
        updatedArray: [...currentTasks],
    });
};



var handleEditTask = (id) => {
    let editData = prompt("What is the change?", store.getState().tasks[id]);

    let currentTasks = [...store.getState().tasks];
    currentTasks.splice(id, 1, editData);

    localStorage.setItem(userName, JSON.stringify(currentTasks));

    store.dispatch({
        type: 'EDIT',
        updatedArray: [...currentTasks],
    });
};


function render() {

    const localStorageData = localStorage.getItem(userName);

    var userTaskList = document.getElementById("userTaskList");
    while (userTaskList.firstChild) {
        userTaskList.removeChild(userTaskList.firstChild);
    }

    let allTasks = document.createElement('UL');
    store.getState().tasks.map((data, index) => {

        let taskListItem = document.createElement('LI');
        taskListItem.id = index;

        taskListItemText = document.createTextNode(data);

        let deleteButton = document.createElement('BUTTON');
        deleteButton.appendChild(document.createTextNode('DELETE'));
        deleteButton.onclick = () => handleDeleteTask(index);

        let editButton = document.createElement('BUTTON');
        editButton.appendChild(document.createTextNode('EDIT'));
        editButton.onclick = () => handleEditTask(index);

        taskListItem.appendChild(taskListItemText);
        taskListItem.appendChild(deleteButton);
        taskListItem.appendChild(editButton);


        allTasks.appendChild(taskListItem);
    });
    userTaskList.appendChild(allTasks);
};

handleSetTasks();
render();

// store.subscribe(() => {
//     console.log(store.getState());
// });

store.subscribe(render);
