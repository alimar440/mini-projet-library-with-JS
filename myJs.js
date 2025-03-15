class BookBis {
    constructor(id, title, author, chapitre, lu = false) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.chapitre = chapitre;
        this.status = lu;
    }
    toggleStatus() {
        this.status = !this.status;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        if (!this.exist(newBook)) {
            this.books.push(newBook);
        }
    }

    exist(newBook) {
        return this.books.some((book) => book.id === newBook.id);
    }

    getBook(id) {
        return this.books.find((book) => book.id === id);
    }

    removeBook(bookId) {
        const bookIndex = this.books.findIndex(book => book.id === bookId);

        if (bookIndex !== -1) {
            this.books.splice(bookIndex, 1);
            console.log(`Le livre avec l'ID ${bookId} a été supprimé.`);
            displayBooks();
        } else {
            console.log("Livre introuvable.");
        }
    }
}

const library = new Library();

library.addBook(new BookBis(1, "One Piece", "Eiichiro Oda", 1050, true));
library.addBook(new BookBis(2, "Naruto", "Masashi Kishimoto", 700, true));
library.addBook(new BookBis(3, "Attack on Titan", "Hajime Isayama", 139, true));
library.addBook(new BookBis(4, "Dragon Ball", "Akira Toriyama", 519, false));
library.addBook(new BookBis(5, "Demon Slayer", "Koyoharu Gotouge", 205, true));

function createCard(book, containerId) {
    const container = document.getElementById(containerId);
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = book.id;

    card.innerHTML = `
        <div class="remove"> X </div>
        <div>
            <h2>${book.title}</h2>
            <p><strong>Mangaka :</strong> ${book.author}</p>
            <p><strong>Chapitres :</strong> ${book.chapitre}</p>
            <button class="status">${book.status ? "Read" : "Not read"}</button>
        </div>
    `;

    const addButton = document.querySelector(`.card-button`);
    if (addButton) {
        container.insertBefore(card, addButton);
    } else {
        container.appendChild(card);
    }
}

function displayBooks() {
    const container = document.getElementById("booksContainer");
    container.innerHTML = "";

    library.books.forEach(book => {
        createCard(book, "booksContainer");
    });

    const cardAdd = document.createElement("div");
    cardAdd.classList.add("card-button");

    const button = document.createElement("button");
    button.textContent = "+";
    button.classList.add("add-button");

    cardAdd.appendChild(button);
    container.appendChild(cardAdd);
}

displayBooks();

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const form = document.getElementById("mangaForm");

    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-button")) {
            modal.style.display = "flex";
        } else if (event.target.classList.contains("close")) {
            modal.style.display = "none";
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const chapitre = document.getElementById("chapitre").value;

        const newBook = new BookBis(library.books.length + 1, title, author, chapitre);
        library.addBook(newBook);

        modal.style.display = "none";
        form.reset();
        displayBooks();
    });

    const container = document.getElementById("booksContainer");

    container.addEventListener("click", function (event) {
        const card = event.target.closest(".card");
        if (!card) return;
        const bookId = parseInt(card.dataset.id);

        if (event.target.classList.contains("remove")) {
            library.removeBook(bookId);
        } else if (event.target.classList.contains("status")) {
            toggleBookStatus(bookId, event.target);
        }
    });
});

function toggleBookStatus(bookId, buttonElement) {
    const book = library.getBook(bookId);
    if (book) {
        book.toggleStatus();
        buttonElement.innerText = book.status ? "Read" : "Not read";
    }
}
