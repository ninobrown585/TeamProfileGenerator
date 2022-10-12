const inquirer = require('inquirer');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const writeToFile = require('./src/writeToFile.js');
const generateMarkup = require('./src/GenerateMarkup.js');

const staffArray = {
    'manager': [], 
    'engineer': [],
    'intern': []
};


const ManagerQuestions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please Enter The Team Manager\'s Name'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please Enter The Team Manager\'s Employee ID'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please Enter The Team Manager\'s Email Address'
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Please Enter The Team Manager\'s Office Number'
        }])
        
        .then(({name, id, email, officeNumber}) => {
            staffArray.manager.push(new Manager(name, id, email, officeNumber))
            EmployeeQuestions();
        })
  };

  
const EmployeeQuestions = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message:'What type of employee would you like to add or are you finished?',
            choices: ['Engineer', 'Intern', 'I am done building my team']
        }])
        
        .then(({choice}) => {
            if(choice === 'Engineer')
            {
                return inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Please Enter The Engineer\'s Name'
                },
                {
                    type: 'input',
                    name: 'id',
                    message: 'Please Enter The Engineer\'s Employee ID'
                },
                {
                    type: 'input',
                    name: 'email',
                    message: 'Please Enter The Engineer\'s Email Address'
                },    
                {
                    type: 'input',
                    name: 'github',
                    message: 'What is the Engineer\'s Github username?'
                }
            ])

            
            .then(({name, id, email, github}) => {
                    staffArray.engineer.push(new Engineer(name, id, email, github))

                    return EmployeeQuestions();
                })
            }

            
            else if(choice === 'Intern')
            {
                return inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Please Enter The Intern\'s Name'
                },
                {
                    type: 'input',
                    name: 'id',
                    message: 'Please Enter The Intern\'s Employee ID'
                },
                {
                    type: 'input',
                    name: 'email',
                    message: 'Please Enter The Intern\'s Email Address'
                },    
                {
                    type: 'input',
                    name: 'school',
                    message: 'Please enter Intern\'s school name'
                }
            ])
            
            .then(({name, id, email, school}) => {
                    staffArray.intern.push(new Intern(name, id, email, school))

                    return EmployeeQuestions();
                })            
            }
            else  
            {
                writeData();
            }
        })
};

    const writeData = () => {
        const data = generateMarkup(staffArray); 
        writeToFile('./dist/index.html', data);
    }

  
  const init = async () => {
    console.log('Welcome To The Team Profile Generator!');
    try {
        ManagerQuestions(); 
    } catch (err) {
      console.log(err);
      console.log('There was an error with user input');
    }
  };
  
 
  init();