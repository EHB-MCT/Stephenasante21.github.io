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

//get userID from sessionStorage
const user = JSON.parse(sessionStorage.getItem('user'));
const userId = user.uuid;

//fetch the data
async function fetchImages(){
    try{
        const response = await fetch(`http://localhost:3000/savedartpieces/${userId}`);
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
        document.getElementById('grid').innerHTML += `
            <div class="grid-item" id="${element.img_url}"><img src="../databaseverzameling/${element.img_url}.jpg" alt=""></div>
        `
    });
}

displayImages();
