const {log} = require('console');
const readline = require('readline');

const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout
});

rl.question(
    "Please enter your list of numbers seperated by space (Each list seperated by semicolon): ",
    (list) => {
        const lists = list.split(';');
        console.log(lists);

        for (let i=0; i < list.length; i++) {
            const numbers = lists[i].split(' ').map(Number);
            console.log(numbers);
            const sum = numbers.reduce((acc, num) => acc + num);
            const average = sum / numbers.length;

            console.log(`Average of List ${i+1}: ${average}`);
        }
});
