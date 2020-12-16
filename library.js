//let bookCard = document.querySelector('.book-card');
let gridContainer = document.querySelector('.grid-container');
let library = [];

class Book {
    constructor(title, author, pages, readingStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readingStatus = readingStatus;
    }
    info() {
        if (this.readingStatus) {
            this.readingStatus = 'read it.';
        } else {
            this.readingStatus = 'not read it yet.';
        }

        return this.title + ' by ' + this.author + ' is ' + this.pages + ' long. I have ' + this.readingStatus;

    }
}

let hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
let hungerGames = new Book('Hunger Games', 'Stacey Mellody', 465, true);
let vagabond = new Book('The Vagabond', 'James Potts', 241, true);

function addBookToLibrary() {
    library.push(hobbit);
    library.push(hungerGames);
    library.push(vagabond);

}

function displayBook() {


    for (let i = 0; i < library.length; i++) {
        let bookObj = library[i];

        let bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        gridContainer.appendChild(bookCard);

        for (let key in bookObj) {
            switch (key) {
                case 'title':
                    bookCard.innerHTML += "<h4>" + bookObj[key] + "</h4>";
                    break;
                case 'author':
                    bookCard.innerHTML += "<p>Author: " + bookObj[key] + "</p>";
                    break;
                case 'pages':
                    bookCard.innerHTML += "<p> " + bookObj[key] + " pages</p>";
                    break;
                case 'readingStatus':
                    if(bookObj[key]) {
                        bookCard.innerHTML += "<p>Read &#9989; </p>";
                    } else {
                        bookCard.innerHTML += "<p>Read &#10060;</p>";
                    }
                    break;
                    }

            }
        }
    }



addBookToLibrary();
displayBook();