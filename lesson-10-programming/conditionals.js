const { log } = require('console');
const readline = require('readline');

const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout
});

rl.question("Pleas enter your age: ", (age) => {
    age = parseInt(age);

    rl.question("Please enter your country of residence: ", (country) => {
        
        const countriesWithMandotoryVoting = ['Brazil', 'Australia', 'Belgium'];
        const countriesWithNoVoting = ['Qatar', 'Bahrain', 'North Korea'];
        const votingAge = 18;

        if (age >= votingAge) {
            if(countriesWithMandotoryVoting.includes(country)) {
                console.log(`In ${country} it is mandatory that you vote.`);
            }else if (countriesWithNoVoting.includes(country)) {
                console.log(`In ${country} public elections are not held. `);
            }else{
                console.log(`You are eligable to vote in ${country}`);
                ;
            }
        }else{
            console.log('You are not eligable to vote');
            ;
        }

        rl.close();
    });
});