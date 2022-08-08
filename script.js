console.log("The file is loading...");
/* Find classes or IDs */
let clue1 = document.querySelector(".clue-1");
let button = document.querySelector("#button");
let clue2 = document.querySelector("#clue-2");

let page = document.querySelector(".hero");
let body = document.querySelector("#main-body");
let clutter = document.querySelector(".default");
let wrong = document.querySelector("#wrongLetters");
let hangmanBody = document.querySelector(".hangman");
let end = document.querySelector(".endGame");
let win = document.querySelector(".winGame");
let rletters = document.querySelector("#rightLetters");
let right1 = document.querySelector("#letter1");
let right2 = document.querySelector("#letter2");
let right3 = document.querySelector("#letter3");
let right4 = document.querySelector("#letter4");
let right5 = document.querySelector("#letter5");
let correctAnswer = document.querySelector(".correctAnswer");

let right = [right1,right2,right3,right4,right5];

let guessCount = document.querySelector("#guesses");
let guesses = 10; // amount of guesses

let words = ["adult","basis","beach","court","depth","focus","metal","money","spite","sugar",
						 "table","unity","admit","share","paint","plain","farts","dough","vital","whole",
						 "wrong","until","sleep","tread","teach","fuzzy","pizza","their","lunch","sharp",
						 "shine","eight","elite","extra","fable","habit","robot","gamer","words","rabit",
						 "color","asset","giant","equal","grass","house","layer","twice","later","youth"]

// RANDOMIZING WORD
// let wordNum;
// let randomWord = [];
// let rwordArray = [];


// randomizing word from array
// if(hangmanBody.classList !== "hidden"){}
let wordNum = Math.floor(Math.random() * 50);
let randomWord = words[wordNum];
// splitting word into array
let rwordArray = randomWord.split("");
console.log(rwordArray);
// setting new array equal to word array


/* Button for the key - Already done! */
button.addEventListener("click", (e) => {
	button.classList.add("hidden");
	clue2.classList.remove("hidden");
});

/* checking for passwords */
const keysPressed = []; // array for collection key presses
let secretCode = "what"; // variable for secret code
const secretPin = "404";
//const word = ["c", "l", "u", "b", "s"];
let word = rwordArray;
let wrongPresses = [];
let rightPresses = [];
let gotPass = false;	// bool to check for password
let gotPin = false; // bool to check if pin is found	

