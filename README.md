ART DUMP WEBSITE

Description
Art dump is een website waar je art pieces van verschillende art pîeces kan zien en je favorieten saven. 

FEATURES
- art piece gallery 
- search functionaliteit
- save en delete een art piece
- user account: register, log in, update en delete u account

TECHNOLOGIES USED 
- Frontend: html, css, javascript
- backend: nodejs
- database: MongoDB
- external libraries and packages
    - cors
    - body parser
    - dotenv
    - uuid
    - colcade, imagesloaded, masonry-layout
    - react-image-gallery

DESIGN
ik heb de design veranderd. Ik heb het gebaseerd op pinterest en de design ui van nothing os.
hier is de link https://xd.adobe.com/view/e547a10b-21ac-49c4-8c0e-c4877b3e5a04-b014/

SOURCES
voor de login en register system - https://www.youtube.com/watch?v=BpzwUTzFGpI&list=PLGsnrfn8XzXii2J5-Jpqufypu6upxcSGx&index=30
voor errors - klasgenoten en stackoverflow



DATABASE

Database, collections, example object in those collections
Collection = “user”
Example user {
Username: jesup
email: jesup@gmail.com
password: jesup123
uuid: “dadasdazd1s2d1a21da5z4da9sd1a95”
}
Example artpieces {
Image: url image
Artist: jesup
title: Naruto vs Sasuke
description: Fanart of Naruto fighting against Sasuke! "I'll definitely bring you back to Konoha" 4k wallpaper for mobile, tablet and desktop”
}
Savedart {
Image: img url
artist: bossie
title: tiger
uuid: “dadasdazd1s2d1a21da5z4da9sd1a95”
}


API - All possible endpoints. Each endpoint has the following info Request method (GET, PUT, POST, DELETE) Request data (query string, body, etc...) Possible responses Errors + messages success messages + data 
User 
POST user (add a user to your database with name email and password)
DELETE user (delete your account from the database)
PUT user (update the username and password)

Art piece
GET art piece (get all from art piece)
GET one art piece (get 1 art piece)
