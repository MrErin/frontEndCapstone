const dbLoad = require('../Helpers/dbLoader')
const $ = require('jquery')
const startTime = require('../Time/startTime')
const pauseTime = require('../Time/pauseTime')
const addHistoryEffectList = require('../DOM/addHistoryEffectList')
const updateStats = require('../PlayerStats/updateStats')

//this function updates the player's stats and lets them know the results of the code block attempt
const submitCodeBlock = (complication, codeId) => {
	const db = dbLoad()
	const PC = db.Player

	if (complication === 'correct'){
		updateStats('confidence', PC.confidence, 0.5)
		updateStats('coderPoints', PC.coderPoints, 20)
		addHistoryEffectList('Confidence: + 0.5', `CodeBlock${codeId}`)
		addHistoryEffectList('Coder Points: + 20', `CodeBlock${codeId}`)

	} else if (complication === 'timid'){
		updateStats('confidence', PC.confidence, 0.5)
		updateStats('coderPoints', PC.coderPoints, 30)
		addHistoryEffectList('You were so timid! Confidence boost of: + 0.5', `CodeBlock${codeId}`)
		addHistoryEffectList('Extra credit for solving a tough problem! Coder Points: + 30', `CodeBlock${codeId}`)

	} else if (complication === 'delusional'){
		updateStats('confidence', PC.confidence, -0.5)
		updateStats('coderPoints', PC.coderPoints, 25)
		addHistoryEffectList('Your confidence was too high. You\'re a little less delusional now. Confidence: -0.5', `CodeBlock${codeId}`)
		addHistoryEffectList('Extra credit for working with too much confidence! Coder Points: + 25', `CodeBlock${codeId}`)

	} else {
		console.log(`What the frak? You passed ${complication} as the code complication from the CodeBlocks/submitCodeBlock module.`)
	}

	$('#playerInput').val('')
	$(`#HistoryCodeBlock${codeId}`).show()
	$('#modalCanvas').removeClass('is-active')
	const buildStartCodeBlockButton = require('./buildStartCodeBlockButton')
	buildStartCodeBlockButton()
	pauseTime(ticker)
	startTime()
}

module.exports = submitCodeBlock