window.addEventListener('keypress', (e) => {
	console.log(e.key); // e is an event object

	// checking for "what" password
	// track every key that is entered
	keysPressed.push(e.key);
	let attemptedSecret = keysPressed.slice(-secretCode.length).join("");
	console.log(attemptedSecret);

	// CHECKING FIRST PASSWORD ("what")
	if (attemptedSecret === secretCode) {
		console.log("You got the secret key!");
		gotPass = true;

		// show the hidden key button
		button.classList.remove("hidden");
		clue1.classList.add("hidden");
		clutter.classList.add("hidden");
	}

	const attemptedPin = keysPressed.slice(-secretPin.length).join(""); // checking for 732 pin
	let attemptedPassword = keysPressed.slice(-1).join(""); // 

	let match = false;	// bool to find matching letter
	let repeat = false;		// using to find repeated letters

	if (gotPin === true && gotPass === true) {
		// loop to check for password matches -- criteria for entering array
		for (character of attemptedPassword) { // is attempted password something you can run through? (array?)
			for (i = 0; i < word.length; i++) {
				if (character === word[i]) {// for loop of word)		
					match = true;
				}
			}
		}
		// loop to check for repeated letters
		for (error of wrongPresses) {// run through entire previous attempts inside of arrays
			if (attemptedPassword === error) {	// have to check this for all errors, not just the first one...
				repeat = true;
				//break;
			}
		}
		for (correct of rightPresses) {
			if (attemptedPassword === correct) {
				repeat = true;
				//break;
			}
		}
		
		// conditional to print to correct array
		if (match === true && repeat === false) {
			rightPresses.push(attemptedPassword);
			console.log("correct guesses: " + rightPresses);
			// trying to replace blanks with correct letter (RIGHT-PLACE LOOP)
			for (correct of rightPresses) {
				for (let i = 0; i < word.length; i++) {
					if (correct === word[i]) {
						console.log(`right belongs in place ${i}`);
						// how to place in a specific location in inner HTML
						right[i].innerHTML = `${correct}`;
					}
				}
			}
			
			// GAME IS WON
			// 1=2,1=3,2=3
			// save first letter, run through, increment
			let filled = 0;
			
			for(let i = 0; i < word.length; i++) {
				if(right[i].innerHTML != "<p>_&nbsp;</p>") {
					filled += 1;
				}
			}
			if(filled === 5) {
				//if (word.length === rightPresses.length) { 
				// need to account for words that have two of the same letters somehow
					hangmanBody.classList.add("hidden");
					win.classList.remove("hidden");
					page.classList.remove("has-background-black");
					page.classList.add("has-background-success-light");
					
					let playButtonW = document.querySelector("#playButtonW");
					
					// RESET GAME BUTTON
					playButtonW.addEventListener("click", (e) => {
						// resetting word
						wordNum = Math.floor(Math.random() * 50);
						randomWord = words[wordNum];
					  rwordArray = randomWord.split("");
						console.log(rwordArray);
						word = rwordArray;
						// resetting all guesses
						guesses = 10;
						rightPresses = [];
						wrongPresses = [];
						console.log(hangmanBody);
						// resetting HTML
						page.classList.remove("has-background-success-light");
						page.classList.add("has-background-black");
						guessCount.innerHTML = `You have <b>${guesses}</b> guesses remaining.`;
						for(i = 0; i < right.length; i++) {
							right[i].innerHTML = "<p>_&nbsp;</p>"; // somehow doing this outside the div??
						}
						wrong.innerHTML = "Letters you've guessed:";
						// removing end and showing hangman
						win.classList.add("hidden");
						hangmanBody.classList.remove("hidden");
					});
				}

		} else if (match === false && repeat === false) {
			wrongPresses.push(attemptedPassword);
			console.log("incorrect guesses: " + wrongPresses);
			wrong.innerHTML += `${attemptedPassword}, `;
			guessCount.innerHTML = `You have <b>${guesses = guesses - 1}</b> guesses remaining.`;

			// conditional to end game / start over
			if (guesses === 0) {
				hangmanBody.classList.add("hidden");
				end.classList.remove("hidden");
				page.classList.remove("has-background-black");
				page.classList.add("has-background-danger-light");
				correctAnswer.innerHTML = `The correct answer was: ${randomWord}`;
				
				let playButton = document.querySelector("#playButton");

				// RESET GAME BUTTON
				playButton.addEventListener("click", (e) => {
					// resetting word
					wordNum = Math.floor(Math.random() * 50);
					randomWord = words[wordNum];
				  rwordArray = randomWord.split("");
					console.log(rwordArray);
					word = rwordArray;
					// resetting all guesses
					guesses = 10;
					rightPresses = [];
					wrongPresses = [];
					console.log(hangmanBody);
					// resetting HTML
					page.classList.remove("has-background-danger-light");
					page.classList.add("has-background-black");
					guessCount.innerHTML = `You have <b>${guesses}</b> guesses remaining.`;
					for(i = 0; i < right.length; i++) {
						right[i].innerHTML = "<p>_&nbsp;</p>"; // somehow doing this outside the div??
					}
					wrong.innerHTML = "Letters you've guessed:&nbsp;";
					// removing end and showing hangman
					end.classList.add("hidden");
					hangmanBody.classList.remove("hidden");
				});
			}
		}

		
	}

	//-----------------done-----------------------------------
	if (attemptedPin === secretPin && gotPass === true) {
		console.log("You got the secret pin!");
		gotPin = true;
		// make the entire page white
		//page.classList.remove("has-background-black");
		// clear the entire page
		// body.innerHTML = "";
		clutter.classList.add("hidden");
		clue2.classList.add("hidden");
		// show a meme in the center of the page
		// body.innerHTML =
		// '<figure class="image center"><img id="main" src="http://zacharytotah.com/wp-content/uploads/2017/09/DiCaprio-Welcome-to-the-Club-Meme.jpg" alt="Welcome to the Club"></figure>';
		// display hangman
		hangmanBody.classList.remove("hidden");
	}

});

// Current Problems: 
// - spacing is a little weird sometimes on incorrect letters line
// SMH: needs to clean up a lot; figure out how to reset word without repeating the code


// side problem, but not really it:
// double = false;

// // check for duplicate character
// for (j = 0; j < word.length; j++) {
// 	for(i = 0+j; i < word.length; i++) {
// 		if(char = word[j]) {
// 			double = true;				
// 		}
// 	}
// }
