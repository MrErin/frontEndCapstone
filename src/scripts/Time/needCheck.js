const dbLoad = require('../Helpers/dbLoader')
const addHistory = require('../DOM/addHistory')
const pauseTime = require('./pauseTime')
const pcNeedsSleep = require('./pcNeedsSleep')

const needCheck = (need, value, min, max) => {

	if (value <= min) {
		switch (need) {
		case 'confidence':
		    addHistory('There\'s no way I can even try to do that! I\'ll fail! (Confidence too low.)')
		    return false
		case 'energy':
			addHistory('No...I can\'t even right now. (Energy too low.)')
			pcNeedsSleep()
		    return false
		case 'hunger':
			addHistory('Dead people don\'t eat. (Hunger too low.)')
			return false
		case 'social':
			addHistory('If I can\'t talk to somebody right now I\'m going to scream. What if I scream and no one\'s around to hear it?!? (Social too low.)')
			return false
		case 'fun':
			addHistory('I would rather be doing literally anything else. (Fun too low.)')
			return false
		default:
			pauseTime(ticker)
			console.log(`Something went wrong. You passed me the ${need} need, which has a value of ${value}.`)
			break

		}
	} else if (value >= max) {
		switch (need) {
		case 'confidence':
		    addHistory('There\'s no way I can fail! I am never wrong! Google has to ask *ME* for answers! (Confidence way too high.)')
		    return false
		case 'energy':
		    addHistory('You know what I\'m thinking it would be cool if everyone walked backwards for a whole day like this you know it would be so awesome what about code no I can\'t think about code right now. (Energy too high.)')
		    return false
		case 'hunger':
			addHistory('Are you kidding me? I\'ll bust out of my fat pants! (Hunger too high.)')
			return false
		case 'social':
			addHistory('Gah won\'t you people leave me alone?! I can\'t even think right now! (Social too high.)')
			return false
		case 'fun':
			addHistory('Funfunfun...Funfunfunfunfunfun. (Fun too high.)')
			return false
		default:
			pauseTime(ticker)
			console.log(`Something went wrong. You passed me the ${need} need, which has a value of ${value}.`)
			break
		}
	} else {
		return true
	}

}

module.exports = needCheck