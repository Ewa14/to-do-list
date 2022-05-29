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

        const checkedButtons = document.querySelectorAll(".js-checkedButton");

        checkedButtons.forEach((checkedButton, index) => {
            checkedButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlInput = "";

        for (const zadanie of tasks) {
            htmlInput += `
            <li class="tasks__item ${zadanie.done ? "tasks__item--done" : ""}" >
            <button class="checkedButton js-checkedButton">Done</button>
            ${zadanie.content}
            <button class="deleteButton js-deleteButton">Usuń</button>

            </li>
            `
        }

        document.querySelector(".js-tasks").innerHTML = htmlInput;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
};



