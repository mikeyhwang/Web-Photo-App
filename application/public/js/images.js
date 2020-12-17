var photoCount = 0;
function fadeOut(event) {
    //alert(window.getComputedStyle(event).opacity);
    var opacity = 1;
    //while (window.getComputedStyle(event).opacity > 0) {
        var IntervalID = window.setInterval(function() { opacityDrop(event); }, 15);
        if (window.getComputedStyle(event).opacity < 0.01) {
            clearInterval(IntervalID);
        }
    //}
    //alert(window.getComputedStyle(event).opacity);
}

function createPhotoCard(data, containerDiv) {
    var grid = document.createElement("div");
    var image = document.createElement("img");
    var title = document.createElement("dd");
    grid.setAttribute("id", "inner");
    image.setAttribute("id", "image");
    title.setAttribute("id", "text");
    title.innerHTML = data.title;
    image.src = data.url;
    containerDiv.appendChild(grid);
    grid.appendChild(image);
    grid.appendChild(title);
    image.onclick = function() {
        fadeOut(image);
        //alert(image.style.opacity);
        var intervID = setTimeout(function() { image.parentElement.removeChild(title);
            image.parentElement.removeChild(image);
            grid.parentElement.removeChild(grid);
            photoCount--;
            document.getElementById('image-count').innerHTML= "There are " + photoCount + " photo(s) being shown";}, 1500);
        if (window.getComputedStyle(image).opacity < 0.01) {
            clearTimeout(intervID);
        }
    }
}

let mainDiv = document.getElementById("images");
if (mainDiv) {
    let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos";
    fetch(fetchURL)
        .then((data) => data.json())
        .then((photos) => {
            let innerHTML = "";
            photos.forEach((photo) => {
                createPhotoCard(photo, mainDiv);
            });
            document.getElementById('image-count').innerHTML= "There are " + photos.length + " photo(s) being shown";
            photoCount = photos.length;
        })
}

function opacityDrop(item) {
    return item.style.opacity = parseFloat(window.getComputedStyle(item).opacity) - 0.01;
}
