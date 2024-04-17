Project structure (top-down)
USER
    Name
    Password
    Email
    BOARD(s)
        Title
        PROJECT(s)
            Title
            DefaultOrder (creationDate, dueDate, priority) //REALLY NEEDED?
            TODO(s)
                Title*
                Description
                Due-date
                Priority
                Notes / Checklist
                Type > content
                isDone
                creationDate

Functions
USER
    createUser / deleteUser
    changePassword forgotPassword
    changeEmail changeName
    createBoard / deleteBoard

BOARD
    changeTitle
    createProject / deleteProject / cloneProject

PROJECT
    changeTitle
    createTodo / deleteTodo
    cloneTodo
    sortTodos

TODO
    toggleIsDone
    changeTitle / Description / Due-date / Priority / Notes/Checklist