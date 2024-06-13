/*
У экземпляра класса должны присутствовать св-ва:
-name string.
-grade string Для простоты предположим, что система грейдов будет иметь значения от L1 до L4.
-hardSkills string[].
-company string.


Так же должны иметься три метода:

-changeCompany(newCompanyName) - сотрудник может сменить компанию, либо же просто уволиться.
-upGrade() - сотрудник может повысить квалификацию.
-addSkill(newSkillName) - сотрудник может дополнить список своих скиллов.
*/


export class Employee {
    #grade = ['L1', 'L2', 'L3', 'L4'];

    constructor (name = '', grade = 'L1', hardSkills = [], company = '') {
        this.name = name;
        this.grade = grade.includes(grade) ? grade : 'no such grade';
        this.hardSkills = hardSkills;
        this.company = company;
    }

    changeCompany(newCompanyName) {
        this.company = newCompanyName;
    }

    upGrade() {
        switch(this.grade) {
            case 'L1':
                this.grade = 'L2';
                break;
            case 'L2':
                this.grade = 'L3';
                break;
            case 'L3':
                this.grade = 'L4';
                break;
            case 'L4':
                console.log('L4 is the highest level');
                break;
        }
    }

    addSkills(newSkillName) {
        this.hardSkills.push(newSkillName);
    }
}

const employer = new Employee('Rob', 'L1', ['Javascript', 'Node.js', 'HTML', 'CSS'], 'Good Company')
console.log(employer);
console.log(employer.upGrade());
console.log(employer.addSkills('React'));
console.log(employer.changeCompany('The Best Company'));
console.log(employer);
