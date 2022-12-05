var body = document.querySelector('body');
var textbox = document.querySelectorAll('.TextBox');
var inputWordLength = 0;
var inputContainer = 0;
var correctGuess = 0;
var wrongWord = 1;
var rand = Math.floor(Math.random() * 3997);
var word="four";
var popupmessage = document.querySelector('.popupmessage');
var Key = document.querySelectorAll('.Key');
var streakcount = document.querySelector('.streakcount');
var num = Number(streakcount.innerText);
var flag = 0;
var reset = document.querySelector('.reset');


function streakset(){
    localStorage.setItem("streak", num);
}

function getstreak(){
    return localStorage.getItem("streak");
}

num = getstreak();
if(num!=null)
streakcount.innerText = num;


function fetchdata(){
     fetch('words4.json')
        .then((response) => response.json())
        .then((json) => {
            word = json[rand];
        })
}


async function fetcher(){
    addloader();
    await fetchdata();
    removeloader();
}

function addloader(){
    document.querySelector('.loaderdiv').classList.add('visible');
}

function removeloader(){
setTimeout(() => {
    document.querySelector('.loaderdiv').classList.remove('visible');
    document.querySelector('.loaderdiv').classList.add('hidden');
},400)
}

fetcher()
addloader();
removeloader();

var resetkeypressed;
reset.addEventListener('keydown',(e)=>{
    resetkeypressed = e.key;
})

reset.addEventListener('click',(e)=>{
    
    
   if(resetkeypressed!='Enter'){
    rand = Math.floor(Math.random() * 3997);
    fetcher()
    addloader();
    removeloader();
    for(var i=0;i<20;){
        for(var k=0;k<3;k++)
        for(var j=0;j<4;j++){
            if(textbox[i + j].innerText != "")
            textbox[i + j].innerText = "";
            textbox[i + j].classList.forEach(elem=>{
                textbox[i + j].classList.remove(elem);
            })
            textbox[i + j].classList.add('TextBox');

        }
        i=i+4;
    }

    for(var i=0;i<28;i++){

    if(i===19 || i===27)
        continue;
    else{
        for(var j=0;j<3;j++){
        document.querySelectorAll('#Key')[i].classList.forEach(elem=>{
            document.querySelectorAll('#Key')[i].classList.remove(elem);
        })
        document.querySelectorAll('#Key')[i].classList.add('Key');
        document.querySelectorAll('#Key')[i].classList.add(keyclass(i));
    }
    }
    }

        popupmessage.innerHTML = "";
        popupmessage.classList.remove('popupmsgwhite');
        popupmessage.classList.remove('popupmsggreen');


    inputWordLength = 0;
    inputContainer = 0;
    correctGuess = 0;
    wrongWord = 1;
}
resetkeypressed = 0;
})

fetch('words4.json')
    .then((response) => response.json())
    .then((json) => {
        word = json[rand];
});

