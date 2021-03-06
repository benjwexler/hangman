alert("Lets Play Hangman. The Category is animals! Use your keyboard to guess the letters!")

let words = ["dog", "cat", "elephant", "bird", "fish" ]

let word

let stateOfWord
let guessesLeft 

let wins = 0
let losses = 0
let inCorrectGuesses = 0

let bodyInstructions = {
    1 : "head",
    2 : "torso",
    3 : "leftArm",
    4 : "rightArm",
    5: "leftLeg",
    6 : "rightLeg"
}

let setNumbOfGuesses = (wordLength) => {
    // guessesLeft = wordLength + 1
    guessesLeft = 7
    document.getElementById("guessesLeft").innerText = guessesLeft
}


let showElement = (element) => {
    console.log(element)
    if(element) {
        document.getElementById(element).style.opacity = 1
    }
    
}



let hideElement = (index) => {

    
    // console.log(bodyInstructions[parseInt(index)])

    // showElement(bodyInstructions[inCorrectGuesses])

    document.getElementById(bodyInstructions[parseInt(index)]).style.opacity = 0
    console.log(index)
}

let resetBody = () => {
    console.log(Object.keys(bodyInstructions))

    let bodyParts = Object.keys(bodyInstructions)

    bodyParts.forEach(hideElement) 

   
}






let subtractGuess = () => {
    guessesLeft --
    document.getElementById("guessesLeft").innerText = guessesLeft
}


let randomWord = () => {
    let randomIndex =  Math.floor(Math.random() * words.length);
    document.getElementById("wordsContainer").innerText = words[randomIndex]
    word = words[randomIndex]
    generateAsteriks(words[randomIndex].length)
    setNumbOfGuesses(words[randomIndex].length)

}

let generateAsteriks = (wordLength) => {
    let asteriks = "*".repeat(wordLength)
    document.getElementById("wordsContainer").innerText = asteriks

    stateOfWord = asteriks
}

randomWord()

let userGuess = (e) => {
    return String.fromCharCode(e.keyCode).toLowerCase()
}

let setCharAt = (str,index,chr) => {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

let checkIfGameOver = () => {
    if(stateOfWord === word) {
        inCorrectGuesses = 0
        resetBody()
        // document.getElementById("winsContainer").style.color = "green";
        document.getElementById("winsContainer").classList.add("green")
        setTimeout(function(){ document.getElementById("winsContainer").classList.remove("green") }, 1000);
        wins++
        document.getElementById("wins").innerText = wins
        
        randomWord()
        
    }

    if(guessesLeft === 0) {
        inCorrectGuesses = 0
        resetBody()
        document.getElementById("lossesContainer").classList.add("red")
        setTimeout(function(){ document.getElementById("lossesContainer").classList.remove("red") }, 1000);
        losses++
        document.getElementById("losses").innerText = losses
        randomWord()
        
    }

}


let updateStateOfWord = (e) => {
    let letter = userGuess(e)
    let correctGuess = false

    for(let i=0; i<stateOfWord.length; i++) {
        if(word[i] == letter) {
            correctGuess = true
            stateOfWord = setCharAt(stateOfWord, i, letter);
        }
    }

    if(!correctGuess) {
        inCorrectGuesses++
        showElement(bodyInstructions[inCorrectGuesses])
        subtractGuess()
    }

    document.getElementById("wordsContainer").innerText = stateOfWord
    checkIfGameOver() 
}

window.addEventListener("keyup", updateStateOfWord);

