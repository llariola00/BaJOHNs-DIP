let imgSource = document.getElementById("imageSrc");
let canvasOutput = document.getElementById("canvasOutput");
let btnApply = document.getElementById("btn-apply"); // The button for applying the grayscale filter

let mat; // Move the mat variable outside the onload function so it can be accessed in the button click event handler

imgSource.onload = function () {
    mat = cv.imread(imgSource);
};

btnApply.onclick = function () {
    // Convert the image to grayscale when the button is clicked
    if (mat) {
        cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY);
        cv.imshow(canvasOutput, mat);
        mat.delete(); // Clean up the memory
        console.log("Grayscale filter is applied.");
    }

    console.log("Grayscale filter is called.");
};

var Module = {
    onRuntimeInitialized() {
        document.getElementById("status").innerHTML = "OpenCV.js is ready.";
        // Fetch the image URL from the query parameters
        const params = new URLSearchParams(window.location.search);
        const imgURL = params.get("img");

        // Fetch the image
        fetch(imgURL)
            .then((response) => response.blob())
            .then((blob) => {
                // Create a Blob URL from the image and set it as the src of the imgSource
                imgSource.src = URL.createObjectURL(blob);
            })
            .catch((error) => console.error(error));
    },
};

// Select the btn-group div
let btnGroup = document.querySelector(".btn-group");

// Add an event listener to the btn-group div
btnGroup.addEventListener("change", function (event) {
    // Check if the event target is a radio button
    if (event.target.type === "radio") {
        // Log the value of the selected radio button
        console.log("Selected button:", event.target.value);
    }
});
