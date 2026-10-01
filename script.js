const wordContainer = document.querySelector(".word-container")
const guessesText = document.querySelector(".guesses-text b")
const keyboard = document.querySelector(".keyboard")
const gameModal = document.querySelector(".game-modal")
const playAgain = document.querySelector(".play-again")
const water = document.querySelector(".water")

let currentWord, correctLetters = [], wrongGuesses = 0
const maxGuesses = 5

const resetGame = () => {
    correctLetters = []
    wrongGuesses = 0
    gameModal.style.opacity = 0
    gameModal.style.pointerEvents = "none"
    guessesText.innerHTML = `${wrongGuesses} / ${maxGuesses}`
    keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false)
    wordContainer.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("")
    water.style.minHeight = "5%"
}

const getRandomWord = () => {
    const { word } = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word
    resetGame()
    wordContainer.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("")
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`
        gameModal.querySelector("h4").innerText = `${isVictory ? "Congrats!" : "Sorry"}`
        gameModal.querySelector("h3").innerText = `${isVictory ? "You survived:)" : "You drowned:("}`
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
        gameModal.style.opacity = 1
        gameModal.style.pointerEvents = "auto"
    }, 300)
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter)
                wordContainer.querySelectorAll("li")[index].innerText = letter
                wordContainer.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
    } else {
        wrongGuesses++
    }

    water.style.minHeight = wrongGuesses === 0 ? "5%" :
                            wrongGuesses === 1 ? "25%" :
                            wrongGuesses === 2 ? "40%" :
                            wrongGuesses === 3 ? "55%" :
                            wrongGuesses === 4 ? "75%" :
                            "calc(100% - 80px)"

    button.disabled = true
    guessesText.innerHTML = `${wrongGuesses} / ${maxGuesses}`

    if (wrongGuesses === maxGuesses) return gameOver(false)
    if (correctLetters.length === currentWord.length) return gameOver(true)
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i)
    keyboard.appendChild(button)

    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord()
playAgain.addEventListener("click", getRandomWord)