// function to  fetch data
const fetchData = async () => {
    const inputText = document.getElementById("search-input").value;
    if (inputText === "") {
        toggleElement("empty-error", "block");
    } else {
        // clear previous result
        clearResults();

        // spinner show
        toggleElement("spinner", "block");
        toggleElement("empty-error", "none");
        const response = await fetch(`https://openlibrary.org/search.json?q=${inputText}`);
        const data = await response.json();
        console.log(data);
        const books = data.docs;
        if (books.length === 0) {
            toggleElement("result-error", "block");
            toggleElement("spinner", "none");
        } else {
            toggleElement("result-error", "none");
            displayBooks(books);
        }
    }
}

// function to displays books info 
const displayBooks = (books) => {
    const searchResults = document.getElementById("search-results");
    // count result
    document.getElementById("count-result").innerText = books.length;

    for (const book in books) {
        const div = document.createElement("div");
        div.classList.add("col-lg-4");
        div.classList.add("col-md-6");

        // get imgurl
        let coverUrl = "";
        if (books[book].cover_i === undefined) {
            coverUrl = `https://openlibrary.org/images/icons/avatar_book-sm.png`;
        } else {
            coverUrl = `https://covers.openlibrary.org/b/id/${books[book].cover_i}-M.jpg`;
        }
        // get author
        const authorName = books[book].author_name !== undefined ? books[book].author_name[0] : "Not found";
        // get publisher
        const publisher = books[book].publisher !== undefined ? books[book].publisher[0] : "Not Found";
        // get 1st publish date:
        const firstPublish = books[book].first_publish_year !== undefined ? books[book].first_publish_year : "Not found";
        // const firstPublish = books[book].publish_date !== undefined ? books[book].publish_date.slice(-1)[0] : "Not found";

        div.innerHTML = `
        <div class="card h-100 bg-secondary">
            <img src="${coverUrl}" class="mx-auto" height="200"
                width="180">
            <div class="card-body bg-white">
                <h5 class="card-title text-center"> ${books[book].title} </h5>
                <p> Author: ${authorName} </p>
                <p>Publisher: ${publisher}</p>
                <p>1st Published: ${firstPublish}</p>
            </div>
        </div>
        `;
        searchResults.appendChild(div);
    }
    // hide spinner
    toggleElement("spinner", "none");
}

// Function to Show/ hide element
const toggleElement = (elementId, displayProp) => {
    document.getElementById(elementId).style.display = displayProp;
}

// Function to clear results
const clearResults = () => {
    document.getElementById("search-results").textContent = "";
    document.getElementById("count-result").innerText = "0";
}


// search button click handler
document.getElementById("btn-search").addEventListener("click", fetchData);