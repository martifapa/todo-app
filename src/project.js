import Todo from './todo.js'

export default class Project {
    constructor (title, orderCriteria, directionCriteria, todos=[]) {
        this.title = title;
        this.orderCriteria = orderCriteria;
        this.directionCriteria = directionCriteria;
        this.todos = todos;
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

    getTitle() { return this.title}

    createTodo(title, description, dueDate, priority, type, content, isDone) {
        this.todos.push(new Todo(title, description, dueDate, priority, type, content, isDone));
    }

    deleteTodo() {
        const selectedTodo = {}; // FIX
        this.todos = this.todos.filter(todo => todo != selectedTodo);
    }

    cloneTodo() {
        const selectedTodo = {}; // FIX
        const clone = Object.assign(Object.create(Object.getPrototypeOf(selectedTodo)), selectedTodo);
        this.todos.push(clone)
    }

    sortTodos(property, direction) {
        let result;
        if (direction === 'ascending') {
            return this.todos.sort((o1,o2) => {
                return o1[property]-o2[property] ? 1 : o2[property]-o1[property] ? -1 : 0;
              });
        } else {
            return this.todos.sort((o1,o2) => {
                return o1[property]-o2[property] ? -1 : o2[property]-o1[property] ? 1 : 0;
              });
        }
    }
}
