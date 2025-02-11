const books = [
    new Book(1, "One Piece", "Eiichiro Oda", 1050, true),
    new Book(2, "Naruto", "Masashi Kishimoto", 700, true),
    new Book(3, "Attack on Titan", "Hajime Isayama", 139, true),
    new Book(4, "Dragon Ball", "Akira Toriyama", 519, false),
    new Book(5, "Demon Slayer", "Koyoharu Gotouge", 205, true)
];

function Book(id, title, author, chapitre, lu = false) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.chapitre = chapitre;
    this.status = lu;
}

Book.prototype.toggleStatus = function () {
    this.status = !this.status;
};

function createCard(book, containerId) {
    const container = document.getElementById(containerId);
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = book.id; // Ajout du dataset.id pour pouvoir retrouver l'objet

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

    books.forEach(book => {
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
    const closeModal = document.querySelector(".close");
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

        const newBook = new Book(books.length + 1, title, author, chapitre);
        books.push(newBook);

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
            deleteBook(bookId);
        } else if (event.target.classList.contains("status")) {
            toggleBookStatus(bookId, event.target);
        }
    });
});

function deleteBook(bookId) {
    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        console.log(`Le livre avec l'ID ${bookId} a été supprimé.`);
        displayBooks();
    } else {
        console.log("Livre introuvable.");
    }
}

function toggleBookStatus(bookId, buttonElement) {
    const book = books.find(book => book.id === bookId);
    if (book) {
        book.toggleStatus();
        buttonElement.textContent = book.status ? "Read" : "Not read";
    }
}
