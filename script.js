const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".add-note");
const backgroundImg = document.querySelector(".background-img");

// Save notes to localStorage
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Load and restore notes from localStorage
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
    attachEventListenersToNotes();

    // Move image to top-right if there are notes and we're on mobile
    if (notesContainer.children.length > 0 && window.innerWidth <= 768 && backgroundImg) {
        backgroundImg.classList.add("move-top-right");
    }
}

// Attach listeners to all current notes
function attachEventListenersToNotes() {
    const notes = document.querySelectorAll(".input-box");
    const deleteBtns = document.querySelectorAll(".delete-img");

    notes.forEach(note => {
        note.addEventListener("keyup", updateStorage);
    });

    deleteBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.parentElement.remove();
            updateStorage();
            handleImageReset();
        });
    });
}

// Create a new note
function createNote() {
    const note = document.createElement("div");
    note.className = "note";

    const inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");

    const deleteBtn = document.createElement("img");
    deleteBtn.className = "delete-img";
    deleteBtn.src = "delete.png";

    inputBox.addEventListener("keyup", updateStorage);
    deleteBtn.addEventListener("click", () => {
        note.remove();
        updateStorage();
        handleImageReset();
    });

    note.appendChild(inputBox);
    note.appendChild(deleteBtn);
    notesContainer.appendChild(note);
    updateStorage();

    // Animate background on phone
    if (window.innerWidth <= 768 && backgroundImg) {
        backgroundImg.classList.add("move-top-right");
    }
}

// Reset background if no notes remain
function handleImageReset() {
    if (notesContainer.children.length === 0 && backgroundImg) {
        backgroundImg.classList.remove("move-top-right");
    }
}

// Initial load
showNotes();

// Button event
createBtn.addEventListener("click", createNote);

// Handle Enter key
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

// Optional: global click fallback (already handled above too)
notesContainer.addEventListener("click", e => {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
        handleImageReset();
    }
});
