let gridContainer = document.querySelector('.grid-container');

let form = document.querySelector('form');

let addBookBtn = document.querySelector('#add-book-btn');

let openFormBtn = document.querySelector('.open-form-btn');
let closeFormBtn = document.querySelector('.close-form-btn');

let closeBookCardBtn = document.querySelector('.close-book-card');

let bookCard = document.querySelector('.book-card');

let inputFields = document.querySelectorAll('.input-field');

let booksInLibrary = document.querySelector('.book-counter');
let pagesRead = document.querySelector('.pages-counter');
let readBooksCounter = document.querySelector('.read-books-counter');
let inProgressCounter = document.querySelector('.in-progress-counter');

booksInLibrary = 0;
pagesRead = 0;
readBooksCounter = 0;
inProgressCounter = 0;

let allInputFieldsFilled = false;

let library = [];

class Book {
    constructor(title, author, genre, pages, readingStatus) {
        this.id = Date.now();
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
        this.readingStatus = readingStatus;
    }
}

function pushBookToLibraryArr(book) {
    library.push(book);
}

//This is what is shown in the screen
function addBookToLibraryView(bookObj) {
    let bookCard = document.createElement('div');
    let bookInfo = document.createElement('div');

    //Add id to book card so we can identify it later
    bookCard.setAttribute("id", bookObj.id);

    bookCard.classList.add('book-card');
    bookInfo.classList.add('book-info');


    bookCard.innerHTML += "<span class='close-book-card'>&#10006;</span>"
    gridContainer.appendChild(bookCard);
    bookCard.appendChild(bookInfo);

    for (let key in bookObj) {
        switch (key) {
            case 'title':
                bookInfo.innerHTML += "<div><h4>" + bookObj[key] + "</h4></div>";
                break;
            case 'author':
                bookInfo.innerHTML += "<div><p>Author:<br> " + bookObj[key] + "</p></div>";
                break;
            case 'genre':
                bookInfo.innerHTML += "<div><p> Genre:<br> " + bookObj[key] + "</p></div>";
                break;
            case 'pages':
                bookInfo.innerHTML += "<div><p> " + bookObj[key] + " pages</p></div>";
                break;
            case 'readingStatus':
                if (bookObj[key] == 'read') {
                    bookInfo.innerHTML += "<div><button class='reading-status-btn read'>Read</button></div>";
                } else if (bookObj[key] == 'not-read') {
                    bookInfo.innerHTML += "<div><button class='reading-status-btn not-read-btn'>Not read</button></div>";
                } else {
                    bookInfo.innerHTML += "<div><button class='reading-status-btn in-progress-btn'>In progress</button></div>";
                }
                break;
        }
    }
}

function displayBooks() {
    for (let i = 0; i < library.length; i++) {
        addBookToLibraryView(library[i]);
    }
    
    console.log(library.length);
}

function addNewBookFromForm() {
    let bookValues = [];

    //makes sure that right formElements are shown in the book card 
    for (let i = 0; i < form.length; i++) {
        let formElement = form.elements[i];

        if (formElement.name == 'title' || formElement.name == 'author' || formElement.name == 'genre' || formElement.name == 'pages' || (formElement.name == 'readingStatus' && formElement.checked)) {
            //If empty, do not submit values to the object and animate form
            if (formElement.value === '') {
                toggleFormAnimation();
                return;
            } else {
                allInputFieldsFilled = true;
                bookValues.push(formElement.value);
            }
        }
    }
    addNewBook(bookValues[0], bookValues[1], bookValues[2], bookValues[3], bookValues[4], true);
}

function toggleFormAnimation() {
    form.classList.add('inputs-not-filled');
    form.addEventListener('animationend', function() {
        form.classList.remove('inputs-not-filled');
    });
}

function addNewBook(title, author, genre, pages, readingStatus, addToView) {

    let newBook = new Book(title, author, genre, pages, readingStatus);
    pushBookToLibraryArr(newBook);
    saveLibraryToStorage();

    if (addToView) {
        addBookToLibraryView(newBook);
    }
}


function toggleFormVisibility() {
    if (form.style.display === "none") {
        form.style.display = "block";
        document.querySelector('.library').classList.add('filter-on');
        document.querySelector('header').classList.add('filter-on');
        openFormBtn.classList.add('filter-on');
    } else {
        form.style.display = "none";

    }
}

