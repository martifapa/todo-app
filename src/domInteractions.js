import Todo from './todo.js'
import Project from './project.js'
import Board from './board.js'


export default function BoardController(board=new Board()) {
    const projectsController = ProjectsController();

    function renderBoard(board) {
        const boardWrapper = document.createElement('div');
        boardWrapper.classList.add('wrapper');

        const boardHeader = createBoardHeader(board);
        const boardMain = createBoardMain(board);

        boardWrapper.appendChild(boardHeader);
        boardWrapper.appendChild(boardMain);

        const body = document.querySelector('body');
        body.appendChild(boardWrapper);
    }

    function createBoardHeader(board) {
        const boardHeader = document.createElement('header');
        const boardUsers = document.createElement('div');
        const boardActions = document.createElement('div');

        boardHeader.appendChild(boardUsers);
        boardHeader.appendChild(boardActions);

        return boardHeader
    }

    function createBoardMain(board) {
        const boardMain = document.createElement('main');
        board.projects.map(project => boardMain.appendChild(projectsController.createProject(project)));

        return boardMain
    }

    return {renderBoard}
}

export function ProjectsController() {
    const todosController = TodosController();
    
    // public
    function createProject(project=new Project()) { // create blank project if none passed
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project');
        projectContainer.dataset.id = project.id;

        const projectContent = createProjectContent(project);
        const projectHeader = createProjectHeader(project, projectContent);

        projectContainer.appendChild(projectHeader);
        projectContainer.appendChild(projectContent);

        return projectContainer
    }

    function collapseProject(project) {}



    // private
    function createProjectHeader(project, projectContent) {
        const projectHeader = document.createElement('div');
        projectHeader.classList.add('project-header');

        const headerHTML = `<h3>${project.title}</h3>
        <div class="project-actions">
            <!-- <i class="fa fa-ellipsis-v"></i> -->
                <!-- <i class="fa fa-ban"></i> -->
                <!-- <a href="#" class="delete-project"><i class="fa fa-close"></i></a> -->
            <i class="fa fa-clone"></i>
            <i class="fa fa-caret-square-o-left"></i>
            <!-- <i class="fa fa-caret-square-o-right"></i> -->
        </div>`;

        projectHeader.innerHTML = headerHTML;

        const createTodoBtn = document.createElement('a');
        createTodoBtn.href = '#';
        createTodoBtn.classList.add('create-todo');
        createTodoBtn.innerHTML = '<i class="fa fa-plus"></i>';

        createTodoBtn.addEventListener('click', event => {
            event.preventDefault();
            project.createTodo(); // empty todo
            const todo = todosController.createTodo();
            projectContent.appendChild(todo);
        })

        projectHeader.querySelector('.project-actions').appendChild(createTodoBtn);

        return projectHeader
    }

    function createProjectContent(project) {
        const projectContent = document.createElement('div');
        projectContent.classList.add('project-content');
        project.todos.map(todo => projectContent.appendChild(todosController.createTodo(todo)));

        return projectContent
    }

    return {createProject, collapseProject}
}

function TodosController() {
    function createTodo(todo=new Todo()) { // create blank todo if none passed
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('todo');
        todoContainer.dataset.id = todo.id;

        const todoTitle = document.createElement('div');
        todoTitle.classList.add('todo-title');
        todoTitle.textContent = todo.title;

        const todoContent = document.createElement('div');
        todoContent.classList.add('todo-content');
        todoContent.textContent = todo.description;

        const deleteBtn = document.createElement('a');
        deleteBtn.href = '#';
        deleteBtn.classList.add('delete-todo');
        deleteBtn.innerHTML = '<i class="fa fa-close"></i>';
        
        deleteBtn.addEventListener('click', event => {
            event.preventDefault();
            const todoId = todoContainer.dataset.id;
            todoContainer.remove();
        })

        todoContent.appendChild(deleteBtn);

        todoContainer.appendChild(todoTitle);
        todoContainer.appendChild(todoContent);

        return todoContainer
    }

    function writeTodo(todo) {}
    
    return {createTodo}
}