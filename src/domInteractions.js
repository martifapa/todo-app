import Todo from './todo.js'
import Project from './project.js'
import Board from './board.js'


export default function BoardController(board=new Board()) {
    const projectsController = ProjectsController();

    function renderBoard(board) {
        const boardWrapper = document.createElement('div');
        boardWrapper.classList.add('wrapper');

        
        const body = document.querySelector('body');
        body.appendChild(boardWrapper);
        
        const boardHeader = document.createElement('header');
        const boardUsers = document.createElement('div');
        const boardActions = document.createElement('div');
        
        boardHeader.appendChild(boardUsers);
        boardHeader.appendChild(boardActions);
        
        const boardMain = document.createElement('main');
        board.projects.map(project => boardMain.appendChild(projectsController.createProject(board, boardWrapper, project)));
        
        boardWrapper.appendChild(boardHeader);
        boardWrapper.appendChild(boardMain);
    }

    return {renderBoard}
}

export function ProjectsController() {
    const todosController = TodosController();
    
    // public
    function createProject(parentBoard, parentBoardContainer, project=false) {
        // Add project to backend if none passed
        if (!project) {let project = parentBoard.createProject()}
        // Project skeleton
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project');
        projectContainer.dataset.id = project.id;
        
        const projectHeader = document.createElement('div');
        projectHeader.classList.add('project-header');
        
        const headerHTML = `<h3>${project.title}</h3>
        <div class="project-actions">
            <!-- <i class="fa fa-ellipsis-v"></i> -->
            <!-- <i class="fa fa-ban"></i> -->
            <!-- <a href="#" class="delete-project"><i class="fa fa-close"></i></a> -->
            <i class="fa fa-caret-square-o-left"></i>
            <!-- <i class="fa fa-caret-square-o-right"></i> -->
        </div>`;
        
        projectHeader.innerHTML = headerHTML;
        
        // create todo
        const createTodoBtn = document.createElement('a');
        createTodoBtn.href = '#';
        createTodoBtn.classList.add('create-todo');
        createTodoBtn.innerHTML = '<i class="fa fa-plus"></i>';
        createTodoBtn.addEventListener('click', event => {
            event.preventDefault();
            const todo = todosController.createTodo(project, projectContainer);
            projectContent.appendChild(todo);
        })

        // delete project
        const deleteProjectBtn = document.createElement('a');
        deleteProjectBtn.href = '#';
        deleteProjectBtn.classList.add('delete-project');
        deleteProjectBtn.innerHTML = '<i class="fa fa-close"></i>';
        deleteProjectBtn.addEventListener('click', event => {
            event.preventDefault();
            parentBoard.deleteProject(project.id);
            projectContainer.remove();
        })
        
        // clone project
        const cloneProjectBtn = document.createElement('a');
        cloneProjectBtn.href = '#';
        cloneProjectBtn.classList.add('clone-project');
        cloneProjectBtn.innerHTML = '<i class="fa fa-clone"></i>';
        cloneProjectBtn.addEventListener('click', event => {
            event.preventDefault();
            const projectId = parseInt(event.target.closest('.project').dataset.id);
            const clone = parentBoard.cloneProject(projectId);
            const clonedNode = createProject(parentBoard, parentBoardContainer, project);
            projectContainer.parentNode.insertBefore(clonedNode, projectContainer.nextSibling);
        })

        projectHeader.querySelector('.project-actions').appendChild(createTodoBtn);
        projectHeader.querySelector('.project-actions').appendChild(deleteProjectBtn);
        projectHeader.querySelector('.project-actions').appendChild(cloneProjectBtn);

        const projectContent = document.createElement('div');
        projectContent.classList.add('project-content');
        project.todos.map(todo => projectContent.appendChild(todosController.createTodo(project, projectContent, todo)));
        
        projectContainer.appendChild(projectHeader);
        projectContainer.appendChild(projectContent);
        
        return projectContainer
    }

    function collapseProject(project) {}
    
    return {createProject, collapseProject}
}

function TodosController() {
    function createTodo(parentProject, parentProjectContent, todo=false) {
        // Add todo to parent library (backend)
        if (!todo) {todo = parentProject.createTodo()}
        
        // TODO skeleton
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('todo');
        todoContainer.dataset.id = todo.id;

        const todoHeader = document.createElement('div');
        todoHeader.classList.add('todo-header');

        // TODO elements
        const todoTitle = document.createElement('input');
        todoTitle.classList.add('todo-title');
        todoTitle.placeholder = "Enter title";
        todoTitle.value = todo.title || "";

        // const todoDueDate = document.createElement('p');
        // todoDueDate.textContent = todo.dueDate;
        // const todoPriority = document.createElement('p');
        // todoPriority.textContent = todo.priority;
        // const todoIsDone = document.createElement('p');

        const todoContent = document.createElement('textarea');
        todoContent.classList.add('todo-content');
        todoContent.placeholder = "...";
        todoContent.value = todo.description || "";

        // TODO buttons
        // delete todo
        const deleteBtn = document.createElement('a');
        deleteBtn.href = '#';
        deleteBtn.classList.add('delete-todo');
        deleteBtn.innerHTML = '<i class="fa fa-close"></i>';
        deleteBtn.addEventListener('click', event => {
            event.preventDefault();
            parentProject.deleteTodo(todo.id);
            todoContainer.remove();
        })

        // clone todo
        const cloneBtn = document.createElement('a');
        cloneBtn.href = '#';
        cloneBtn.classList.add('clone-todo');
        cloneBtn.innerHTML = '<i class="fa fa-clone"></i>';
        cloneBtn.addEventListener('click', event => {
            event.preventDefault();
            const clonedTodoId = parseInt(event.target.closest('.todo').dataset.id);
            const clonedTodo = parentProject.cloneTodo(clonedTodoId);
            const clonedNode = createTodo(parentProject, parentProjectContent, clonedTodo);
            todoContainer.parentNode.insertBefore(clonedNode, todoContainer.nextSibling);
        })

        // TODO appendChilds
        todoHeader.appendChild(todoTitle);
        todoHeader.appendChild(deleteBtn);
        todoHeader.appendChild(cloneBtn);
        // todoHeader.appendChild(todoDueDate);
        // todoHeader.appendChild(todoPriority);

        todoContainer.appendChild(todoHeader);
        todoContainer.appendChild(todoContent);

        return todoContainer
    }

    function writeTodo(todo) {

    }
    
    return {createTodo}
}