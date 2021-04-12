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
        function buildModel(day) {
            return {
                day: day,
                front_end: [],
                back_end: [],
                mobile: [],
                quality: [],
                bugs: [],
                general: []
            }
        }

        function daysInMonth () {
            return getDateTime().getDate();
        }

        function getDayName (day) {
            let date = getDateTime(day);
            return weekday[date.getUTCDay()];
        }

        function getDateTime(day) {
            return new Date(YEAR, MONTH-1, day ? day : 0, 0, 0, 0, 0);
        }

        function buildTag(monthName, day, weekday) {
            return `${YEAR}_${monthName}_dia_${day}_${weekday}`
        }

        const activities = {}
        const weekday = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sabado"];
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        const monthName = monthNames[getDateTime().getMonth()+1];

        for (let i = 1; i <= daysInMonth(); i++) {
            const dayName = getDayName(i);
            const day = getDateTime(i).getUTCDay();
            const isWeekend = day === 6 || day === 0;

            if (!isWeekend) {
                activities[buildTag(monthName, i, dayName)] = buildModel(i);
            }
        }
        try {
            const dir = `${YEAR}_${monthName}.json`;
            fs.writeFile(dir, JSON.stringify(activities, null, 4), function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("JSON saved to " + dir);
                }
            });
        } catch (err) {
            console.log(err);
        }

    })
})
