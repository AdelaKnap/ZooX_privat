# zoox_projekt
I det här projektet har en single-page-application (SPA) skapats med frontend-ramverket Vue för företaget ZooX för att hantera deras prodkter. Bootstrap används som CSS-ramverk.
Webbplatsen består av en startsida samt en sida med produkter, utöver dessa finns det även en vy för att skapa nya användaruppgifter samt en vy för att uppdatera produkt. Applikationen konsumerar ett RESTful API backend byggd med Hapi.js. Backend-servern hanterar funktionalitet så som att hämta, lägga till, uppdatera och ta bort produkter och användare från databasen, MongoDB.

Vue-applikationen gör HTTP-förfrågningar till backend-API:et med axios. 
Följande endpoints används i applikationen:

GET /products - Hämtar alla produkter från servern.
GET /products{id} - Hämtar en specifik produkt från servern.
POST /products - Lägger till en ny produkt.
PUT /products{id} - Uppdaterar en specifik produkt utifrån id.
PATH /products{id} - Uppdaterar endast en del av en produkt utifrån id.
DELETE /products/{id} - Tar bort en produkt baserat på id.

GET /categories - Hämtar alla kategorier från servern.
GET /categories/{id} - Hämtar kategori utifrån id.

GET /products - Hämtar alla produkter från servern.
GET /users/logout - Loggar ut anävndaren.
POST /users - Lägger till en ny användare.
POST /users/login - Loggar in användare.

# Länk till webbplatsen
Länk till webbplatsen: https://zoox.netlify.app/

## Skapad av:
Adela Knap adkn2300@student.miun.se
