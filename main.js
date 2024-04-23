import Board from './src/board.js';
import Project from './src/project.js'
import Todo from './src/todo.js'
import BoardController, { ProjectsController } from './src/domInteractions.js'
// import { format } from './node_modules/date-fns'



const project = new Project('test', 'priority', 'descending', []);

project.createTodo('title1', 'description1', new Date('2024-04-15'), 1, 'test', '', false);
project.createTodo('title2', 'description1', new Date('2024-04-16'), 2, 'test', '', false);
project.createTodo('title3', 'description1', new Date('2024-04-17'), 3, 'test', '', true);


const board = new Board('board', 'jack', [], [project])

// board.createProject('newpro', 'dueDate', 'ascending', [])

const boardController = BoardController();
boardController.renderBoard(board);

// elements



const pc = ProjectsController();
