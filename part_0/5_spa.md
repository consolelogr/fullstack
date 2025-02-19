sequenceDiagram
    participant browser
    participant server
    
    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa

    server ->> browser: HTML document
     
    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
         
    server ->> browser: CSS file

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js

    server ->> browser: JS file

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json

    server ->> browser: JSON file

    browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    Submitted form data is displayed without page reload on screen

