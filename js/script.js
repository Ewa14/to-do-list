{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push(
            {
                content: newTaskContent,
                done: false,
            });
        render();
    };

    const deleteTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    };

    const bindEvents = () => {
        const deleteButtons = document.querySelectorAll(".js-deleteButton");

        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                deleteTask(index);
            });
        });

        const doneButtons = document.querySelectorAll(".js-doneButton");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlInput = "";

        for (const task of tasks) {
            htmlInput += `
            <li class="tasks__item">
            <button class="tasks__button ${task.done ? "tasks__button--done " : ""}js-doneButton">${task.done ? "✔" : ""}</button>
            <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">${task.content}</span>
            <button class="tasks__button tasks__button--delete js-deleteButton">\🗑</button>
            </li>
            `
        }

        document.querySelector(".js-tasks").innerHTML = htmlInput;

        bindEvents();
    };

    const clearForm = () => {
        const formInput = document.querySelector(".js-newTask");
        formInput.value = "";

        formInput.focus();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }
        
        addNewTask(newTaskContent);

        clearForm();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
};



