const books = [
    new Book(1, "One Piece", "Eiichiro Oda", 1050),
    new Book(2, "Naruto", "Masashi Kishimoto", 700),
    new Book(3, "Attack on Titan", "Hajime Isayama", 139),
    new Book(4, "Dragon Ball", "Akira Toriyama", 519),
    new Book(5, "Demon Slayer", "Koyoharu Gotouge", 205)
];

function Book(id, title, author, chapitre) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.chapitre = chapitre;
}



function addBook(id, title, author, chapitre) {
    const myBook = new Book(id, title, author, chapitre);
    books.push(myBook);
}

function createCard(book, containerId) {
    const container = document.getElementById(containerId);
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="remove"> X </div>
        <div>
            <h2>${book.title}</h2>
            <p><strong>Mangaka :</strong> ${book.author}</p>
            <p><strong>Chapitres :</strong> ${book.chapitre}</p>
        div
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
    const addButton = document.querySelector(".add-button");

    addButton.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
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
        createCard(newBook, "booksContainer");
    });

    const container = document.getElementById("booksContainer");

    container.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove")) {
            const card = event.target.parentElement; event.target.closest(".card"); 
            const bookId = parseInt(card.dataset.id); 

            deleteBook(bookId);
            card.remove();
        }
    });
});


function deleteBook(bookId) {
    const bookIndex = books.findIndex(book => book.id === bookId);
    
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1); // Supprime du tableau
        console.log(`Le livre avec l'ID ${bookId} a été supprimé.`);
    } else {
        console.log("Livre introuvable.");
    }
}


