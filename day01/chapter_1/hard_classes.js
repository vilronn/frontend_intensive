

/* В продолжение прошлого задания вам нужно нужно создать 5 новых классов:

**Company** - класс описывающий IT компанию. Состоит из:
1. Св-ва:
- companyName
- currentProjects - текущий пулл проектов. Массив экземпляров класса Project
- completedProjects - пулл завершенных проектов. Массив экземпляров класса Project
- staff - весь пулл сотрудников компании. Это объект, у которого есть поля Developers, Managers. В этих полях лежат массивы экземпляров аналогичных классов.
2. Методы:
- addNewCompanyMember() - позволяет нанять нового сотрудника. В результате метода у выбранного сотрудника
должно смениться имя компании.
- addProject() - позволяет добавить проект в пулл текущих.
- getMembersQuantity() - позволяет получить кол-во сотрудников, работающих в данной комании
- completeProject(project) - позволяет закончить проект. В результате выполнения функции проект из currentProjects перемещается в completedProjects. У команды данного проекта должно увеличиться кол-во завершенных проектов.

**Project** - класс описывающий проект компании. На проекте может быть только 1 менеджер! Каждый сотрудник может работать только над одним проектом! Состоит из:
1. Св-ва:
- Project Name
- minQualification - минимальная квалификация сотрудника, для работы на данном проекте.
- Team - команда проекта. Объект, типа {manager: Manager, developers: {Frontend : [], backend: []}}. В св-ва этого объекта указан массив аналогичных классов.

2. Методы:
- addNewProjectMember(member) - Метод внутри которого вызывается проверка менеджера на то, подходит ли сотрудник проекту. Если подходит, то команда расширяется, иначе нет.


**Backend Developer** - Класс, который наследуется от класса Employee. 
1.Имеет новые св-ва:
- stack - Массив в котором указаны технологии, которыми владеет разработчик.
- developerSide - 'backend'
- projectQuantity - Число завершенных проектов.
2. Методы:
- expandStack(someTech) - разработчик может увеличить стек технологий.

**Frontend Developer** - Класс, который наследуется от класса Employee.
1.Имеет новые св-ва:
- stack - Массив в котором указаны технологии, которыми владеет разработчик.
- developerSide - 'frontend'
- projectQuantity - Число завершенных проектов.
- projectQuantity - Число завершенных проектов.
2. Методы:
- expandStack(someTech) - разработчик может увеличить стек технологий.

**Manager** - Класс, который наследуется от класса Employee. 
1.Имеет новые св-ва:
- projectQuantity - Число завершенных проектов.
2. Методы:
- checkMember(minQualification, member) - менеджер проверяет, удовлетворяет ли сотрудник условиям проекта. Сотрудник, состоящий в другой компании не может работать над проектом другой компании.

*/

import { Employee } from "./classes.js";

/* Св-ва и методы класса
companyName - string
currentProjects - Массив экземпляров класса Project
completedProjects -  Массив экземпляров класса Project
staff - {
    developers :  {
    frontend : массив содержащий экземпляры класса FrontendDeveloper
    backend : массив содержащий экземпляры класса DackendDeveloper
    },
    managers: массив содержащий экземпляры класса Manager
}

addNewCompanyMember(Developer/Manager) - в кач-ве аргумента принимает экземляр класса FrontendDeveloper, Backend Developer или Manager
addProject(Project) - в кач-ве аргумента принимает экземляр класса Project
getMembersQuantity()
*/
export class Company {
    staff = {developers: {frontend: [], backend: []}, managers: []}
    companyName;
    currentProjects = {Project: []};
    completedProjects = {Project: []};
    constructor (companyName = '', currentProjects = [], completedProjects = []) {
                        this.currentProjects = currentProjects;
                        this.completedProjects = completedProjects;
                        this.companyName = companyName;
                    }
    
    addNewCompanyMember(newEmployee) {
        if (newEmployee instanceof FrontendDeveloper) {
            this.staff.developers.frontend.push(newEmployee);
            newEmployee.changeCompany(this.companyName);
        } else if (newEmployee instanceof BackendDeveloper) {
            this.staff.developers.backend.push(newEmployee);
            newEmployee.changeCompany(this.companyName);
        } else if (newEmployee instanceof Manager) {
        this.staff.managers.push(newEmployee);
        newEmployee.changeCompany(this.companyName);
        } else {
            console.log(newEmployee + ' is not en employer. I\'m so sorry');
        }
    }

    addProject(project){
        if (project instanceof Project) {
        this.currentProjects.push(project);
        } else {
            console.log(project + ' is not a project');
        }
    }    

