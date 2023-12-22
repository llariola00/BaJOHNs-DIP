let imgSource = document.getElementById("imageSrc");
let canvasOutput = document.getElementById("canvasOutput");
let btnApply = document.getElementById("btn-apply"); // The button for applying the grayscale filter
let btnDownload = document.getElementById("btn-download");
let btnClipboard = document.getElementById("btn-clipboard");

let mat;
let btnGroup = document.querySelector(".btn-group"); // Select the btn-group div
let imgProcess;

imgSource.onload = function () {
    mat = cv.imread(imgSource);
};

btnApply.onclick = function () {
    if (mat) {
        switch (imgProcess) {
            case "Grayscale":
                try {
                    cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY);
                    cv.imshow(canvasOutput, mat);
                    //mat.delete(); // Clean up the memory
                    console.log("Grayscale filter is applied.");
                } catch (err) {
                    console.log(err);
                }
                break;

            case "Blur":
                let src = mat;
                let dst = new cv.Mat();
                let ksize = new cv.Size(9, 9);
                let anchor = new cv.Point(-1, -1);
                cv.blur(src, dst, ksize, anchor, cv.BORDER_DEFAULT);
                cv.imshow(canvasOutput, dst);
                // src.delete();
                // dst.delete();
                console.log("Blur is applied.");
                break;

            case "2D Convolution":
                console.log("2D Convolution is applied.");
                break;

            case "Resize":
                console.log("Resize is applied.");
                break;

            case "Rotate":
                console.log("Rotate is applied.");
                break;
            default:
                console.log("No valid image processing operation selected.");
        }
    }
};

// Add an event listener to the btn-group div
btnGroup.addEventListener("change", function (event) {
    if (event.target.type === "radio") {
        console.log("Selected button:", event.target.value);
        imgProcess = event.target.value;
    }
});

// Function to download the processed image
btnDownload.onclick = function () {
    let link = document.createElement("a");
    let dataUrl = canvasOutput.toDataURL();
    link.href = dataUrl;
    link.download = "processed_image.png";
    // Trigger a click event on the link to start the download
    link.click();
};

// Function to copy the processed image to the clipboard
btnClipboard.onclick = function () {
    let dataUrl = canvasOutput.toDataURL();
    fetch(dataUrl)
        .then((res) => res.blob())
        .then((blob) => {
            let clipboardItem = new ClipboardItem({ "image/png": blob });
            navigator.clipboard
                .write([clipboardItem])
                .then(() => {
                    console.log("Image copied to clipboard");
                    alert("Image copied to clipboard"); // Add this line
                })
                .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
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
