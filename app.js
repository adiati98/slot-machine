document.addEventListener('DOMContentLoaded', () => {
const slot = document.querySelectorAll('.slot');
const slot1 = document.querySelector('#slot1');
const slot2 = document.querySelector('#slot2');
const slot3 = document.querySelector('#slot3');
const message = document.querySelector('#message');
const submitBtn = document.querySelector('#btn');

const spinSound = new Audio('spin.wav')
const failedSound = new Audio('failed.mp3')
const winSound = new Audio(
	'https://www.shockwave-sound.com/sound-effects/slot-machine-sounds/slot_payoff.wav'
);


class Init {
	static randomNum() {
		return Math.floor(Math.random() * 9) + 1;
  }

  clearAll() {
    slot1.innerHTML = '';
		slot2.innerHTML = '';
		slot3.innerHTML = '';
		message.innerHTML = '';
  }
}

const newGame = new Init();

const reset = () => {
	if (slot.innerHTML !== '') {
		submitBtn.addEventListener('click', () => {
			failedSound.load()
			winSound.load()
			newGame.clearAll()
			message.classList.add('hidden')
			message.classList.remove('display');
		});
	}
};

// on click
submitBtn.addEventListener('click', () => {

	let firstNum = Init.randomNum();
	let secondNum = Init.randomNum();
	let thirdNum = Init.randomNum();

	setTimeout(() => {
		submitBtn.style.visibility = 'hidden';
		setTimeout(() => {
			spinSound.play()
			slot1.innerHTML = `${firstNum}`;
			setTimeout(() => {
				slot2.innerHTML = `${secondNum}`;
				setTimeout(() => {
					slot3.innerHTML = `${thirdNum}`;

					if (firstNum === secondNum && secondNum === thirdNum) {
						winSound.play()
            submitBtn.style.visibility = 'visible';
						submitBtn.innerHTML = 'Play Again?';
						message.innerHTML = 'YES!!! YOU WIN!';
						message.classList.add('display');
						message.classList.remove('hidden');
						reset();
					} else {
						submitBtn.innerHTML = 'Try Again';
						setTimeout(() => {
							failedSound.play();
							message.innerHTML = 'Sorry, no luck yet!';
							message.classList.add('display');
							message.classList.remove('hidden');
							submitBtn.style.visibility = 'visible';
						}, 500);
						reset();
					}
				}, 500);
			}, 500);
		}, 500);
	}, 0);
});
})
