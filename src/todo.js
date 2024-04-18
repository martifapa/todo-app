let todoCounter = 0;

export default class Todo {
    constructor (title, description, dueDate, priority, type, content, isDone) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.creationDate = new Date();
        this.priority = priority;
        this.type = type;
        this.content = content;
        this.isDone = isDone;
        this.id = todoCounter++;
    }

    toggleIsDone() {
        this.isDone = !this.isDone;
        return this.isDone
    }

    setProperty(property, propValue) {
        this[property] = propValue;
    }

    [Symbol.iterator]() {
        
    }
}
