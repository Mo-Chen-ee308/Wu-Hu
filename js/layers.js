addLayer("P1", { //º ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹
    name: "P^1",
    symbol: "P¹", 
    position: 0, 
    startData() { return {
        unlocked: false,
		points: new ExpantaNum(0),
    }},
    color: "lime",
	requires: new ExpantaNum(1),
    resource: "P¹",
	baseResource: "points",
	branches: [["P4","#CEFFCE"]],
	baseAmount() {return player.points}, 
    type: "normal", 
	exponent: 0.5,
    gainMult() { 
        mult = new ExpantaNum(1)
			if(hasUpgrade("P4",12)) mult = mult.mul(2)
        return mult
    },
    gainExp() {
		var P1exp = new ExpantaNum(1)
		 P1exp = P1exp.add(new ExpantaNum(format(getBuyableAmount("P1",11))*0.01))
		if(hasUpgrade("P2",12)) P1exp = P1exp.mul(1.4)
        return P1exp
    },
    row: 0, 
    //layerShown(){return player.points.gte(1)|| player.P1.points > 0},
	//effectDescription(){return "timeSince"},
    upgrades: {
        11: {
			title:"Get your first effect",
            description: "Double Your points",
            cost(){return new ExpantaNum(2)},
            unlocked(){return true},
            currencyDisplayName:"P¹"
        },
		12: {
			title:"Good stuff",
            description: "Based on the number of P1 add your points",
            cost(){return new ExpantaNum(8)},
            unlocked(){return hasUpgrade("P1",11)},
			effect(){
					let eff = player.P1.points.add(1).pow(0)
						eff = eff.mul(player.P1.points.pow(0.5)+1)
					return eff
				},
			  effectDisplay(){return format(upgradeEffect(this.layer,this.id))+"×"},
            currencyDisplayName:"P¹"
        },
		 13: {
			title:"Good stuff × 2",
            description: "Based on the number of points add your points",
            cost(){return new ExpantaNum(30)},
            unlocked(){return hasUpgrade("P1",12)},
			effect(){
					let eff = player.points.add(1).pow(0)
						if(player.points == 0 ) eff = eff.mul(player.points.pow(0.25)+1)
						if(player.points > 0 ) eff = eff.mul(player.points.pow(0.25))
					return eff
				},
			  effectDisplay(){return format(upgradeEffect(this.layer,this.id))+"×"},
            currencyDisplayName:"P¹"
        },
		21: {
			title:"Nothing fun",
            description: "Unlock a repeat purchase",
            cost(){return new ExpantaNum(120)},
            unlocked(){return hasUpgrade("P1",13)},
            currencyDisplayName:"P¹"
        },
		22: {
			title:"A bit pricey",
            description: "Repeat purchase 11 improved price formula",
            cost(){return new ExpantaNum(220)},
            unlocked(){return hasUpgrade("P1",21)},
            currencyDisplayName:"P¹"
        },
		23: {
			title:"Another node",
            description: "Unlock node P²",
            cost(){return new ExpantaNum(300)},
            unlocked(){return hasUpgrade("P1",22)},
            currencyDisplayName:"P¹"
        },
    },
////////////////////////////////////////////////////////////////////////////////////////////////////
	buyables: {
		11: {
			cost(x) { 
						if(!hasUpgrade("P1",22))return ((x**2)*3.5)
						if(hasUpgrade("P1",22))return ((x**2)*3)
					},
			//Exponent 1 //Buy To get an Exponent 1,each possession of an exponent 1,P¹ gain exponent increased by 0.01
			title:"Exponent one",
			display() 	{ return 	"<h3>You have " + format(getBuyableAmount(this.layer,this.id)) + "/100.00</h3><br>" + 
									"Buy To get an Exponent 1,each possession of an exponent 1" + 
									"P¹ gain exponent increased by 0.01,Cap Gain exponent 2" + 
									"<br>cost:"+format(this.cost())+" P¹<br>Current rank："+ format(getBuyableAmount(this.layer,this.id)) + 
									"<br>Current gain:" + ( 1 + getBuyableAmount(this.layer,this.id)*0.01 )
						},
			canAfford() { return (player[this.layer].points.gte(this.cost())) && (format(getBuyableAmount(this.layer,this.id))) <100},
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
				},
			effect:function(x){
						let eff = player[this.layer].points.add(1).pow(0)
						

						return eff

				},
				
			unlocked(){return hasUpgrade("P1",21)},
            style() {return {'border-color': "#ff00ff" }}
		},
		12: {
			cost(x) { 
						//if(!hasUpgrade("P1",22))return ((x**2)*3.5)
						//if(hasUpgrade("P1",22))return ((x**2)*3)
							return ((x**2)*25)
					},
			//Exponent 1 //Buy To get an Exponent 1,each possession of an exponent 1,P¹ gain exponent increased by 0.01
			title:"increment level 1",
			display() 	{ return 	"<h3>You have" + format(getBuyableAmount(this.layer,this.id)) + "/1000.00</h3><br>" + 
									"Buy To get a increment level 1,each possession of a increment level 1" + 
									"Each increment level 1 increases the number of points to times 0.001,Cap Gain times 2" + 
									"<br>cost:"+format(this.cost())+" P¹<br>Current rank："+ format(getBuyableAmount(this.layer,this.id)) + 
									"<br>Current gain:" + ( 1 + getBuyableAmount(this.layer,this.id)*0.001 )
						},
			canAfford() { return (player[this.layer].points.gte(this.cost())) && (format(getBuyableAmount(this.layer,this.id))) < 1000},
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
				},
			effect:function(x){
						let eff = player[this.layer].points.add(1).pow(0)
						

						return eff

				},
				
			unlocked(){return hasUpgrade("P2",21)},
            style() {return {'border-color': "#ff00ff" }}
		},
		13: {
			cost(x) { 
						//if(!hasUpgrade("P1",22))return ((x**2)*3.5)
						//if(hasUpgrade("P1",22))return ((x**2)*3)
							return ((x**2)*45)
					},
			//Exponent 1 //Buy To get an Exponent 1,each possession of an exponent 1,P¹ gain exponent increased by 0.01
			title:"increment level 2",
			display() 	{ return 	"<h3>You have" + format(getBuyableAmount(this.layer,this.id)) + "/1000.00</h3><br>" + 
									"Buy To get a increment level 2,each possession of a increment level 2" + 
									"Each increment level 2 increases the number of points to times 0.009,Cap Gain times 10" + 
									"<br>cost:"+format(this.cost())+" P¹<br>Current rank："+ format(getBuyableAmount(this.layer,this.id)) + 
									"<br>Current gain:" + ( 1 + (getBuyableAmount(this.layer,this.id))*0.009)
						},
			canAfford() { return (player[this.layer].points.gte(this.cost())) && (format(getBuyableAmount(this.layer,this.id))) < 1000},
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
				},
			effect:function(x){
						let eff = player[this.layer].points.add(1).pow(0)
						

						return eff

				},
				
			unlocked(){return hasUpgrade("P2",22)},
            style() {return {'border-color': "#ff00ff" }}
		},
	},

})
addLayer("P2", { //º ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹
    name: "P^2",
    symbol: "P²", 
    position: 1, 
    startData() { return {
        unlocked: false,
		points: new ExpantaNum(0),
    }},
    color: "lime",
	requires(){		if(!hasUpgrade("P2",13))	return new ExpantaNum(2)
					if(hasUpgrade("P2",13))		return new ExpantaNum(1.5)
						
					},
    resource: "P²",
	branches: [["P4","#A6FFA6"]],
	baseResource: "P¹",
	baseAmount() {return player.P1.points}, 
    type: "static", 
	exponent: 1,
    gainMult() { 
        mult = new ExpantaNum(1)
			if(hasUpgrade("P4",13)) mult = mult.mul(0.75)
        return mult
    },
    gainExp() {
		var P2exp = new ExpantaNum(1)
			P2exp = P2exp.add(new ExpantaNum(format(getBuyableAmount("P2",11))*0.05))
        return P2exp
    },
    row: 0, 
    layerShown(){return hasUpgrade("P1",23)},
	//effectDescription(){return "timeSince"},
    upgrades: {
        11: {
			title:"Dimension Blow",
            description: "Double Your points again",
            cost(){return new ExpantaNum(8)},
            unlocked(){return true},
            currencyDisplayName:"P²"
			},
		12: {
			title:"Exponential effect",
            description: "Times 1.2 your P¹ get",
            cost(){return new ExpantaNum(10)},
            unlocked(){return hasUpgrade("P2",11)},
            currencyDisplayName:"P²"
			},
		13: {
			title:"More get",
            description: "Reduce The p² base to 1.4",
            cost(){return new ExpantaNum(15)},
            unlocked(){return hasUpgrade("P2",12)},
            currencyDisplayName:"P²"
			},
		21: {
			title:"And,uh..",
            description: "Unlock another P¹ node's repeat purchase",
            cost(){return new ExpantaNum(18)},
            unlocked(){return hasUpgrade("P2",13)},
            currencyDisplayName:"P²"
			},
		22: {
			title:"Another?",
            description: "Unlock another P¹ node's repeat purchase",
            cost(){return new ExpantaNum(21)},
            unlocked(){return hasUpgrade("P2",21)},
            currencyDisplayName:"P²"
			},
		23: {
			title:"Another node again",
            description: "Unlock node P³",
            cost(){return new ExpantaNum(25)},
            unlocked(){return hasUpgrade("P2",22)},
            currencyDisplayName:"P²"
			},
		},
//////////////////////////////////////////////////////////////////////////////////////
			buyables: {
		11: {
			cost(x) { 
						//if(!hasUpgrade("P1",22))return ((x**2)*3.5)
						//if(hasUpgrade("P1",22))return ((x**2)*3)
						return((x^2)*5)
					},
			//Exponent 1 //Buy To get an Exponent 1,each possession of an exponent 1,P¹ gain exponent increased by 0.01
			title:"Exponent two",
			display() 	{ return 	"<h3>You have " + format(getBuyableAmount(this.layer,this.id)) + "/20.00</h3><br>" + 
									"Buy To get an Exponent 2,each possession of an exponent 2" + 
									"P² gain exponent increased by 0.05,Cap Gain exponent 2" + 
									"<br>cost:"+format(this.cost())+" P²<br>Current rank："+ format(getBuyableAmount(this.layer,this.id)) + 
									"<br>Current gain:" + ( 1 + getBuyableAmount(this.layer,this.id)*0.05 )
						},
			canAfford() { return (player[this.layer].points.gte(this.cost())) && (format(getBuyableAmount(this.layer,this.id))) <20},
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
				},
			effect:function(x){
						let eff = player[this.layer].points.add(1).pow(0)
						

						return eff

				},
				
			unlocked(){return hasUpgrade("P1",21)},
            style() {return {'border-color': "#ff00ff" }}
		},
		12: {
			cost(x) { 
						//if(!hasUpgrade("P1",22))return ((x**2)*3.5)
						//if(hasUpgrade("P1",22))return ((x**2)*3)
							return ((x**2)*2)
					},
			//Exponent 1 //Buy To get an Exponent 1,each possession of an exponent 1,P¹ gain exponent increased by 0.01
			title:"increment level 3",
			display() 	{ return 	"<h3>You have" + format(getBuyableAmount(this.layer,this.id)) + "/10.00</h3><br>" + 
									"Buy To get a increment level 3,each possession of a increment level 3" + 
									"Each increment level 3 increases the number of points to times 0.09,Cap Gain times 2" + 
									"<br>cost:"+format(this.cost())+" P¹<br>Current rank："+ format(getBuyableAmount(this.layer,this.id)) + 
									"<br>Current gain:" + ( 1 + getBuyableAmount(this.layer,this.id)*0.09 )
						},
			canAfford() { return (player[this.layer].points.gte(this.cost())) && (format(getBuyableAmount(this.layer,this.id))) < 10},
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
				},
			effect:function(x){
						let eff = player[this.layer].points.add(1).pow(0)
						

						return eff

				},
				
			unlocked(){return hasUpgrade("P3",12)},
            style() {return {'border-color': "#ff00ff" }}
		},
	
		13: {
			cost(x) { 
						//if(!hasUpgrade("P1",22))return ((x**2)*3.5)
						//if(hasUpgrade("P1",22))return ((x**2)*3)
							return ((x**2)*2.2)
					},
			//Exponent 1 //Buy To get an Exponent 1,each possession of an exponent 1,P¹ gain exponent increased by 0.01
			title:"increment level 4",
			display() 	{ return 	"<h3>You have" + format(getBuyableAmount(this.layer,this.id)) + "/10.00</h3><br>" + 
									"Buy To get a increment level 4,each possession of a increment level 4" + 
									"Each increment level 4 increases the number of points to times 0.9,Cap Gain times 10" + 
									"<br>cost:"+format(this.cost())+" P¹<br>Current rank："+ format(getBuyableAmount(this.layer,this.id)) + 
									"<br>Current gain:" + ( 1 + (getBuyableAmount(this.layer,this.id))*0.9)
						},
			canAfford() { return (player[this.layer].points.gte(this.cost())) && (format(getBuyableAmount(this.layer,this.id))) < 10},
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
				},
			effect:function(x){
						let eff = player[this.layer].points.add(1).pow(0)
						

						return eff

				},
				
			unlocked(){return hasUpgrade("P3",13)},
            style() {return {'border-color': "#ff00ff" }}
		},
		
	},

})
addLayer("P3", { //º ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹
    name: "P^3",
    symbol: "P³", 
    position: 2, 
    startData() { return {
        unlocked: false,
		points: new ExpantaNum(0),
    }},
    color: "lime",
	requires(){		//if(!hasUpgrade("P2",13))	return new ExpantaNum(2)
					//if(hasUpgrade("P2",13))		return new ExpantaNum(1.5)
						return 1
					},
    resource: "P³",
	branches: [["P4","#79FF79"]],
	baseResource: "P²",
	baseAmount() {return player.P2.points}, 
    type: "static", 
	exponent: 1,
    gainMult() { 
        mult = new ExpantaNum(2)
        return mult
    },
    gainExp() {
		var P3exp = new ExpantaNum(1)
			P3exp = P3exp.add(new ExpantaNum(format(getBuyableAmount("P3",11))*0.15))
        return P3exp
    },
    row: 0, 
    layerShown(){return hasUpgrade("P2",23)},
	//effectDescription(){return "timeSince"},
    upgrades: {
        11: {
			title:"The third up",
            description: "Double Your points again and again",
            cost(){return new ExpantaNum(3)},
            unlocked(){return true},
            currencyDisplayName:"P³"
			},
		12: {
			title:"Again",
            description: "Unlock two P²'s repeatable purchases",
            cost(){return new ExpantaNum(4)},
            unlocked(){return hasUpgrade("P3",11)},
            currencyDisplayName:"P³"
			},
		13: {
			title:"Again and agian",
            description: "Unlock another repeatable purchase",
            cost(){return new ExpantaNum(5)},
            unlocked(){return hasUpgrade("P3",12)},
            currencyDisplayName:"P³"
			},
		21: {
			title:"Again and agian and again ······",
            description: "Unlock a P³'s repeatable purchases",
            cost(){return new ExpantaNum(6)},
            unlocked(){return hasUpgrade("P3",13)},
            currencyDisplayName:"P³"
			},
		22: {
			title:"IT' TOO SLOW！",
            description: "Softcap limit effect reduced<br>(pow0.01→pow0.2)<br>(1e8 → 1e9)",
            cost(){return new ExpantaNum(10)},
            unlocked(){return hasUpgrade("P3",21)},
            currencyDisplayName:"P³"
			},
		23: {
			title:"QUATERNION",
            description: "Unlock node P⁴",
            cost(){return new ExpantaNum(12)},
            unlocked(){return hasUpgrade("P3",22)},
            currencyDisplayName:"P³"
			},
		},
///////////////////////////////////////////////////////////////////////////////////////////////////
buyables: {
		11: {
			cost(x) { 
						return((x^2)*1.25)
					},
			//Exponent 1 //Buy To get an Exponent 1,each possession of an exponent 1,P¹ gain exponent increased by 0.01
			title:"Exponent three",
			display() 	{ return 	"<h3>You have " + format(getBuyableAmount(this.layer,this.id)) + "/20.00</h3><br>" + 
									"Buy To get an Exponent 3,each possession of an exponent 3" + 
									"P² gain exponent increased by 0.15,Cap Gain exponent 4" + 
									"<br>cost:"+format(this.cost())+" P³<br>Current rank："+ format(getBuyableAmount(this.layer,this.id)) + 
									"<br>Current gain:" + ( 1 + getBuyableAmount(this.layer,this.id)*0.15 )
						},
			canAfford() { return (player[this.layer].points.gte(this.cost())) && (format(getBuyableAmount(this.layer,this.id))) < 20},
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
				},
			effect:function(x){
						let eff = player[this.layer].points.add(1).pow(0)
						

						return eff

				},
				
			unlocked(){return hasUpgrade("P1",21)},
            style() {return {'border-color': "#ff00ff" }}
		},
},
})
addLayer("P4", { //º ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹
    name: "P^4",
    symbol: "P⁴", 
    position: 1, 
    startData() { return {
        unlocked: false,
		points: new ExpantaNum(0),
    }},
    color: "lime",
	requires(){ if(!hasUpgrade("P4",21)) return new ExpantaNum(13)
				if(hasUpgrade("P4",22)) return new ExpantaNum(10)
	},
	//branches: [["P1","P2","P3","#CEFFCE"]],
    resource: "P⁴",
	baseResource: "P³",
	baseAmount() {return player.P3.points}, 
    type: "normal", 
	exponent: 0.5,
    gainMult() { 
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
		var P4exp = new ExpantaNum(1)
			
        return P4exp
    },
    row: 1, 
    layerShown(){return hasUpgrade("P3",23)|| player.P4.points > 0},
	//effectDescription(){return "timeSince"},
	update(){
        if(!hasUpgrade("P4",21))player.P4P.points = player.P4P.points.add(player.P4.points)
		if(hasUpgrade("P4",21))	player.P4P.points = player.P4P.points.add(player.P4.points**2)
			}, 
/////////////////////////////////////////////////////////////////////////////////////////
		upgrades: {
			11: {
				title:"TAKE OFF",
				description: "Point Acquisition Index. If than 1 multiply by two",
				canAfford() {return player.P4P.points.gte(5000)},
				cost(){return new ExpantaNum(5000)},
				pay(){player.P4P.points = player.P4P.points.add(-5000)},
				unlocked(){return true},
				currencyDisplayName:"P⁴ Points"
				},
			12: {
				title:"Again",
				description: "Double The p¹ point gain",
				canAfford() {return player.P4P.points.gte(10000)},
				cost(){return new ExpantaNum(10000)},
				pay(){player.P4P.points = player.P4P.points.add(-10000)},
				unlocked(){return hasUpgrade("P4",11)},
				currencyDisplayName:"P⁴ Points"
				},
			13: {
				title:"Again and Again",
				description: "P² gets times 1.25",
				canAfford() {return player.P4P.points.gte(15000)},
				cost(){return new ExpantaNum(15000)},
				pay(){player.P4P.points = player.P4P.points.add(-15000)},
				unlocked(){return hasUpgrade("P4",12)},
				currencyDisplayName:"P⁴ Points"
				},
			21: {
				title:"More",
				description: "Get P⁴Points Quadratic power",
				canAfford() {return player.P4P.points.gte(20000)},
				cost(){return new ExpantaNum(20000)},
				pay(){player.P4P.points = player.P4P.points.add(-20000)},
				unlocked(){return hasUpgrade("P4",13)},
				currencyDisplayName:"P⁴ Points"
				},
			22: {
				title:"More And More",
				description: "Get P⁴ Base Number 10",
				canAfford() {return player.P4P.points.gte(25000)},
				cost(){return new ExpantaNum(25000)},
				pay(){player.P4P.points = player.P4P.points.add(-25000)},
				unlocked(){return hasUpgrade("P4",21)},
				currencyDisplayName:"P⁴ Points"
				},
			},
/////////////////////////////////////////////////////////////////////////////////////////
tabFormat: {
        "Main interface": {
            //buttonStyle() {return  {'color': 'orange'}},
            //shouldNotify: true,
            content:
                [
            "main-display",
            "prestige-button", "resource-display",
            ["blank", "5px"], 
            ["text-input", "thingy"],
            ["display-text",
                function() {
					if(!hasUpgrade("P4",21)){
							return "You have " + (player.P4.points)  + " P⁴" +
									"<br>Generates " + (player.P4.points)*2 + " (P⁴ Points/sec)" + 
									"    You have " + (player.P4P.points) + " (P⁴ Points)"
						}
					if(hasUpgrade("P4",21)){
							return "You have " + (player.P4.points)  + " P⁴" +
									"<br>Generates " + ((player.P4.points)*2)**2 + " (P⁴ Points/sec)" + 
									"    You have " + (player.P4P.points) + " (P⁴ Points)"
						}
									
									}],
                "h-line", "milestones", "blank", "upgrades", "challenges","buyables",
            //['bar','bigBar'],
            //["display-text",function(){return  "1"}]
            ],
   
        },
		"P⁴ Points interface ": {
            //buttonStyle() {return  {'color': 'orange'}},
            //shouldNotify: true,
            content:
                [
            
            ["blank", "5px"], 
            ["text-input", "thingy"],
            ["display-text",
                function() {
					if(!hasUpgrade("P4",21)){
							return "You have  <span style='color: lime ; font-size: 25px;'>"+ player.P4.points +"</span>"+" P⁴" +
									"<br>Generates <span style='color: green ; font-size: 25px;'>" + 
									(player.P4.points)*2 + "</span>" +" (P⁴ Points/sec)" + 
									"    You have <span style='color: green ; font-size: 20px;'>" + 
									(player.P4P.points) + "</span>" +" (P⁴ Points)"
					}
					if(hasUpgrade("P4",21)){
							return "You have  <span style='color: lime ; font-size: 25px;'>"+ player.P4.points +"</span>"+" P⁴" +
									"<br>Generates <span style='color: green ; font-size: 25px;'>" + 
									((player.P4.points)*2)**2 + "</span>" +" (P⁴ Points/sec)" + 
									"    You have <span style='color: green ; font-size: 20px;'>" + 
									(player.P4P.points) + "</span>" +" (P⁴ Points)"
					}
									}],
                "h-line", "milestones", "blank", "upgrades", "challenges","buyables",
            //['bar','bigBar'],
            //["display-text",function(){return  "1"}]
            ],
   
        },
    }

})
addLayer("P4P", { //º ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹  P4生产的点数
    name: "P^4",
    symbol: "P⁴", 
    position: 1, 
    startData() { return {
        unlocked: false,
		points: new ExpantaNum(0),
    }},
    color: "lime",
	requires: new ExpantaNum(13),
	//branches: [["P1","P2","P3","#CEFFCE"]],
    resource: "P⁴",
	baseResource: "P³",
	baseAmount() {return player.P3.points}, 
    type: "normal", 
	exponent: 0.5,
    gainMult() { 
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
		var P4exp = new ExpantaNum(1)
			//P3exp = P3exp.add(new ExpantaNum(format(getBuyableAmount("P3",11))*0.1))
        return P4exp
    },
    row: 1, 
    layerShown(){return hasUpgrade("P3",00)},
	//effectDescription(){return "timeSince"},

})