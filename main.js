let page = 1;
let totalImages = 0;
const maxImages = 100;

function searchImages() {
    page = 1;
    totalImages = 0;
    imageResults.innerHTML = "";
    fetchImages();
}

function fetchImages() {
    const searchQuery = document.getElementById("searchInput").value;
    const apiKey = "DddTeuliuG98iVYgGRVUSFcI4Z9gDJU3ZeIjeOslHK4";
    const apiUrl = `https://api.unsplash.com/search/photos?query=${searchQuery}&page=${page}&per_page=30&client_id=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayImages(data.results);
            totalImages += data.results.length;
            page++;
            if (totalImages < maxImages) {
                fetchImages();
            }
        })
        .catch(error => {
            console.error("Error fetching images:", error);
        });
}

function displayImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description;
        imageResults.appendChild(imgElement);
    });
}

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && totalImages < maxImages) {
            fetchImages();
        }
    }, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    });
    observer.observe(document.getElementById("scrollObserver"));
}
