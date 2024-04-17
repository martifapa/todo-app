import Project from './src/project.js'
import Todo from './src/todo.js'


const todo1 = new Todo('title1', 'description1', new Date('2024-04-15'), 1, 'test', '', false);
const todo2 = new Todo('title2', 'description2', new Date('2024-04-17'), 2, 'test', '', false);
const todo3 = new Todo('title3', 'description3', new Date('2024-04-16'), 3, 'test', '', false);
const todo4 = new Todo('title3', 'description3', new Date('2024-04-16'), 3, 'test', '', false);


const project = new Project('test', 'creationDate', 'ascending', [todo1, todo2, todo3]);

console.log(project)

project.cloneTodo(
    new Todo('title3', 'description3', new Date('2024-04-16'), 
    3, 'test', '', false)
)

console.log(project)