    getMembersQuantity(){
        const membersQuantity = this.staff.developers.frontend.length + this.staff.developers.backend.length + this.staff.managers.length;
        return membersQuantity;
    }

    completeProject(project){
        this.currentProjects = this.currentProjects.filter(item => item.projectName != project.projectName);
        this.completedProjects.push(project);        
    }
}


 /*
- projectName - string
- minQualification -string
- Team -  {
    manager : экземпляр класса Manager
    developers: {
    frontend : массив содержащий экземпляры класса FrontendDeveloper
    backend : массив содержащий экземпляры класса DackendDeveloper
    }
}
completeProject()
addNewProjectMember(Developer) - Метод внутри которого вызывается проверка менеджера на то, подходит ли сотрудник проекту. Если подходит, то команда расширяется, иначе нет.
*/

export class Project {
    team = {manager: null, developers: {frontend: [], backend: []}}
    constructor(projectName = '', minQualification = 'L1', manager){
        this.projectName = projectName;
        this.minQualification = minQualification;
        this.team.manager = manager;
    }

    addNewProjectMember(member){
        if ((member instanceof FrontendDeveloper) || (member instanceof BackendDeveloper) && (this.team.manager instanceof Manager)) {
            if (this.team.manager.checkMember(this.minQualification, member)) {
                this.team.developers[member.developerSide].push(member)
            }
        }
    }   
}

/*
projectQuantity - number
checkMember(minQualification, member) - в качестве аргумента принимается строка ('L1'/'L2'/'L3'/'L4') и BackendDeveloper || FrontendDeveloper
*/

export class Manager extends Employee {
    constructor (name = '', grade = 'L1', hardSkills = [], projectQuantity = 0) {
        super(name, grade, hardSkills)
        this.projectQuantity = projectQuantity;
    }

    checkMember(minQualification, member) {
        if ((member instanceof Employee) && (member.grade >= minQualification)) {
            return true;
        } else {
            return false;
        }
    }
}

/*
stack - массив строк
- developerSide - строка ('frontend')
- projectQuantity - number
expandStack(newTech) - в кач-ве аргумента принимает строку
*/

export class FrontendDeveloper extends Employee {
    developerSide = 'frontend';
    constructor (name = '', grade = 'L1', hardSkills = [], projectQuantity = 0) {
        super(name, grade, hardSkills);
        this.projectQuantity = projectQuantity;
    }

    expandStack(newTech) {
        this.addSkills(newTech)
    }
}

/*
stack - массив строк
- developerSide - строка ('backend')
- projectQuantity - number
expandStack(newTech) - в кач-ве аргумента принимает строку
*/

export class BackendDeveloper extends Employee {
    developerSide = 'backend';
    constructor (name = '', grade = 'L1', hardSkills = [], projectQuantity = 0) {
        super(name, grade, hardSkills);
        this.projectQuantity = projectQuantity;
    }

    expandStack(newTech) {
        this.addSkills(newTech)
    }
}

const manager1 = new Manager('Anna', 'L2', ['Excel', 'Skill2', 'Coffee']);
// console.log(manager1);
const testCompany = new Company('Google', ['Project1', 'Project2'])
// console.log(testCompany);
testCompany.addNewCompanyMember(manager1);
// console.log(testCompany);
// console.log(JSON.stringify(testCompany, null, 2))
const frontend1 = new FrontendDeveloper('Maria', 'L3', ['Javascript'], 4);
const frontend2 = new FrontendDeveloper('Julia', 'L1', ['Javascript']);
// console.log(frontend1);
frontend1.expandStack('Docker');
// console.log(frontend2);
manager1.checkMember('L1', frontend1);
console.log(manager1.checkMember('L1', frontend1));
// console.log(manager1.checkMember('L4', frontend1));
// testCompany.addNewCompanyMember('Sveta');
const project15 = new Project('Frontend Bootcamp', 'L2', manager1);
project15.addNewProjectMember(frontend1);
console.log(testCompany);
// console.log('\n------------------------\n');
testCompany.addProject(project15);
console.log(testCompany);
// console.log('\n------------------------\n');
testCompany.completeProject(project15);
console.log(testCompany);

testCompany.addNewCompanyMember(frontend1);
testCompany.addNewCompanyMember(frontend2);
// console.log(project1);
// console.log(testCompany);
// console.dir(project1, {depth: null});
// console.dir(project1, {depth: null});
// console.log(JSON.stringify(project1, null, 2))
// console.log(testCompany.getMembersQuantity());