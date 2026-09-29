const wordContainer = document.querySelector(".word-container")
const guessesText = document.querySelector(".guesses-text")
const keyboard = document.querySelector(".keyboard")
const gameModal = document.querySelector(".game-modal")
const playAgain = document.querySelector(".play-again")
const water = document.querySelector(".water")
const maxGuesses = 5

let currentWord, correctLetters = [], wrongGuesses = 0

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