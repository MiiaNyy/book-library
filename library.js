let gridContainer = document.querySelector('.grid-container');

let form = document.querySelector('form');

let addBookBtn = document.querySelector('#add-book-btn');
//On the book-card div, that changes the reading status
let readingStatusBtn = document.querySelector('.reading-status-btn');

let openFormBtn = document.querySelector('.add-book');
let closeFormBtn = document.querySelector('.close-window');

let closeBookCardBtn = document.querySelector('.close-book-card');

let bookCard = document.querySelector('.book-card');


let library = [];

class Book {
    constructor(title, author, genre, pages, readingStatus) {
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
function addBookToLibrary(bookObj) {
    let bookCard = document.createElement('div');
    let bookInfo = document.createElement('div');

    bookCard.classList.add('book-card');
    bookInfo.classList.add('book-info');


    bookCard.innerHTML += "<span class='close-book-card'>&#10006;</span>"
    gridContainer.appendChild(bookCard);
    bookCard.appendChild(bookInfo);

    for (let key in bookObj) {
        switch (key) {
            case 'title':
                //add title as class name whitout spaces, so we can use it later when removing object
                bookInfo.innerHTML += "<div class='" + bookObj[key].replace(/\s+/g, '') + "'><h4>" + bookObj[key] + "</h4></div>";
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
        addBookToLibrary(library[i]);
    }
}

function getNewBookObject() {
    let newBook = [];

    //makes sure that right formElements are shown in the book card 
    for (let i = 0; i < form.length; i++) {
        let formElement = form.elements[i];
        if (formElement.name == 'title' || formElement.name == 'author' || formElement.name == 'genre' || formElement.name == 'pages' || (formElement.name == 'readingStatus' && formElement.checked)) {
            newBook.push(formElement.value);
        }
    }

    newBook = new Book(newBook[0], newBook[1], newBook[2], newBook[3], newBook[4]);
    pushBookToLibraryArr(newBook);
    addBookToLibrary(newBook);
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

function removeBookFromView(event) {

    let parent = event.target.parentElement;
    console.log(parent);
    if (parent.className == 'book-card') {
        parent.style.display = 'none';
        removeBookFromLibrary(parent);
    }
}

function removeBookFromLibrary(parent) {
    let child = parent.childNodes;
    console.log(child);
    //Find the right class of the element and compare that to the library object and remove the right object
    for (let i = 0; i < child.length; i++) {
        let divsName = child[i].className;
        console.log('librarys length is ' + library.length);
        for (let j = 0; j < library.length; j++) {

            //Remove all of the spaces so we can compare titles
            let objTitle = library[j].title.replace(/\s+/g, '');
            if (objTitle == divsName) {
                library.splice(j, 1);
            }
        }
    }
    console.log('Library is ' + library.length + ' items long after removin loop');
}

function changeStatusOfObj(event) {
    let element = event.target;
    let bookCardElement = element.closest('.book-card');
    let child = bookCardElement.childNodes;

    //Find the right class of the element and compare that to the library 
    //object so readingstatus can be changed from the right object
    for (let i = 0; i < child.length; i++) {
        let divsClass = child[i].className;

        for (let j = 0; j < library.length; j++) {
            let objTitle = library[j].title.replace(/\s+/g, '');

            if (objTitle == divsClass) {

                if (library[j].readingStatus == 'read') {
                    library[j].readingStatus = 'not-read';
                } else if (library[j].readingStatus == 'not-read') {
                    library[j].readingStatus = 'in-progress'
                } else if (library[j].readingStatus == 'in-progress') {
                    library[j].readingStatus = 'read'
                }
                console.log('books reading status is after pressing button: ' + library[j].readingStatus);
            }
        }
    }
}

function changeReadingStatus(event) {
    //When pressing something, we make sure that it is the right element by checking that the 
    //element contains certain classnames. After that we can change it.
    //First change reading status from screen
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
    //This changes reading status in the object
    changeStatusOfObj(event);
}

function removeBackgroundFilter() {
    document.querySelector('.library').classList.remove('filter-on');
    document.querySelector('header').classList.remove('filter-on');
    openFormBtn.classList.remove('filter-on');
}








closeFormBtn.addEventListener('click', function () {
    form.style.display = 'none';
    removeBackgroundFilter()
});

addBookBtn.addEventListener('click', function () {
    getNewBookObject();
    form.style.display = 'none';
    form.reset();
    removeBackgroundFilter();
});

readingStatusBtn.addEventListener('click', function (e) {
    changeReadingStatus(e);
});

openFormBtn.addEventListener('click', function () {
    toggleFormVisibility();

    //Ei oo valmis, yritin vaan saada formin transition nätisti

    /*if (form.classList.contains('hidden')) {
        form.classList.remove('hidden');

        setTimeout(function () {
            form.classList.remove('visuallyhidden');
        }, 20);
    } else {
        form.classList.add('visuallyhidden');
        form.addEventListener('transitionend', function (e) {
            form.classList.add('hidden');
        }, {
            capture: false,
            once: true,
            passive: false
        });
    }
*/

});


gridContainer.addEventListener('click', function (event) {
    removeBookFromView(event);
    changeReadingStatus(event)

});