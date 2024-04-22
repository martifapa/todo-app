import Project from './project.js'


let clonedCounter = -2;
let idCounter = 0;

export default class Board {
    constructor(title, owner, users=[owner], projects=[]) {
        this.title = title;
        this.owner = owner;
        this.users = users;
        this.projects = projects;
        this.id = idCounter++;
    }

    setTitle(newTitle) { this.title = newTitle }

    createProject(title, orderCriteria, directionCriteria, todos=[]) {
        const newProject = new Project(...arguments)
        this.projects.push(newProject);
        return newProject
    }

    deleteProject(projectId) {
        this.projects = this.projects.filter(project => project.id != projectId);
    }

    cloneProject(projectId) {
        const selectedProject = this.projects.find(project => project.id === projectId);
        const clone = Object.assign(Object.create(Object.getPrototypeOf(selectedProject)), selectedProject);
        clone.id = clonedCounter--;
        this.projects.push(clone);
        return clone
    }

    addUser(selectedUser) {
        if (this.users.includes(selectedUser)) return
        this.users.push(selectedUser);
    }

    removeUser(selectedUser) {
        this.users = this.users.filter(user => user != selectedUser);
    }
}