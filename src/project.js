import Todo from './todo.js'

let clonedCounter = -2;
let idCounter = 0;

export default class Project {
    constructor (title="", orderCriteria="ascending", directionCriteria="", todos=[]) {
        this.title = title;
        this.orderCriteria = orderCriteria;
        this.directionCriteria = directionCriteria;
        this.todos = todos;
        this.id = idCounter++;
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

    getTitle() { return this.title}

    createTodo(title, description, dueDate, priority, type, content, isDone) {
        const newTodo = new Todo(title, description, dueDate, priority, type, content, isDone);
        this.todos.push(newTodo);
        return newTodo
    }

    deleteTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id != todoId);
    }

    cloneTodo(todoId) {
        const selectedTodo = this.todos.find(todo => todo.id === todoId);
        const clone = Object.assign(Object.create(Object.getPrototypeOf(selectedTodo)), selectedTodo);
        clone.id = clonedCounter--;
        this.todos.push(clone);
        return clone
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
