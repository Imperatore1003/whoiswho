// let images = ["lee hyein", "kang haerin", "danielle marsh", "hanni pham", "kim minji2", "im nayeon", "yoo jeongyeon", "park jihyo", "kim dahyun", "son chaeyoung", "kim jisoo", "kim jennie", "cho miyeon", "jeon soyeon", "seo soojin", "hwang yeji", "shin ryujin", "choi jisu", "lee chaeryeong", "shin yuna", "kim minji", "kim bora", "lee siyeon", "kim yoohyeon", "lee yubin", "lee gahyeon", "oh seunghee", "jang seungyeon", "choi yujin", "kwon eunbin", "jeon heejin", "kim hyunjin", "jung jinsoul", "kim jungeun", "choi yerim", "park chaewon", "kim jiwoo", "ha sooyoung", "im yeojin", "jo haseul", "son hyejoo", "han eunji", "heo yoorim", "jo serim", "park jiwon", "kim sihyeon", "kwon eunbi", "choi yena", "jo yuri", "kim chaewon", "kang hyewon", "lee chaeyeon", "kim minju", "an yujin", "jang wonyoung", "kim gaeul", "kim jiwon", "lee hyunseo", "huh yunjin", "kim garam", "hong eunchae", "seo youngeun", "kim chaehyun", "kim dayeon", "kang yeseo", "huening bahiyyih", "jeon somi", "choi yoojung", "kim doyeon", "kang mina", "kim chungha", "kim sejeong", "kim sohye", "jung chaeyeon", "kim yongsun", "moon byulyi", "ahn hyejin", "jung wheein", "lee sunmi", "bae joohyun", "kang seulgi", "kim yerim", "son seungwan", "park sooyoung", "yoo jimin", "kim minjeong", "hirai momo", "minatozaki sana", "myoui mina", "miyawaki sakura", "yabuki nako", "honda hitomi", "naoi rei", "sakamoto mashiro", "ezaki hikaru", "nakamura kazuha", "uchinaga aeri", "chou tzuyu", "yeh shuhua", "roseanne park", "manoban lalisa", "yontararak nicha", "chonnasorn sajakul", "song yuqi", "handong", "wong gaahei", "wang yiren", "shen xiaoting", "ning yizuho", "yoon seeun", "sim jayoon", "lee chaeyoung", "park sieun", "bae sumin", "jang yeeun", "moon sua", "rachel huh", "gnomino"];
let images = ["lee hyein", "kang haerin", "danielle marsh", "hanni pham", "kim minji2", "im nayeon", "yoo jeongyeon", "park jihyo", "kim dahyun", "son chaeyoung", "kim jisoo", "kim jennie", "cho miyeon", "jeon soyeon", "seo soojin", "hwang yeji", "shin ryujin", "choi jisu", "lee chaeryeong", "shin yuna", "jeon heejin", "kim hyunjin", "jung jinsoul", "kim jungeun", "choi yerim", "park chaewon", "kim jiwoo", "ha sooyoung", "im yeojin", "jo haseul", "son hyejoo", "kwon eunbi", "choi yena", "jo yuri", "kim chaewon", "kang hyewon", "lee chaeyeon", "kim minju", "an yujin", "jang wonyoung", "kim gaeul", "kim jiwon", "lee hyunseo", "huh yunjin", "kim garam", "hong eunchae", "seo youngeun", "kim chaehyun", "kim dayeon", "kang yeseo", "huening bahiyyih", "jeon somi", "lee sunmi", "bae joohyun", "kang seulgi", "kim yerim", "son seungwan", "park sooyoung", "yu jimin", "kim minjeong", "hirai momo", "minatozaki sana", "myoui mina", "miyawaki sakura", "yabuki nako", "honda hitomi", "naoi rei", "sakamoto mashiro", "ezaki hikaru", "nakamura kazuha", "uchinaga aeri", "chou tzuyu", "yeh shuhua", "roseanne park", "manoban lalisa", "yontararak nicha", "song yuqi", "wong gaahei", "shen xiaoting", "ning yizuho", "yoon seeun", "sim jayoon", "lee chaeyoung", "park sieun", "bae sumin", "jang yeeun", "moon sua", "lily morrow", "seol yoona", "oh haewon", "jang kyujin", "kim jiwoo2", "bae jinsol"];
// let images = ["lee hyein", "kang haerin", "danielle marsh", "hanni pham", "kim minji2"];
// console.log(images.length);

