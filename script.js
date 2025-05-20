//
// Variables
//
const myLibrary = [];
let libraryResults = document.querySelector("#libraryResults");
let formSubmitButton = document.getElementById("submit");
let form = document.querySelector("form");
let allButtons = document.querySelector("table");
allButtons.addEventListener("click", clickHandler);



//
// Page Initialization
//
Book.prototype.changeRead = function () {
    if (this.read === true){
        this.read = false;
        this.status = "not read yet";
    }
    else {
        this.read = true;
        this.status = "already read";
    }
};
addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);
addBookToLibrary("LOTR", "J.R.R Tolkien", 900, true);
addBookToLibrary("The Hobbit2", "J.R.R Tolkien the 2nd", 295, false);
displayLibrary();


//
//Constructors
//

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    if(read==true){
        this.status = "already read";
    }
    else{
        this.status = "not read yet";
    }
    // this.info = function (){
    //     return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`;
    // };
}

Book.prototype.changeRead = function () {
    if (this.read === true){
        this.read = false;
        this.status = "not read yet";
    }
    else {
        this.read = true;
        this.status = "already read";
    }
}


//
// Library Functions
//

function addBookToLibrary(title, author, pages, read) {
    let newbook = new Book(title, author, pages, read);
    newbook.id = crypto.randomUUID();
    myLibrary.push(newbook);
  // take params, create a book, give it UUID then store it in the array
}

    //loop through myLibrary and display in HTML table, 
    // assumption that all books have same properties
    //set variable for column header row, then 
function displayLibrary() {
    libraryResults.textContent = "";
    for(let book of myLibrary) {
        let tableRow = document.createElement("tr");
        if(book == myLibrary[0]){
            let tableHeaders = document.createElement("tr");
            let propertyNames = Object.keys(book);
            for(let property of propertyNames){
                let header = document.createElement("th");
                header.textContent = property;
                tableHeaders.appendChild(header);
            }
            libraryResults.appendChild(tableHeaders);
        }
        for(let data in book){
            let tableData = document.createElement("td");
            tableData.textContent = book[data];
            tableRow.appendChild(tableData);
        } 
        //add delete button to tableRow here
        //function adds HTML button to row
        //function stores ID of book to button
        //event listener for all delete buttons then looks at id, and... 
        // searches database for id, deletes book from database by id.
        tableRow.lastChild.remove();
        createReadButton(book, tableRow);
        createRemoveButton(book, tableRow);
        libraryResults.appendChild(tableRow);
    }
    console.log(myLibrary);

}

function createRemoveButton (book, tableRow) {
    let id = book.id;
    let tableData = document.createElement("td");
    let newbutton = document.createElement("button");
    newbutton.setAttribute("data-id", id);
    newbutton.setAttribute("class", "removeButton")
    newbutton.textContent = "Remove";
    tableData.appendChild(newbutton);
    tableRow.appendChild(tableData);
}

function createReadButton (book, tableRow) {
    let id = book.id;
    let tableData = document.createElement("td");
    let newbutton = document.createElement("button");
    newbutton.setAttribute("data-id", id);
    newbutton.setAttribute("class", "readButton")
    newbutton.textContent = "Toggle Read";
    tableData.appendChild(newbutton);
    tableRow.appendChild(tableData);
}


//
// Sidebar Controls
//
function expandSidebar(){
    document.getElementById("addBookSidebar").style.width = "25%";
    libraryResults.style.marginLeft = "25%";
}

function closeSidebar(){
    document.getElementById("addBookSidebar").style.width = "0px";
    libraryResults.style.marginLeft = "0px";
}

function overrideSubmit(event){
    event.preventDefault();
    // The below work to provide values, but wanted a better array of values with
    // fewer lines of code
    // console.log(event.target.form.title.value);
    // console.log(event.target.form.read.value);


    // invoking FormData constructor fires the "formdata" event
    new FormData(form);
    displayLibrary();
    form.reset();
    closeSidebar();
}    

form.addEventListener("formdata", (e) => {  
    // Get the form data from the event object
    const data = e.formData;
    // FormData converts boolean to string, converting back below 
    let readBool;
    data.get("read")=="true" ? readBool = true : readBool = false;

    addBookToLibrary(data.get("title"), data.get("author"),
     data.get("pages"), readBool);
}


);

//Click Handler


function clickHandler(event) {
    if(event.target.classList.contains("removeButton")){
        for(let i=0; i < myLibrary.length; i++){
            let book = myLibrary[i];
            if(book.id === event.target.dataset.id){
                myLibrary.splice(i, 1);
                break;
            }
        };
    }
    else if (event.target.classList.contains("readButton")) {
        for(let i=0; i < myLibrary.length; i++){
            let book = myLibrary[i];
            if(book.id === event.target.dataset.id){
                book.changeRead();
                break;
            }
        };
    }
    
    displayLibrary();
}