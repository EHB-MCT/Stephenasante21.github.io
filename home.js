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

let DISPLAYED_IMAGES = []; 
let ALL_IMAGES = [];

//display the images from the database
const imagegrid = document.getElementById("grid");

//fetch the data
async function fetchAndDisplayImages(){
    try{
        const response = await fetch("http://localhost:3000/artpieces");
        DISPLAYED_IMAGES = ALL_IMAGES =  await response.json();

        console.log(ALL_IMAGES)
        displayImages()

    } catch (error){
        console.error("error fetching images:", error);
        return [];
    }
}

//display the images in the grid
async function displayImages(){
    document.getElementById('grid').innerHTML = "";    

    DISPLAYED_IMAGES.forEach(element => {

        document.getElementById('grid').innerHTML += `
            <div class="grid-item" id="${element.img_url}">
                <img src="../databaseverzameling/${element.img_url}.jpg" alt="">
                <h2>${element.title}</h2>
                <h3>${element.artist}</h3>
                <button class="save-button" type="submit" id="submit">SAVE</button>
            </div>
        `
    });
}

//save an image to the database
document.getElementById('grid').addEventListener('click', async event => {
    const clickedEelement = event.target;
    const user = JSON.parse(sessionStorage.getItem('user'));

    if(clickedEelement.classList.contains('save-button')){
        const gridItem = clickedEelement.closest('.grid-item');
        const imgElement = gridItem.querySelector('img');

        const img_url = imgElement.getAttribute('src').replace('../databaseverzameling/', '').replace('.jpg', '');
        const artist = gridItem.querySelector('h3').textContent;
        const title = gridItem.querySelector('h2').textContent;
        
        //get userID from sessionStorage
        const user = JSON.parse(sessionStorage.getItem('user'));
        const userId = user.uuid;

        const data = {
            img_url,
            artist,
            title
        }

        try{
            const response = await fetch(`http://localhost:3000/saveartpiece/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            const result = await response.json();
    
            if(result.status === 'succes'){
                console.log('Art piece saved', result.data);
            } else{
                console.error('error saving art piece', result.message)
            }
        }catch(error){
            console.error('Error saving art piece', error);
        }
    };


})

//search function
document.getElementById('searchInput').addEventListener('input', async () => {
    const searchTerm = document.getElementById('searchInput').value;

    if (searchTerm.trim() !== '') {

        // Filter art pieces based on search term
            const searchResults = DISPLAYED_IMAGES.filter((piece) => {
                if(piece.artist.includes(searchTerm)){
                    return true
                }
            });

            DISPLAYED_IMAGES = searchResults
            console.log(DISPLAYED_IMAGES)

    } else {
        DISPLAYED_IMAGES = ALL_IMAGES
    }

    displayImages();
})

fetchAndDisplayImages();
