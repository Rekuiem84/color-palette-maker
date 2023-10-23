function generateColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	const rgbColor = `${r}, ${g}, ${b}`;
	return rgbColor;
}

function rgbToHex(rgb) {
	let color = rgb.split(",");
	// see https://github.com/Rekuiem84/random-color-generator/blob/main/script.js for explanation
	const r = parseInt(color[0]).toString(16).padStart(2, "0");
	const g = parseInt(color[1]).toString(16).padStart(2, "0");
	const b = parseInt(color[2]).toString(16).padStart(2, "0");
	color = `${r}${g}${b}`;
	return color;
}

const paletteCont = document.querySelector(".palette__container");
const saveButton = document.querySelector(".nav__action.save");

function generateRandomPalette(numberOfColors) {
	for (let i = 0; i < numberOfColors; i++) {
		const color = generateColor();
		const colorBox = document.createElement("div");
		const colorBoxHEXText = document.createElement("input");
		const copyColorButton = document.createElement("i");
		// colorBoxHEXText.setAttribute("type", "color");
		colorBox.style.backgroundColor = `rgb(${color})`;
		colorBox.classList.add("palette__color-box");
		colorBoxHEXText.value = `#${rgbToHex(color)}`;
		copyColorButton.classList.add("fa-regular", "fa-clone");
		//
		colorBox.appendChild(copyColorButton);
		colorBox.appendChild(colorBoxHEXText);
		paletteCont.appendChild(colorBox);
		// change background color when hex value is changed and adds # if missing
		colorBoxHEXText.addEventListener("input", () => {
			colorBox.style.backgroundColor =
				colorBoxHEXText.value.charAt(0) === "#"
					? colorBoxHEXText.value
					: `#${colorBoxHEXText.value}`;
		});
		// copy hex value to clipboard when box is clicked
		copyColorButton.addEventListener("click", () => {
			navigator.clipboard.writeText(colorBoxHEXText.value);
		});
	}
}

function clearAndGenerate() {
	paletteCont.innerHTML = "";
	generateRandomPalette(5);
}

document.addEventListener("keydown", (e) => {
	if (e.key === " " && e.target === document.body) {
		clearAndGenerate();
	}
});

generateRandomPalette(5);