let gameEngine = "<input type='text' id='nameField'><div id='image'></div>";

let person = "";
let id = 0;

let startTime = 0;
let endTime = 0;
let seconds = 0;
let seconds2 = 0;
let minutes = 0;

let startTimeP = 0;
let endTimeP = 0;
let secondsP = 0;
let seconds2P = 0;
let minutesP = 0;

let finalScreen = "";
let timeForPerson = "";

let imageP = "";

let display = "";
let form = "";
let statistics = "";

let max = 0;
let min = -1;

function replay() {
    gameEngine = "<input type='text' id='nameField'><div id='image'></div>";
    person = "";
    id = 0;
    startTime = 0;
    endTime = 0;
    seconds = 0;
    seconds2 = 0;
    minutes = 0;
    startTimeP = 0;
    endTimeP = 0;
    secondsP = 0;
    seconds2P = 0;
    minutesP = 0;
    finalScreen = "";
    timeForPerson = "";
    imageP = "";
    display = "";
    form = "";
    statistics = "";
    max = 0;
    min = -1;

    document.getElementById("historyTitle").innerHTML = "";
    document.getElementById("history").innerHTML = "";

    start();
}

function start() {
    initGame();

    find();
}

function initGame() {
    document.getElementById("play").innerHTML = gameEngine;

    shuffle(images);

    document.getElementById("historyTitle").innerHTML = "History";

    startTime = Date.now();

    document.querySelector("#nameField").focus();
}

function find() {
    if (id == images.length) {
        return finish();
    }
    newPerson(id);
    let name = document.querySelector("#nameField");
    name.addEventListener("input", (evt) => {
        let choose = name.value.toLowerCase().trim();
        if (choose == person || choose == "ivan") {
            if (choose == "ivan") {
                alert(person);
            }

            addToHistory(id);

            id++;
        
            name.value = "";

            return find();
        }
    });
}

function newPerson(id) {
    person = images[id];

    display = "<h5>Persone trovate: " + id + "/" + images.length + "</h5><progress value='" + id + "' max='" + images.length + "'></progress><br><img id='realimg' src='/images/" + person + ".jpg'>";
    document.querySelector("#image").innerHTML = display;

    if (person == "kim minji2") {
        person = "kim minji";
    }
    if (person == "kim jiwoo2") {
        person = "kim jiwoo";
    }

    startTimeP = Date.now();
}

function finish() {
    endTime = Date.now();
    seconds = Math.round((endTime - startTime) / 1000);
    minutes = Math.floor(seconds / 60);
    seconds2 = seconds - 60 * minutes;

    if (seconds < 60) {
        finalScreen = "Hai impiegato " + seconds + " secondi! minchia";
    } else {
        finalScreen = "Hai impiegato " + minutes + " minuti e " + seconds2 + " secondi!";
    }


    statistics = "<br>Tempo medio: " + Math.round(seconds / images.length) + " secondi<br>Tempo massimo: " + max + "<br>Tempo minimo: " + min;

    form = "<br><form method='post' action='/includes/addRecord.inc'><input type='submit' name='submit' value='Registra risultati' class='btn btn-secondary'><input hidden name='seconds' value='" + seconds + "'></form>"

    document.getElementById("play").innerHTML = "<h3>" + finalScreen + statistics + "</h3><input type='button' id='start' value='Rigioca' class='btn btn-primary' onclick='replay()'>";// + form;
}

function addToHistory(idImage) {
    endTimeP = Date.now();
    secondsP = Math.round((endTimeP - startTimeP) / 1000);
    minutesP = Math.floor(secondsP / 60);
    seconds2P = secondsP - 60 * minutesP;

    if (secondsP > max) {
        max = secondsP;
    }
    if (secondsP < min || min == -1) {
        min = secondsP;
    }

    timeForPerson = minutesP + ":" + seconds2P;
    
    imageP = "<img src='/images/" + images[idImage] + ".jpg' style='height: 100px; width: auto; margin: 0;'>";

    person = images[idImage]
    if (person == "kim minji2") {
        person = "kim minji";
    }
    if (person == "kim jiwoo2") {
        person = "kim jiwoo";
    }

    document.getElementById("history").innerHTML = "<tr><th scope='row'>" + capitalizeWords(person) + "</th><td>" + timeForPerson + "</td><td>" + imageP + "</td></tr>" + document.getElementById("history").innerHTML;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function capitalizeWords(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }
