function searchMovie() {
    let apiKey = "b41c1a63";
    let movieName = document.getElementById("movieInput").value.trim();

    if (movieName === "") {
        alert("Please enter a movie name.");
        return;
    }

    document.getElementById("autocompleteContainer").innerHTML = "";

    let apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieName)}`;

    fetch(apiUrl)
        .then(function (res) {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then(function (data) {
            if (data.Error) {
                throw new Error(data.Error);
            }
            displayData(data);
        })
        .catch(function (error) {
            console.error("Error fetching or displaying data:", error.message);
        });
}

function displayData(data) {
    let movieImageContainer = document.getElementById("movieImage");
    let movieDataContainer = document.getElementById("movieData");
    let autocompleteContainer = document.getElementById("autocompleteContainer");

    movieImageContainer.innerHTML = ""; 
    movieDataContainer.innerHTML = "";

    // Hideing the autocompleteContainer after the movie information is displayed
    autocompleteContainer.style.display = "none";

    if (data.Poster) {
        let img = document.createElement("img");
        img.src = data.Poster;

       
        img.onload = function () {
            let imageHeight = this.height;
            if (imageHeight > 200) {
                movieImageContainer.style.width = "300px";
                movieDataContainer.style.width = "500px";
            } else {
                movieImageContainer.style.width = "150px";
                movieDataContainer.style.width = "500px";
            }
        };

        movieImageContainer.appendChild(img);
    }

    let detailsToShow = ["Title", "Year", "Genre", "Plot", "Director", "Actors", "Rated"];

    detailsToShow.forEach(function (key) {
        let p = document.createElement("p");
        p.textContent = `${key}: ${data[key] || "N/A"}`;
        movieDataContainer.appendChild(p);
    });
}


