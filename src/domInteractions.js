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
    function createProject(parentBoard, parentBoardContainer, project=new Project()) { // create blank project if none passed
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project');
        projectContainer.dataset.id = project.id;

        // const projectContent = createProjectContent(project);
        // const projectHeader = createProjectHeader(project, projectContent);

        
        
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
        
        // create todo
        const createTodoBtn = document.createElement('a');
        createTodoBtn.href = '#';
        createTodoBtn.classList.add('create-todo');
        createTodoBtn.innerHTML = '<i class="fa fa-plus"></i>';
        createTodoBtn.addEventListener('click', event => {
            event.preventDefault();
            project.createTodo(); // empty todo
            const todo = todosController.createTodo(project, projectContent);
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
        
        projectHeader.querySelector('.project-actions').appendChild(createTodoBtn);
        
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
    function createTodo(parentProject, parentProjectContent, todo=new Todo()) { // create blank todo if none passed
        // DOM structure
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('todo');
        todoContainer.dataset.id = todo.id;

        const todoHeader = document.createElement('div');
        todoHeader.classList.add('todo-header');

        const todoTitle = document.createElement('input');
        todoTitle.classList.add('todo-title');
        todoTitle.placeholder = "Enter title";
        todoTitle.value = todo.title || "";

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

        const todoContent = document.createElement('textarea');
        todoContent.classList.add('todo-content');
        todoContent.placeholder = "...";
        todoContent.value = todo.description || "";

        todoHeader.appendChild(todoTitle);
        todoHeader.appendChild(deleteBtn);
        todoHeader.appendChild(cloneBtn);

        todoContainer.appendChild(todoHeader);
        todoContainer.appendChild(todoContent);

        return todoContainer
    }

    function writeTodo(todo) {}
    
    return {createTodo}
}