setTimeout(() => {
    word = word.toLowerCase();
    body.addEventListener('keyup', (e) => {
        var ekey = e.key;
        var ewhich = e.which;
        keyprocessor(ekey,ewhich);
    })

    for(var i=0;i<28;i++){
        Key[i].addEventListener('click',(e)=>{
            keyprocessor(e.target.innerText,Whichkey[e.target.innerText]);
        })
    }

    function keyprocessor(ekey,ewhich){
        if(ekey==='Bs')
            ekey = 'Backspace';
        flag =0;
        var key = ekey;
            var which = ewhich;
            if (inputWordLength != 4 && key != 'Backspace' && which >= 65 && which <= 90 && correctGuess != 4 && inputContainer <= 16) {
                textbox[inputContainer + inputWordLength].innerText = key;
                textbox[inputContainer + inputWordLength].classList.add('input');
                
                inputWordLength++;
            }
            if (key === 'Backspace' && inputWordLength != 0 && correctGuess != 4 && inputContainer <= 16) {
                inputWordLength--;
                textbox[inputContainer + inputWordLength].innerText = "";
                textbox[inputContainer + inputWordLength].classList.remove('input');
            }
    
            if (inputWordLength === 4 && key === 'Enter' && inputContainer <= 16 && correctGuess != 4) {
                var Word = '';
                for (var j = 0; j < 4; j++) {
                    Word += textbox[inputContainer + j].innerText;
                }
                wrongWord = 1;
                checkForWordInList(Word);
            }
    
    }



    async function checkForWordInList(Word) {
        const response = await fetch("words4.json");
        const json = await response.json();
        for (var i = 1; i < 3997; i++) {
            if (json[i] === Word.toLowerCase()) {

                wrongWord = 0;

                if (correctGuess != 4 && inputWordLength === 4) {
                    
                    correctGuess = 0;
                    for (var i = 0; i < 4; i++) {
                        textbox[inputContainer + i].classList.add('rotateinput');
                        var KEY =textbox[inputContainer + i].innerText.toLowerCase();

                        if(array[KEY]!=1 && array[KEY]!=2)
                            keycolorchanger(KEY,array[KEY]);

                        if ( KEY === word[i]) {
                            array[KEY]=2;
                            keycolorchanger(KEY,array[KEY]);
                            textbox[inputContainer + i].classList.add('perfect');
                            correctGuess++;
                        }
                        else {
                            for (var j = 0; j < 4; j++) {
                                if (KEY === word[j]) {
                                    if(array[KEY]!=2)
                                        array[KEY]=1;
                                    keycolorchanger(KEY,array[KEY]);
                                    textbox[inputContainer + i].classList.add('closeguess');
                                }
                            }
                            correctGuess = 0;
                        }
                    }

                    if(inputContainer===16 && correctGuess!=4){
                        popupmessage.innerText = word;
                        popupmessage.classList.add('popupmsgwhite');
                        num=0;
                        streakset()
                        streakcount.innerText = num;
                    }
                    inputWordLength = 0;
                    inputContainer = inputContainer + 4;
                }
                 
                if (correctGuess === 4 && flag===0) {
                        popupmessage.innerText = "congratulations";
                        popupmessage.classList.add('popupmsggreen');
                        num = Number(num) + 1;
                        streakset()
                        console.log(num);
                        streakcount.innerText = num;
                        flag =1;
                }
            }
        }

        if (wrongWord === 1) {
            popupmessage.innerText = "not in wordlist";
            popupmessage.classList.add('popupmsgred');

            for (var i = 0; i < 4; i++) {
                textbox[inputContainer + i].classList.add('wrongGuess');
            }

            setTimeout(() => {
                popupmessage.innerHTML = '';
                popupmessage.classList.remove('popupmsgred');
                for (var i = 0; i < 4; i++) {
                    textbox[inputContainer + i].classList.remove('wrongGuess');
                }
            }, 1100);
        }

    }
},400)

function keycolorchanger(k,val){
    switch(val){
        case 0 :
            document.querySelector("."+k).classList.add('keypressed');
        break;
        case 1:
            document.querySelector("."+k).classList.add('keyclose');
        break;
        case 2:
            document.querySelector("."+k).classList.add('keyperfect');
        break;
    }
}
   


var array ={
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0,
}

function keyclass(val){
switch(val){
    case 0: return 'q';
    break;
    case 1: return 'w';
    break;
    case 2: return 'e';
    break;
    case 3: return 'r';
    break;
    case 4: return 't';
    break;
    case 5: return 'y';
    break;
    case 6: return 'u'
    break;
    case 7: return 'i';
    break;
    case 8: return 'o';
    break;
    case 9: return 'p';
    break;
    case 10: return 'a';
    break;
    case 11: return 's';
    break;
    case 12: return 'd';
    break;
    case 13: return 'f';
    break;
    case 14: return 'g';
    break;
    case 15: return 'h';
    break;
    case 16: return 'j';
    break;
    case 17: return 'k';
    break;
    case 18: return 'l';
    break;
    case 19: return 'Backspace';
    break;
    case 20: return 'z';
    break;
    case 21: return 'x';
    break;
    case 22: return 'c';
    break;
    case 23: return 'v';
    break;
    case 24: return 'b';
    break;
    case 25: return 'n';
    break;
    case 26: return 'm';
    break;
    case 27: return 'Enter';
    break;
}

}

var Whichkey ={
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,
    Enter:13,
    Backspace:8
}