function removeBook(event) {
    let parent = event.target.parentElement;

    if (parent.className == 'book-card') {
        let book = parent;
        removeBookFromLibrary(book);

        //Removes book from html doc
        book.parentNode.removeChild(book);
        saveLibraryToStorage();
    }
}

function removeBookFromLibrary(book) {
    //Find right id from DOM element and compare it with library id so right object can be removed
    let id = book.id;
    for (let i = 0; i < library.length; i++) {

        if (library[i].id == id) {
            library.splice(i, 1);
        }
    }
}

function toggleReadingStatusInObj(event) {
    let element = event.target;
    let bookCardElement = element.closest('.book-card');
    let id = bookCardElement.id;

    for (let i = 0; i < library.length; i++) {

        if (library[i].id == id) {
            let status = library[i].readingStatus;
            if (status == 'read') {
                status = 'not-read';
            } else if (status == 'not-read') {
                status = 'in-progress'
            } else if (status == 'in-progress') {
                status = 'read'
            }
            library[i].readingStatus = status;
            console.log('books reading status is after pressing button: ' + library[i].readingStatus);
        }
    }

}

function toggleReadingStatusView(event) {
    //When pressing something, we make sure that it is the right element by checking that the 
    //element contains certain classnames. After that we can change it.
    let element = event.target;
    let elementClass = element.classList;

    if (elementClass.contains('reading-status-btn')) {

        if (elementClass.contains('read')) {
            element.classList.remove('read');
            element.classList.add('not-read-btn');
            element.innerHTML = 'Not read';
        } else if (elementClass.contains('not-read-btn')) {
            element.classList.remove('not-read-btn');
            element.classList.add('in-progress-btn');
            element.innerHTML = 'In progress';
        } else if (elementClass.contains('in-progress-btn')) {
            element.classList.remove('in-progress-btn');
            element.classList.add('read');
            element.innerHTML = 'Read';
        }
    }
}

function toggleReadingStatus(event) {
    toggleReadingStatusView(event);
    //changes reading status in the object
    toggleReadingStatusInObj(event);
    saveLibraryToStorage();
}

function removeBackgroundFilter() {
    document.querySelector('.library').classList.remove('filter-on');
    document.querySelector('header').classList.remove('filter-on');
    openFormBtn.classList.remove('filter-on');
}

function saveLibraryToStorage() {
    localStorage.setItem('library', JSON.stringify(library));
}

//pulls books from local storage when page is refreshed
function readLibraryFromStorage() {

    // gets information from local storage to use in displayBooks to create display
    let libraryJson = localStorage.getItem('library');

    if (libraryJson != null && libraryJson.length > 0) {
        //parses a JSON string to 'normal' value, number to integar yms.
        library = JSON.parse(libraryJson);
    } else {
        //If storage is empty, generoi this book to the page
        addNewBook('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 310, 'read', false);
    }

}


function addColorWhenFilled() {
    inputFields.forEach(function (input) {
        input.addEventListener('keydown', function () {
            input.style.borderColor = '#06d6a0';
        })
    });
}

function resetForm() {
    removeBackgroundFilter();
    form.reset();
    form.style.display = 'none';
    allInputFieldsFilled = false;

    //turn inputfield border color back to normal
    inputFields.forEach(function (input) {
        input.style.borderColor = 'black';
    });
};

function addButtonListeners() {
    //Closes book form
    closeFormBtn.addEventListener('click', function () {
        form.style.display = 'none';
        removeBackgroundFilter();
    });

    //Adds new book to library and if input fields are filled, reset form
    addBookBtn.addEventListener('click', function () {
        addNewBookFromForm();
        if (allInputFieldsFilled) {
            resetForm();
        }
    });


    //Open add book form
    openFormBtn.addEventListener('click', function () {
        toggleFormVisibility();
        addColorWhenFilled();
    });

    //Delete book and toggle reading status in book cards
    gridContainer.addEventListener('click', function (event) {
        removeBook(event);
        toggleReadingStatus(event)
    });
}

function start() {
    addButtonListeners()
    readLibraryFromStorage();
    displayBooks();
}

start();
