let imgSource = document.getElementById("imageSrc");
let canvasOutput = document.getElementById("canvasOutput");

let btnGroup = document.querySelector(".btn-group"); // Select the btn-group div
let btnApply = document.getElementById("btn-apply"); // The button for applying the grayscale filter
let btnDownload = document.getElementById("btn-download");
let btnClipboard = document.getElementById("btn-clipboard");

let mat;
let selectedProcess; // The selected image processing operation
let appliedProcess; // The applied image processing operation

imgSource.onload = function () {
    mat = cv.imread(imgSource);
};

// Fucntion to show slider when Resize/Rotate is selected
function showSlider() {
    let slider = document.querySelector(".range-slider");
    slider.style.opacity = "1";
    slider.style.visibility = "visible";
}

// Fucntion to hide slider when Resize/Rotate is not selected
function hideSlider() {
    let slider = document.querySelector(".range-slider");
    slider.style.opacity = "0";
    slider.style.visibility = "hidden";
}

// Add an event listener to the btn-group div
btnGroup.addEventListener("change", function (event) {
    if (event.target.type === "radio") {
        console.log("Selected button:", event.target.value);
        selectedProcess = event.target.value;

        // Check if the selected process is Resize or Rotate
        if (selectedProcess === "Resize" || selectedProcess === "Rotate") {
            showSlider();
        } else {
            hideSlider();
        }
    }
});

// Function to apply the selected image processing operation
btnApply.onclick = function () {
    if (mat) {
        switch (selectedProcess) {
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
                let srcBlur = mat;
                let dstBlur = new cv.Mat();
                let ksizeBlur = new cv.Size(9, 9);
                let anchorBlur = new cv.Point(-1, -1);
                cv.blur(srcBlur, dstBlur, ksizeBlur, anchorBlur, cv.BORDER_DEFAULT);
                cv.imshow(canvasOutput, dstBlur);
                // src.delete();
                // dst.delete();
                console.log("Blur is applied.");
                break;

            case "2D Convolution":
                let srcConvolution = mat;
                let dstConvolution = new cv.Mat();
                let MConvolution = new cv.Mat.eye(3, 3, cv.CV_32FC1);
                let anchorConvolution = new cv.Point(-1, -1);
                cv.filter2D(srcConvolution, dstConvolution, cv.CV_8U, MConvolution, anchorConvolution, 0, cv.BORDER_DEFAULT);
                cv.imshow(canvasOutput, dstConvolution);
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

        // Save the applied image processing operation
        appliedProcess = selectedProcess;

        // Automatically show the edited image
        if (checkCurrentSlide() !== 1 && selectedProcess) {
            goToSlide(1);
        }
    }

    console.log("Slider value:", sliderValue);
};

// Function to download the processed image
btnDownload.onclick = function () {
    if (!appliedProcess) {
        alert("Please apply an image processing operation first.");
        return;
    }

    let link = document.createElement("a");
    let dataUrl = canvasOutput.toDataURL();
    link.href = dataUrl;
    link.download = "processed_image.png";
    // Trigger a click event on the link to start the download
    link.click();
};

// Function to copy the processed image to the clipboard
btnClipboard.onclick = function () {
    if (!appliedProcess) {
        alert("Please apply an image processing operation first.");
        return;
    }

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

//
// IMAGE SLIDER FUCNTIONALITY
// MOVED FROM ITS OWN FILE, SINCE OPENCV FAILES TO WORK WHEN IT IS TYPE MODULE
// AND I NEED FUNCTIONS FROM THE IMAGE SLIDER FILE
const slides = document.querySelectorAll(".pic");
const btnRight = document.querySelector(".btn-right");
const btnLeft = document.querySelector(".btn-left");

let curSlide = 0;
const maxSlide = slides.length;

function checkCurrentSlide() {
    return curSlide;
}

const goToSlide = function (slide) {
    slides.forEach(function (s, i) {
        const translateXNum = 80 * (i - slide);
        let translateYNum, rotateDeg, grayscaleNum, zIndexNum, opacityNum;
        if (translateXNum === 0) {
            translateYNum = 0;
            rotateDeg = 0;
            grayscaleNum = 0;
            zIndexNum = 1;
            opacityNum = 100;
        } else if (translateXNum < 0) {
            translateYNum = 5;
            rotateDeg = -5;
            grayscaleNum = 1;
            zIndexNum = 0;
            opacityNum = 20;
        } else {
            translateYNum = 5;
            rotateDeg = 5;
            grayscaleNum = 1;
            zIndexNum = 0;
            opacityNum = 20;
        }
        s.style.transform = `translate(${translateXNum}%, ${translateYNum}%) rotate(${rotateDeg}deg)`;
        s.style.filter = `grayscale(${grayscaleNum})`;
        s.style.zIndex = zIndexNum;
        s.style.opacity = `${opacityNum}%`;
    });
};
goToSlide(0);

const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
        curSlide = 0;
    } else {
        curSlide++;
    }
    goToSlide(curSlide);
};

const prevSlide = function () {
    if (curSlide === 0) {
        curSlide = maxSlide - 1;
    } else {
        curSlide--;
    }
    goToSlide(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
// END OF IMAGE SLIDER FUCNTIONALITY
//

//
// START OF IMAGE CATEGORY SELECTOR FUNCTIONALITY (IMAGE PROCESSING / FACE RECOGNITION)
// Select the processCategory radio buttons and imgProcess-btn-group element
let processCategoryRadios = document.querySelectorAll(
    '.processCategory input[type="radio"]'
);
let imgProcessBtnGroup = document.querySelector("#imgProcess-btn-group");

// Add an event listener to each processCategory radio button
processCategoryRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
        // Check the value of the selected radio button
        if (this.value === "imageProcessing") {
            // If the value is 'imageProcessing', show the imgProcess-btn-group
            imgProcessBtnGroup.style.opacity = "1";
            imgProcessBtnGroup.style.visibility = "visible";
        } else {
            // Otherwise, hide the imgProcess-btn-group
            imgProcessBtnGroup.style.opacity = "0";
            imgProcessBtnGroup.style.visibility = "hidden";
        }
    });
});
// END OF IMAGE CATEGORY SELECTOR FUNCTIONALITY
//

//
// START OF SLIDER VALUE FUNCTIONALITY
let sliderValue;

function rangeSlider() {
    let slider = document.querySelectorAll(".range-slider");
    let range = document.querySelectorAll(".range-slider__range");
    let value = document.querySelectorAll(".range-slider__value");

    slider.forEach((currentSlider) => {
        value.forEach((currentValue) => {
            let val = currentValue.previousElementSibling.getAttribute("value");
            currentValue.innerText = val;
        });

        range.forEach((elem) => {
            elem.addEventListener("input", (eventArgs) => {
                elem.nextElementSibling.innerText = eventArgs.target.value;
                sliderValue = eventArgs.target.value;
            });
        });
    });
}
rangeSlider();
