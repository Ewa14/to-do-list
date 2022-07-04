{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
            },
        ]
        render();
    };

    const deleteTask = (deleteButtonIndex) => {
        tasks = [
            ...tasks.filter((task, taskIndex) => taskIndex !== deleteButtonIndex)
        ]
        render();
    };

    const toggleTaskDone = (doneButtonIndex) => {
        tasks = [
            ...tasks.slice(0, doneButtonIndex),
            { ...tasks[doneButtonIndex], done: !tasks[doneButtonIndex].done },
            ...tasks.slice(doneButtonIndex + 1),
        ]
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map(task => ({ ...task, done: true }))

        render();
    };

    const bindTaskButtonsEvents = () => {
        const deleteButtons = document.querySelectorAll(".js-deleteButton");

        deleteButtons.forEach((deleteButton, deleteButtonIndex) => {
            deleteButton.addEventListener("click", () => {
                deleteTask(deleteButtonIndex);
            });
        });

        const doneButtons = document.querySelectorAll(".js-doneButton");

        doneButtons.forEach((doneButton, doneButtonIndex) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(doneButtonIndex);
            });
        });
    };

    const bindSectionButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDoneButton");

        if (markAllDoneButton !== null) {
            markAllDoneButton.addEventListener("click", () => {
                markAllTasksDone();
            });
        };
    };

    const renderTasks = () => {
        let htmlTasksInput = "";

        for (const task of tasks) {
            htmlTasksInput += `
              <li class="tasks__item">
                <button class="tasks__button js-doneButton">
                  ${task.done ? "✔" : ""}
                </button>
                <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
                  ${task.content}
                </span>
                <button class="tasks__button tasks__button--delete js-deleteButton">
                  🗑
                </button>
              </li>
            `
        }

        document.querySelector(".js-tasks").innerHTML = htmlTasksInput;
    };

    const renderButtons = () => {
        let htmlButtonsInput = "";

        if (tasks.length !== 0) {
            htmlButtonsInput += `
              <button class="section__button js-hideDoneButton">
                Ukryj ukończone
              </button>
              <button class="section__button js-markAllDoneButton" ${tasks.every(({done}) => done === true) ? "disabled" : ""}>
                Ukończ wszystkie
              </button>
            `
        }
        else htmlButtonsInput = "";

        document.querySelector(".js-buttonsContainer").innerHTML = htmlButtonsInput;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindTaskButtonsEvents();
        bindSectionButtonsEvents();
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