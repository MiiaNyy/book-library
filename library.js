//let bookCard = document.querySelector('.book-card');
let gridContainer = document.querySelector('.grid-container');
let library = [];

class Book {
    constructor(title, author, pageCount, readingStatus) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.readingStatus = readingStatus;
    }
    info() {
        if (this.readingStatus) {
            this.readingStatus = 'read it.';
        } else {
            this.readingStatus = 'not read it yet.';
        }

        return this.title + ' by ' + this.author + ' is ' + this.pageCount + ' long. I have ' + this.readingStatus;

    }
}

let hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
let hungerGames = new Book('Hunger Games', 'Stacey Mellody', 465, true)

function addBookToLibrary() {
    library.push(hobbit);
    library.push(hungerGames);
}

function displayBook() {
    let title = document.createElement('h4');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    let readingStatus = document.createElement('p');

    let bookCard;

    for(let i = 0; i < library.length; i++) {
        bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        gridContainer.appendChild(bookCard);
        console.log('Book card number ' + (i + 1) + ' created');
    }

    library.forEach(function (e) {

        title.innerText = e.title;
        author.innerText = 'Author: ' + e.author;
        pages.innerText = e.pageCount + ' pages long'

        if (readingStatus) {
            readingStatus.innerText = 'Read';
        } else {
            readingStatus.innerText = 'Not read yet.';
        }

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(readingStatus);

    })

}




addBookToLibrary();
displayBook();