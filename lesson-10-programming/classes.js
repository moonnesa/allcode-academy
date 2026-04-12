class Book {
    constructor( title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    displayBook () {
        console.log("Title: " + this.title);
        console.log("Author: " + this.author);
        console.log("Published: " + this.year);

        console.log('-'.repeat(10));
    }

    static displayBooks(books) {
        console.log("Here is your list of books: ");
        for (const book of books) {
            console.log("Title: " + book.title);
            console.log("Author: " + book.author);
            console.log("Published: " + book.year);

            console.log('-'.repeat(10));

        }
    }
}

let myBook = new Book ("JavaScript", "Nils Gaarland", "2023");

const books = [
    myBook,
    new Book ("HTML", "Rex Larsen", "2019"),
];

// Static Method on the class
Book.displayBooks(books);

// Method on the instance of the class
myBook.displayBook();

