$(document).ready(function()
    {
        var possibleWords = ["florence", "paris", "madrid", "rome", "singapore", "dubai", "new york city", 
                            "shanghai", "london", "tokyo", "sydney", "toronto", "beijing", "moscow",
                            "johannesburg", "istanbul", "warsaw", "jakarta", "kuala lumpur", "mexico city",
                            "hong kong", "chicago", "seoul", "los angeles", "philadelphia", "mumbai"]
		const maxGuess = 10
		var pauseGame = false
		var guessedLetters = []
		var guessingWord = []
		var wordToMatch
		var numGuess
		var wins = 0

		resetGame()
		document.onkeypress = function (event) {
            if (isAlpha(event.key) && !pauseGame) {
                checkForLetter(event.key.toUpperCase())
                }
    		}

		function checkForLetter(letter) {
			var foundLetter = false
			var correctSound = document.createElement("audio") // https://www.salamisound.com/
            correctSound.setAttribute("src", "assets/images/sound.mp3")
                
        for (var i = 0, j = wordToMatch.length; i < j; i++) {
                        
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter
                foundLetter = true
                correctSound.play()

            if (guessingWord.join("") === wordToMatch) {
				wins++
    			pauseGame = true
                updateDisplay()
                setTimeout(resetGame,5000)
                    }
            	}
        	}

        if (!foundLetter) {
            
            if (!guessedLetters.includes(letter)) {
				guessedLetters.push(letter)
				numGuess--
            	    }
            if (numGuess === 0) {
				guessingWord = wordToMatch.split()
                pauseGame = true
                setTimeout(resetGame, 5000)
            		}
        	}
        		updateDisplay() }

		function isAlpha(ch) {
		    return /^[A-Z]$/i.test(ch);
			}

		function resetGame() {
			numGuess = maxGuess
			pauseGame = false
			wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase()
			console.log(wordToMatch)

			guessedLetters = []
			guessingWord = []

	for (var i = 0, j = wordToMatch.length; i < j; i++) {
		if (wordToMatch[i] === " ") {
			guessingWord.push(" ")
		}
		else {
		    guessingWord.push("_")
		}}
			updateDisplay() }

		function updateDisplay () {
			document.getElementById("totalWins").innerText = wins
			document.getElementById("currentWord").innerText = guessingWord.join("")
			document.getElementById("remainingGuesses").innerText = numGuess
			document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ")
		}
	})