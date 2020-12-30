let gridContainer = document.querySelector('.grid-container');

let form = document.querySelector('form');

let addBookBtn = document.querySelector('#add-book-btn');


let openFormBtn = document.querySelector('.add-book');
let closeFormBtn = document.querySelector('.close-window');

let closeBookCardBtn = document.querySelector('.close-book-card');

let bookCard = document.querySelector('.book-card');

//change name
let formIsEmpty = false;

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
                console.log('books reading status is ' + bookObj[key]);
                if (bookObj[key] == 'read') {
                    bookInfo.innerHTML += "<div><button class='reading-status-btn read'>Read</button></div>";
                } else if (bookObj[key] == 'not-read') {
                    bookInfo.innerHTML += "<div><button class='reading-status-btn not-read-btn'>Not read</button></div>";
                } else {
                    bookInfo.innerHTML += "<div><button class='reading-status-btn in-progress-btn'>In progress</button></div>";
                }
                break;
            case ' ':
                console.log(bookObj + ' is empty');
                break;
        }
    }
}




function displayBooks() {
    for (let i = 0; i < library.length; i++) {
        addBookToLibraryView(library[i]);

    }
}

function required() {
    let empt = document.form1.title.value;
    if (empt === "") {
        console.log('Please input value');
        return false;
    } else {
        console.log('Code has accepted : you can try another');
        return true;
    }
}

function inputFieldIsEmptyWarning() {
    let container = document.createElement('div');
    container.innerHTML = 'All input fields have to be filled before adding the book to library!';
    form.appendChild(container);
}


function addNewBookFromForm() {
    let bookValues = [];

    //makes sure that right formElements are shown in the book card 
    for (let i = 0; i < form.length; i++) {
        let formElement = form.elements[i];

        if (formElement.name == 'title' || formElement.name == 'author' || formElement.name == 'genre' || formElement.name == 'pages' || (formElement.name == 'readingStatus' && formElement.checked)) {
            //If empty, do not submit values to the object
            if (formElement.value === '') {
                return;

            } else
                bookValues.push(formElement.value);
        }
    }
    //Tsek that all of the fields are not empty
    if (bookValues.length == 5) {
        addNewBook(bookValues[0], bookValues[1], bookValues[2], bookValues[3], bookValues[4], true);
        formIsEmpty = true;
    }



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
    console.log(parent);
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


let inputFields = document.querySelectorAll('.input-field');

inputFields.forEach(function (input) {
    input.addEventListener('keydown', function () {
        input.style.borderColor = '#06d6a0';
    })
})

function resetForm() {
    removeBackgroundFilter();
    form.reset();
    form.style.display = 'none';

    inputFields.forEach(function (input) {
        input.style.borderColor = 'black';
    });
    
}

function addButtonListeners() {
    //Closes book form
    closeFormBtn.addEventListener('click', function () {
        form.style.display = 'none';
        removeBackgroundFilter();
    });

    //Adds new book to library
    addBookBtn.addEventListener('click', function () {
        addNewBookFromForm();
        if (formIsEmpty) {
            resetForm();
        }
    });


    //Open add book form
    openFormBtn.addEventListener('click', function () {
        toggleFormVisibility();
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