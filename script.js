const accessKey = "isQ3H9JH5QR7wqmXziRjkTmoh-mFuGJroplI0VMXK1s";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".new");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImage() {
    inputData = inputEl.value.trim();
    if (!inputData) {
        alert("Please enter a search term.");
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            searchResults.innerHTML = "";
        }

        const results = data.results;

        results.map((result) => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Image";

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description || "View Image";

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;
        if (page > 1) {
            showMore.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImage();
});

showMore.addEventListener("click", () => {
    searchImage();
});
