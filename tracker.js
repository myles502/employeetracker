const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'password',
  database: 'playlistDB',
});

const queryAll = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    res.forEach(({ id, title,}) => {
      console.log(`${id} | ${title} | `);
    });
    start();
  });
};

const deletedepartment = () => {
  connection.query('SELECT * FROM department', (selectError, department) => {
    if (selectError) throw selectError;
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'id',
          message: 'Select a department to delete',
          choices: department.map((department) => ({
            value: department.id,
            name: `${department.title}`,
          })),
        },
      ])
      .then((answers) => {
        console.log(`Deleting ${answers.title}\n`);

        connection.query(
          'DELETE FROM department WHERE ?',
          [
            {
              id: answers.id,
            },
          ],
          (deleteError, deleteRes) => {
            if (deleteError) throw updateError;
            console.log(`${deleteRes.affectedRows} department deleted!\n`);
            start();
          }
        );
      });
  });
};



const createDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter a department title:',
      },
      
      
    ])
    .then((answers) => {
      console.log('Inserting a new department...\n');
      connection.query('INSERT INTO department SET ?', answers, (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} department inserted!\n`);
        start();
      });
    });
};

const quit = () => {
  connection.end();
  console.log('Good bye!');
  process.exit();
};

const start = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: [
          {
            value: 'CREATE',
            name: 'Create a department',
          },
          {
            value: 'READ',
            name: 'View departments',
          },
         
          {
            value: 'DELETE',
            name: 'Delete departments',
          },
          {
            value: 'QUIT',
            name: 'Exit',
          },
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'READ':
          queryAll();
          break;

        case 'CREATE':
          createDepartment();
          break;

        case 'DELETE':
          deletedepartment();
          break;

        default:
          quit();
          break;
      }
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

connection.connect((err) => {
  if (err) throw err;
  start();
});




