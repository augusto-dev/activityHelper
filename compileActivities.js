const readline = require('readline');
const fs = require('fs');

let reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let YEAR;
let MONTH;

async function getYear() {
  return new Promise((resolve => {
    reader.question("Qual o ano desejado\n", function(answer) {
      YEAR = answer;
      resolve();
    });
  }))
}
async function getMonth() {
  return new Promise((resolve => {
    reader.question("Qual o mês(em dias, ex: Jan = 1...)\n", function (answer) {
      MONTH = answer;
      reader.close();
      resolve();
    });
  }))
}

getYear().then(() => {
  getMonth().then(() => {

    function getDateTime() {
      return new Date(YEAR, MONTH-1, 0, 0, 0, 0, 0);
    }

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const monthName = monthNames[getDateTime().getMonth()+1];

    const path = `./${YEAR}_${monthName}.json`;

    try {
      let content = fs.readFileSync(path, 'utf8');
      content = content.replace(/'/g, '\"');
      const activities = JSON.parse(content);

      let frontActivities = ''
      let backActivities = ''
      let mobileActivities = ''
      let generalActivities = ''

      for (const activity of Object.keys(activities)) {
        if (activities[activity].front_end.length) {
          if (frontActivities) {
            frontActivities += ', ' + activities[activity].front_end.join(', ');
          } else {
            frontActivities += activities[activity].front_end.join(', ');
          }
        }
        if (activities[activity].back_end.length) {
          if (backActivities) {
            backActivities += ', ' + activities[activity].back_end.join(', ');
          } else {
            backActivities += activities[activity].back_end.join(', ');
          }
        }
        if (activities[activity].mobile.length) {
          if (mobileActivities) {
            mobileActivities += ', ' + activities[activity].mobile.join(', ');
          } else {
            mobileActivities += activities[activity].mobile.join(', ');
          }
        }
        if (activities[activity].general.length) {
          if (generalActivities) {
            generalActivities += ', ' + activities[activity].general.join(', ');
          } else {
            generalActivities += activities[activity].general.join(', ');
          }
        }
      }
      console.log()
      console.log('Atividades do front:\n', frontActivities);
      console.log('\n')
      console.log('Atividades do back:\n', backActivities);
      console.log('\n')
      console.log('Atividades do mobile:\n', mobileActivities);
      console.log('\n')
      console.log('Atividades gerais:\n', generalActivities);
      console.log('\n')
    } catch (err) {
      console.log('Erro ao abrir o arquivo ', path, '\n', err);
    }

  });
});