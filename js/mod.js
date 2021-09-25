let modInfo = {
	name: "The P^P Tree",
	id: "2021 9 21",
	author: "陌尘(MoChen)",
	pointsName: "points",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.5",
	name: "",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- P¹ P² P³ P⁴ node added.<br>
		- P¹ add 2*3 upgrades.<br>
		- P² added 2*3 upgrades.<br>
		- P¹ added 3 duplicate purchases.<br>
		- P3 added 2*3 upgrades.<br>
		- P² added 3 duplicate purchases.<br>
		- P⁴ node has added 1*3+2*2 upgrades.<br>
		- P³ added 1 duplicate purchase item.<br>
	<h3>v0.1.5</h3><br>
		- Add P⁴ node 3*3 upgrade.<br>
		- Optimize P⁴Points acquisition.<br>
		- Add P⁴ node milestone.<br>
		- Add P⁵ node 3*3 upgrade.<br>
		- Add P⁶ node frame.<br>
		- Add P¹ upgrade 4*1+1*4.<br>





`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new ExpantaNum(0)
		
	//let gain = new ExpantaNum(1)
	let eff = new ExpantaNum(0.1)//.pow(0)
	
	
	if(hasUpgrade("P1",11)) eff = eff.mul(2)
	if(hasUpgrade("P1",12)) eff = eff.mul((player.P1.points.pow(0.5).add(1)))
	if(hasUpgrade("P1",13) && player.points == 0 ) eff = eff.mul(player.points.pow(0.25)+1)
	if(hasUpgrade("P1",13) && player.points > 0 ) eff = eff.mul(player.points.pow(0.25))
	if(hasUpgrade("P2",11)) eff = eff.mul(2)
	if(format(getBuyableAmount("P1",12)) > 0) eff = eff.mul(format(getBuyableAmount("P1",12))*0.001+1)
	if(format(getBuyableAmount("P1",13)) > 0) eff = eff.mul(format(getBuyableAmount("P1",13))*0.009+1)
	if(hasUpgrade("P3",11)) eff = eff.mul(2)
	if(format(getBuyableAmount("P2",12)) > 0) eff = eff.mul(format(getBuyableAmount("P2",12))*0.09+1)
	if(format(getBuyableAmount("P2",13)) > 0) eff = eff.mul(format(getBuyableAmount("P2",13))*0.9+1)
	if(hasUpgrade("P4",11) && (eff > 1)) eff = eff.pow(2)
	if(hasUpgrade("P4",11) && !(eff > 1)) eff = eff.mul(2)
	if(hasUpgrade("P4",23)) eff = eff.mul(player.P4P.points.pow(0.2)+1)
	if(hasUpgrade("P4",32)) eff = eff.pow(1.5)
	if(hasUpgrade("P5",13)) eff = eff.pow(1.5)
		
	
	
	
			if(!hasUpgrade("P3",22))eff = softcap(eff,new ExpantaNum(1e8),0.01)
			if(hasUpgrade("P3",22))eff = softcap(eff,new ExpantaNum(1e9),0.2)
	
	return eff
	//return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	//timeSinceLastReset: 0,
	
}}

// Display extra things at the top of the page
var displayThings = [
		
		function(){return"Current version endgame about 1e85 points"},
		//function(){return"v0.1"},
		function(){return"author 陌尘(MoChen) QQ3168704134(2021.9.1 Back to school)"},

		//function(){return"距离上次重置已过" + formatTime(player.timeSinceLastReset) + ""},
		
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}