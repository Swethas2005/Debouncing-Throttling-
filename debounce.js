// debounce function
function debounce(func, delay) {
    let timeoutId;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

let debouncedAutocomplete = debounce(autocomplete, 1);

// Attach the debounced function to the input's oninput event
document.getElementById("movieInput").addEventListener("input", debouncedAutocomplete);

function autocomplete() {
    let apiKey = "b41c1a63";
    let movieName = document.getElementById("movieInput").value.trim();

    if (movieName === "") {
        return;
    }

    let apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieName)}`;

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
            displayAutocompleteResults(data.Search);
        })
        .catch(function (error) {
            console.error("Error fetching or displaying data:", error.message);
        });
}

function displayAutocompleteResults(results) {
    let autocompleteContainer = document.getElementById("autocompleteContainer");
    
    // Clear previous results
    autocompleteContainer.innerHTML = "";

    if (results) {
        results.forEach(function (result) {
            let p = document.createElement("p");
            p.textContent = result.Title;
            p.addEventListener("click", function () {
                document.getElementById("movieInput").value = result.Title;
                autocompleteContainer.innerHTML = ""; 
                searchMovie(); 
            });
            autocompleteContainer.appendChild(p);
        });
    }
}

