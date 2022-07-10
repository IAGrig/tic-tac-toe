const game = document.getElementsByClassName("game")
const label = document.querySelector("label")
const field = document.getElementsByClassName("field").item(0)
const cells = field.children
const newGameButton = document.getElementById("new-game-button")
const resetButton = document.getElementById("reset-button")
var sign = "X"
var ended = false
var xWins = localStorage.getItem("xWins") ? localStorage.getItem("xWins") : 0
var oWins = localStorage.getItem("oWins") ? localStorage.getItem("oWins") : 0

function getSigns() {
	arr = []
	for (cell of cells) {
		if (cell.innerText) {
			arr.push(cell.innerText)
		} else {
			arr.push(null)
		}
	}
	return arr
}

function checkWin() {
	let checkArr = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[6, 4, 2],
	]
	table = getSigns()
	for (check of checkArr) {
		if (
			!ended &&
			table[check[0]] &&
			table[check[0]] == table[check[1]] &&
			table[check[1]] == table[check[2]]
		) {
			table[check[0]] == "X" ? xWins++ : oWins++
			localStorage.setItem("xWins", xWins)
			localStorage.setItem("oWins", oWins)
			for (index of check) {
				cells[index].style.color = "green"
				cells[index].style.fontWeight = "bold"
				ended = true
			}
		}
	}
}

function fillSign(event) {
	if (!event.target.innerText && !ended) {
		event.target.innerText = sign
		sign = sign == "X" ? "O" : "X"
	}
}

function updateLabel() {
	if (!ended) {
		label.innerText = `Score: (X)${xWins}:${oWins}(O). Turn of ${sign}`
	} else {
		label.innerText = `Score: (X)${xWins}:${oWins}(O).`
	}
}

function startGame() {
	for (cell of cells) {
		cell.innerText = ""
		cell.style.color = ""
		cell.style.fontWeight = ""
	}
	ended = false
	updateLabel()
}

function resetScore() {
	;(xWins = 0), (oWins = 0)
	localStorage.setItem("xWins", xWins)
	localStorage.setItem("oWins", oWins)
	updateLabel()
}

for (cell of cells) {
	cell.addEventListener("click", fillSign)
}
field.addEventListener("click", checkWin)
field.addEventListener("click", updateLabel)
newGameButton.addEventListener("click", startGame)
resetButton.addEventListener("click", resetScore)
label.innerText = `Score: (X)${xWins}:${oWins}(O). Turn of ${sign}`
