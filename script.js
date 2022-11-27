var body = document.querySelector('body');
var textbox = document.querySelectorAll('.TextBox');
var inputWordLength = 0;
var inputContainer = 0;
var correctGuess = 0;
var wrongWord = 1;
var rand = Math.floor(Math.random() * 5757);
var word;
var popupmessage = document.querySelector('.popupmessage');
var Key = document.querySelectorAll('.Key');



fetch('words.json')
    .then((response) => response.json())
    .then((json) => {
        word = json[rand].word;
    });
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
        var key = ekey;
            var which = ewhich;
            if (inputWordLength != 5 && key != 'Backspace' && which >= 65 && which <= 90 && correctGuess != 5 && inputContainer <= 25) {
                textbox[inputContainer + inputWordLength].innerText = key;
                textbox[inputContainer + inputWordLength].classList.add('input');
                inputWordLength++;
            }
            if (key === 'Backspace' && inputWordLength != 0 && correctGuess != 5 && inputContainer <= 25) {
                inputWordLength--;
                textbox[inputContainer + inputWordLength].innerText = "";
                textbox[inputContainer + inputWordLength].classList.remove('input');
            }
    
            if (inputWordLength === 5 && key === 'Enter' && inputContainer <= 25 && correctGuess != 5) {
                var Word = '';
                for (var j = 0; j < 5; j++) {
                    Word += textbox[inputContainer + j].innerText;
                }
                wrongWord = 1;
                checkForWordInList(Word);
            }
    
            if (correctGuess === 5) {
                var Word = '';
                for (var j = 0; j < 5; j++) {
                    Word += textbox[inputContainer + j].innerText;
                }

                checkForWordInList(Word)
            }
    }



    async function checkForWordInList(Word) {
        const response = await fetch("words.json");
        const json = await response.json();
        for (var i = 1; i < 5757; i++) {
            if (json[i].word === Word.toLowerCase()) {

                wrongWord = 0;

                if (correctGuess != 5 && inputWordLength === 5) {
                    
                    correctGuess = 0;
                    for (var i = 0; i < 5; i++) {
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
                            for (var j = 0; j < 5; j++) {
                                if (KEY === word[j]) {
                                    if(array[KEY]!=2)
                                        array[KEY]=1;
                                    keycolorchanger(KEY,array[KEY]);
                                    textbox[inputContainer + i].classList.add('close');
                                }
                            }
                            correctGuess = 0;
                        }
                    }

                    if(inputContainer===25 && correctGuess!=5){
                        popupmessage.innerText = word;
                        popupmessage.classList.add('popupmsgwhite');
                    }
                    inputWordLength = 0;
                    inputContainer = inputContainer + 5;
                }
                 
                if (correctGuess === 5) {
                        popupmessage.innerText = "congratulations";
                        popupmessage.classList.add('popupmsggreen');
                }
            }
        }

        if (wrongWord === 1) {
            popupmessage.innerText = "not in wordlist";
            popupmessage.classList.add('popupmsgred');

            for (var i = 0; i < 5; i++) {
                textbox[inputContainer + i].classList.add('wrongGuess');
            }

            setTimeout(() => {
                popupmessage.innerHTML = '';
                popupmessage.classList.remove('popupmsgred');
                for (var i = 0; i < 5; i++) {
                    textbox[inputContainer + i].classList.remove('wrongGuess');
                }
            }, 1100);
        }

    }
}, 200)
