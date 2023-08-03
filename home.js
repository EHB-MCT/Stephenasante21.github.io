//masonry
/*const Masonry = require('masonry-layout');

window.onload = () => {
    const grid = document.querySelector('.grid');

    const masonry = new Masonry(grid, {
        itemSelector: '.grid-item',
        gutter: 10,
        columnWidth: 1,
        fitWidth: true
    });
}*/


//display the images from the database
const imagegrid = document.getElementById("grid");

//fetch the data
async function fetchImages(){
    try{
        const response = await fetch("http://localhost:3000/artpieces");
        console.log("images test")
        return await response.json();
        
    } catch (error){
        console.error("error fetching images:", error);
        return [];
    }
}

//display the images in the grid
async function displayImages(){
    const images = await fetchImages();
    console.log(images);

    images.forEach(element => {
        const imageDiv = document.createElement("div");
        imageDiv.className = "grid-item";

        const imgElement = document.createElement("img");
        imgElement.src = `../databaseverzameling/${element.img_url}.jpg`;
        imgElement.alt = element.title; // Or use any other property for alt text

        imageDiv.appendChild(imgElement);
        imagegrid.appendChild(imageDiv);
    });
}

displayImages();
