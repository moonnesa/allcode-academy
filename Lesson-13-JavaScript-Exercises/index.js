//Solve for Palindrome

//define given string

let givenString = "moonis";

//reverse the given string
let letters = givenString.split("");
count = 1
reversedString = "";
for  (let letter of letters){
    reversedString += letters[letters.length - count];
    count++;
}
console.log(reversedString);
//check if the reversed string is equal to the given string
if (reversedString === givenString) {
    console.log(true);
}else {
    console.log(false);
}

//Find the Closest value to 100 from two numerical valuses

//define and set array of two numbers
let numsArray = [20, 100];

//define array of difference between the numbers and 100
let differencesArray = [];
//loop over the numbers array and check if the number is > than 100 or < than 100
for (const num of numsArray){
    //if the value is > than 100:
    if (num > 100) {
        //take the number -100
        differencesArray.push(num - 100);
    }//else
    else if (num < 100) {
        // take the 100 - number
        differencesArray.push(100-num); 
    }else {
        differencesArray.push(0);
    }
// take that difference, and add it to the difference array    
}

if (differencesArray[0] > differencesArray[1]) {
    console.log("The Second number is closer to 100");
}else if (differencesArray[1] > differencesArray[0]) {
    console.log("The First number is closer to 100");
}else {
    console.log("They are both as close!")
}


// Write a JS program to campitalize the first letter of each word in a given string.

const stringToCapitalize = "we love java";

const words = stringToCapitalize.split(" ");

let capitalizedWords = [];

for (const word of words) {
    let restOfWord = word.substring(1);
    let capitalizedFirstLetter = word[0].toUpperCase();
    capitalizedWords.push(capitalizedFirstLetter + restOfWord);
}

console.log(capitalizedWords.join(" "));

// Check if 1 appears in the first or last position of a given array of integers
var randomNum = Math.round(Math.random() * 10) + 1;
const givenNums = Array.from({length: randomNum}, () => Math.floor(Math.random() * randomNum));

console.log(givenNums);

if (givenNums[0] == 1 || givenNums[givenNums.length - 1] == 1){
    console.log(true);
}else {
    console.log(false);
}

//find the longest string from a given array of strings

const givenstrings = [
    "pizza", 
    "iphone",
    "javascript",
    "coffee",
    "flag",
    "microphone"
];

let longestStrings = [];
for (const string of givenstrings) {
    if (longestStrings.length > 0) {
        if (string.length > longestStrings[0].length) {
            longestStrings = [];
            longestStrings.push(string);
        } else if (string.length == longestStrings[0].length) {
            longestStrings.push(string);
        }
    }else {
        longestStrings.push(string);
    }
}

console.log(longestStrings);

