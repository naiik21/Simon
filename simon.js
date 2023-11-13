//Variables
let vueltas = 0;
let pos = 0;
let repG;
let ruleta = ["vermell", "blau", "verd", "groc"];
let simon = [];
let user = [];
let myInterval;
let totalGuanyades = parseInt(localStorage.getItem('totalGuanyades')) || 0;
let totalPerdudes = parseInt(localStorage.getItem('totalPerdudes')) || 0;

//Funció que començar el joc
function start() {
    document.getElementById("start").innerHTML = '';
    document.getElementById("facil").innerHTML = '<button id="facil" onclick="facil()">Facil</button>';
    document.getElementById("medio").innerHTML = '<button id="medio" onclick="medio()">Medio</button>';
    document.getElementById("dificil").innerHTML = '<button id="dificil" onclick="dificil()">Dificil</button>';
}

//Funció que ens mostra les estadistiques de les partides 
function estadistiques() {
    let partidesTotal = totalGuanyades + totalPerdudes;
    let estats = window.open("", "_blank");
    estats.document.write('<p>Total de partides: ' + partidesTotal +
        '</p><br><p>Partides guayades(' + ((totalGuanyades * 100) / partidesTotal).toFixed(2) + "%): " + totalGuanyades +
        '</p><br><p>Partides perdudes(' + ((totalPerdudes * 100) / partidesTotal).toFixed(2) + "%): " + totalPerdudes + '</p>');
}

//Funcions per seleccionar la dificultat del joc
function facil() {
    document.getElementById("facil").innerHTML = '';
    document.getElementById("medio").innerHTML = '';
    document.getElementById("dificil").innerHTML = '';
    clean();
    myInterval = setInterval(function () { loop(5) }, 1000)
}
function medio() {
    document.getElementById("facil").innerHTML = '';
    document.getElementById("medio").innerHTML = '';
    document.getElementById("dificil").innerHTML = '';
    clean();
    myInterval = setInterval(function () { loop(7) }, 1000)
}
function dificil() {
    document.getElementById("facil").innerHTML = '';
    document.getElementById("medio").innerHTML = '';
    document.getElementById("dificil").innerHTML = '';
    clean();
    myInterval = setInterval(function () { loop(11) }, 1000)
}

//Funció que reprodueix les opcións que selecciona simon
function loop(rep) {
    repG = rep;
    let num = Math.floor(Math.random() * (4 - 0) + 0);

    if (num == 0) {
        document.getElementById("vermell").innerHTML = '<button style="background-color: black; width: 100px; height: 100px"></button>';
        document.getElementById("blau").innerHTML = '<button style="background-color: blue; width: 100px; height: 100px"></button>';
        document.getElementById("verd").innerHTML = '<button style="background-color: green; width: 100px; height: 100px"></button>';
        document.getElementById("groc").innerHTML = '<button style="background-color: yellow; width: 100px; height: 100px"></button>';
    } else if (num == 1) {
        document.getElementById("vermell").innerHTML = '<button style="background-color: red; width: 100px; height: 100px"></button>';
        document.getElementById("blau").innerHTML = '<button style="background-color: black; width: 100px; height: 100px"></button>';
        document.getElementById("verd").innerHTML = '<button style="background-color: green; width: 100px; height: 100px"></button>';
        document.getElementById("groc").innerHTML = '<button style="background-color: yellow; width: 100px; height: 100px"></button>';
    } else if (num == 2) {
        document.getElementById("vermell").innerHTML = '<button style="background-color: red; width: 100px; height: 100px"></button>';
        document.getElementById("blau").innerHTML = '<button style="background-color: blue; width: 100px; height: 100px"></button>';
        document.getElementById("verd").innerHTML = '<button style="background-color: black; width: 100px; height: 100px"></button>';
        document.getElementById("groc").innerHTML = '<button style="background-color: yellow; width: 100px; height: 100px"></button>';
    } else if (num == 3) {
        document.getElementById("vermell").innerHTML = '<button style="background-color: red; width: 100px; height: 100px"></button>';
        document.getElementById("blau").innerHTML = '<button style="background-color: blue; width: 100px; height: 100px"></button>';
        document.getElementById("verd").innerHTML = '<button style="background-color: green; width: 100px; height: 100px"></button>';
        document.getElementById("groc").innerHTML = '<button style="background-color: black; width: 100px; height: 100px"></button>';
    }

    vueltas++;
    if (vueltas == rep) {
        clearInterval(myInterval);
        document.getElementById("vermell").innerHTML = '<button id="vermell" onclick="usuario(this)" style="background-color: red; width: 100px; height: 100px"></button>';
        document.getElementById("blau").innerHTML = '<button id="blau" onclick="usuario(this)" style="background-color: blue; width: 100px; height: 100px"></button>';
        document.getElementById("verd").innerHTML = '<button id="verd" onclick="usuario(this)" style="background-color: green; width: 100px; height: 100px"></button>';
        document.getElementById("groc").innerHTML = '<button id="groc" onclick="usuario(this)" style="background-color: yellow; width: 100px; height: 100px"></button>';
        return;
    } else {
        setTimeout(clean, 500);
    }
    simon.push(ruleta[num]);
    //console.log(simon.toString());
}

//Funció que deja al usuari repetir les opcions de siomon
function usuario(opcio) {
    if (simon[pos] == opcio.id) {
        user.push(opcio.id);
        pos++;
    } else {
        alert("Perdiste");
        totalPerdudes++;
        localStorage.setItem('totalPerdudes', totalPerdudes);
        vueltas = 0;
        simon = [];
        user = [];
        pos = 0;
        limpiar();
        if (confirm("Quieres jugar orta partida?")) {
            start();
        } else {
            document.getElementById("start").innerHTML = '<div id="start"> <button onclick="start()">Start</button> <button onclick="estadistiques()">Estadistiques</button> </div>';
        }
    }

    if (simon.length == user.length) {
        comprobacion();
    }

    //console.log(user.toString());
    //console.log(simon.toString());
}

//Funció que serveix per revisar que s'han repetit correctement les opcions 
function comprobacion() {
    let correcte = 0;
    for (let n = 0; n < user.length; n++) {
        if (user[n] == simon[n]) {
            correcte++;
        }
    }
    if (correcte == repG) {
        alert("Has guanyat");
        totalGuanyades++;
        localStorage.setItem('totalGuanyades', totalGuanyades);
        vueltas = 0;
        simon = [];
        user = [];
        pos = 0;
        limpiar();
        if (confirm("Quieres jugar orta partida?")) {
            start();
        } else {
            document.getElementById("start").innerHTML = '<div id="start"> <button onclick="start()">Start</button> <button onclick="estadistiques()">Estadistiques</button> </div>';
        }
    }
}

function limpiar() {
    document.getElementById("vermell").innerHTML = '';
    document.getElementById("blau").innerHTML = '';
    document.getElementById("verd").innerHTML = '';
    document.getElementById("groc").innerHTML = '';
}
function clean() {
    document.getElementById("vermell").innerHTML = '<div id="vermell" style="background-color: red; width: 100px; height: 100px"></div>';
    document.getElementById("blau").innerHTML = '<div id="blau" style="background-color:blue; width: 100px; height: 100px"></div>';
    document.getElementById("verd").innerHTML = '<div id="verd" style="background-color:green; width: 100px; height: 100px"></div>';
    document.getElementById("groc").innerHTML = '<div id="groc" style="background-color:yellow; width: 100px; height: 100px"></div>';
}