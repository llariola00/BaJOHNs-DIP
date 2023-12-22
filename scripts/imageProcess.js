let imgSource = document.getElementById("imageSrc");
let canvasOutput = document.getElementById("canvasOutput");

imgSource.onload = function () {
    let mat = cv.imread(imgSource);

    // Convert the image to grayscale
    cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY);

    cv.imshow(canvasOutput, mat);
    mat.delete();
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
