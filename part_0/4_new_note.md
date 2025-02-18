Tee vastaavanlainen kaavio, joka kuvaa, mitä tapahtuu tilanteessa, jossa käyttäjä luo uuden muistiinpanon ollessaan sivulla https://studies.cs.helsinki.fi/exampleapp/notes eli kirjoittaa tekstikenttään jotain ja painaa nappia tallenna.

Kirjoita tarvittaessa palvelimella tai selaimessa tapahtuvat operaatiot sopivina kommentteina kaavion sekaan.

sequenceDiagram
    participant browser
    participant server
    
    browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    
    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/notes

    server ->> browser: HTML document
     
    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
         
    server ->> browser: CSS file

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.js

    server ->> browser: JS file

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json

    server ->> browser: JSON file

    Adds the submitted text to the JSON file and outputs the updated list

