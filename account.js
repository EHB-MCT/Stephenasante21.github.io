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
        const response = await fetch(`https://web-2-art-dump.onrender.com/savedartpieces/${userId}`);
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
        <div class="grid-item" id="${element.img_url}">
            <div class="grid-item" id="${element.img_url}"><img src="/web2-frontend-Stephenasante21/databaseverzameling/${element.img_url}.jpg" alt=""></div>
            <button class="delete-button" type="submit" id="submit">DELETE</button>
        </div>        
        `
    });
}

//delete an art piece from the database
document.getElementById('grid').addEventListener('click', async event => {
    const clickedElement = event.target;
    const userId = user.uuid;

    if(clickedElement.classList.contains('delete-button')){
        const gridItem = clickedElement.closest('.grid-item');
        const imgElement = gridItem.querySelector('img');

        const img_url = imgElement.getAttribute('src').replace('/web2-frontend-Stephenasante21/databaseverzameling', '').replace('.jpg', '');

        const data = {
            img_url
        }

        try{
            const response = await fetch(`https://web-2-art-dump.onrender.com/deleteartpiece/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)                
            });

            const result = await response.json();

            if(result.status === 'Succes'){
                console.log('Art piece deleted', result.message);

                gridItem.remove();
            } else {
                console.error('Error deleting art piece', result.message)
            }
        } catch (error){
            console.error('Error deleting art piece', error);
        }
    }
})

displayImages();

