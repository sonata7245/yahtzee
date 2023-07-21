import React, { Component } from 'react'
import Die from './Die'
import ScoreCard from './ScoreCard'
import {rollDie, calcScore} from './helpers'
import './Board.css'


class Board extends Component{
    constructor(props){
        super(props);
        this.state = ({
            Dice: [
                {id: "die1", value: 1, locked: false, rolling: false},
                {id: "die2", value: 2, locked: false, rolling: false},
                {id: "die3", value: 3, locked: false, rolling: false},
                {id: "die4", value: 4, locked: false, rolling: false},
                {id: "die5", value: 5, locked: false, rolling: false}
            ],
            Roll: 0,
            Round: 1,
            currRolling: false,
            //Score card has a descriptor, three sets of scores (1 for each round), and a section choice
            ScoreCards: [
                {id: 1, description: "Ones", score:[null,null,null], section:"Upper" },
                {id: 2, description: "Twos", score:[null,null,null], section:"Upper"  },
                {id: 3, description: "Threes", score:[null,null,null], section:"Upper"  },
                {id: 4, description: "Fours", score:[null,null,null], section:"Upper"  },
                {id: 5, description: "Fives", score:[null,null,null], section:"Upper"  },
                {id: 6, description: "Sixes", score:[null,null,null], section:"Upper"  },
                {description: "Bonus", score:[null, null, null], id: "20", section:"Upper"},
                {id: 7, description: "3 of a Kind", score:[null,null,null], section:"Lower"  },
                {id: 8, description: "4 of a Kind", score:[null,null,null], section:"Lower"  },
                {id: 9, description: "Full House", score:[null,null,null], section:"Lower"  },
                {id: 10, description: "Small Straight", score:[null,null,null], section:"Lower"  },
                {id: 11, description: "Large Straight", score:[null,null,null], section:"Lower"  },
                {id: 12, description: "Yahtzee!", score:[null,null,null], section:"Lower"  },
                // {id: 13, description: "Yahtzee Bonus!", score:[[],[],[]], section:"Lower"  },

            ],
            upperScore: [0, 0, 0],
            lowerScore: [0, 0, 0]

    })
        this.lockDie = this.lockDie.bind(this)
        this.rollDice = this.rollDice.bind(this)
        this.recordScore = this.recordScore.bind(this)
        this.checkBonus = this.checkBonus.bind(this)
        this.reset = this.reset.bind(this)
        this.nextRound = this.nextRound.bind(this)
    }


    reset(){
        this.setState( {Dice: [
            {id: "die1", value: 1, locked: false, rolling: false},
            {id: "die2", value: 2, locked: false, rolling: false},
            {id: "die3", value: 3, locked: false, rolling: false},
            {id: "die4", value: 4, locked: false, rolling: false},
            {id: "die5", value: 5, locked: false, rolling: false}
        ],
        Roll: 0,
        Round: 1,
        currRolling: false,
        //Score card has a descriptor, three sets of scores (1 for each round), and a section choice
        ScoreCards: [
            {id: 1, description: "Ones", score:[null,null,null], section:"Upper" },
            {id: 2, description: "Twos", score:[null,null,null], section:"Upper"  },
            {id: 3, description: "Threes", score:[null,null,null], section:"Upper"  },
            {id: 4, description: "Fours", score:[null,null,null], section:"Upper"  },
            {id: 5, description: "Fives", score:[null,null,null], section:"Upper"  },
            {id: 6, description: "Sixes", score:[null,null,null], section:"Upper"  },
            {description: "Bonus", score:[null, null, null], id: "20", section:"Upper"},
            {id: 7, description: "3 of a Kind", score:[null,null,null], section:"Lower"  },
            {id: 8, description: "4 of a Kind", score:[null,null,null], section:"Lower"  },
            {id: 9, description: "Full House", score:[null,null,null], section:"Lower"  },
            {id: 10, description: "Small Straight", score:[null,null,null], section:"Lower"  },
            {id: 11, description: "Large Straight", score:[null,null,null], section:"Lower"  },
            {id: 12, description: "Yahtzee!", score:[null,null,null], section:"Lower"  },
            // {id: 13, description: "Yahtzee Bonus!", score:[[],[],[]], section:"Lower"  },

        ],
        upperScore: [0, 0, 0],
        lowerScore: [0, 0, 0]

        })
    }

    nextRound(){
        if(this.state.Round < 3){
        this.setState({Round: this.state.Round +1})
    }else{
        this.reset()
    }
    }

    //when selected set die to locked = true
    lockDie(id){
        if(this.state.Roll > 0){
         const updatedDice = this.state.Dice.map((die) => {    
            if (die.id === id){
                 return {...die, locked: !die.locked }

            }
            return die
        })
        this.setState({Dice: updatedDice})
    }
    }

    //when roll button clicked roll only unlocked dice, add 1 to counter
    rollDice() {
        //roll unlocked dice, set new values, add shake class
        const rolledDice = this.state.Dice.map((die) => {    
            if (die.locked === false){
                 return {...die, value: rollDie(), rolling: true }
            }
            return die
        })
        this.setState({Dice: rolledDice, currRolling: true})

        //wait 1 sec for animation, and display new rolls
        setTimeout(() => {this.setState({ Dice: rolledDice.map(die => {
            return {...die, rolling: false}
        }),currRolling: false})},1000)

        //increment roll (max 3 rolls)
        this.setState((st) => ({Roll: st.Roll +1}) )
        
    }

    checkBonus(){
        console.log("checkingBonus")
        //get scores from upper boxes
        const upperValues = this.state.ScoreCards.map(card => {
            if (card.section === "Upper" && card.description !== "Bonus"){
            return card.score[this.state.Round -1]
        } else{
            return 0}
        })
        //add scores from upper box and check if score is 63 or higher, if yes update bonus score to 35
        let initialValue = 0
        if(upperValues.reduce((accumulator, currentValue) => accumulator + currentValue,
        initialValue) >= 63){
            const updatedScoreCards = this.state.ScoreCards.map((card) => {    
                if (card.description === "Bonus"){
                    let scoreArray = card.score
                    scoreArray[this.state.Round -1] = 35
                    return {...card, score: scoreArray}
                }
                return card
            })
        this.setState({ScoreCards: updatedScoreCards})
        }   
    }

    updateTotals(){
        // get scores from each section
        const upperValues = this.state.ScoreCards.map(card => {
            if (card.section === "Upper"){
            return card.score[this.state.Round -1]
        } else{
            return 0}
        }) 
        const lowerValues = this.state.ScoreCards.map(card => {
            if (card.section === "Lower"){
            return card.score[this.state.Round -1]
        } else{
            return 0}
        })
        //add scores together
        let uinitialValue = 0;
        let upperScore = upperValues.reduce((accumulator, currentValue) => accumulator + currentValue,
        uinitialValue)
        let linitialValue = 0;
        let lowerScore = lowerValues.reduce((accumulator, currentValue) => accumulator + currentValue,
        linitialValue)
        
        let newUpper = [...this.state.upperScore]
        newUpper[this.state.Round -1] = upperScore
        let newLower = [...this.state.lowerScore]
        newLower[this.state.Round -1] = lowerScore
        

        this.setState({upperScore: newUpper, lowerScore: newLower})
    }

    recordScore(desc, id){
        // if selected box is already sccored in, dont score again.
        let selectedBox = this.state.ScoreCards.filter(card => card.description === desc)
        if (selectedBox[0].score[this.state.Round -1] === null){
        //require user to roll atleast once
        if(this.state.Roll > 0 && id < 20){
            //once rolled get array of dice values and run through score calculator, pass ID and description to determine calculation type
            let dieValues = this.state.Dice.map(die => die.value)
            let scores = calcScore(dieValues, desc, id)

        //update scorecards with calculated score
            const updatedScoreCards = this.state.ScoreCards.map((card) => {    
                if (card.description === desc){
                    let scoreArray = card.score
                    scoreArray[this.state.Round -1] = scores 
                    return {...card, score: scoreArray}
                }
                return card
            })
        
        // display updated score and set roll count to 0 (this will require user to roll again before recording next score)
        this.setState({Roll: 0, ScoreCards: updatedScoreCards})
        
        //unlock locked dice for next roll
        const dice = this.state.Dice.map((die) => {    
            if (die.locked === true){
                 return {...die, locked: false }
            }
            return die
        })
        this.setState({Dice: dice})
        this.checkBonus()
        this.updateTotals()

        }else if(id < 20){
            alert("You need to roll first!")
        }
    }else{
        alert("This is already taken")
    }
    }
   
    render(){
        let renderedDice = this.state.Dice.map(die => <Die key={die.id} id={die.id} value={die.value} lock={this.lockDie} locked={die.locked} rolling={die.rolling} />)
        let UpperSection = this.state.ScoreCards.filter(scoreCard => scoreCard.section === "Upper")
        let LowerSection = this.state.ScoreCards.filter(scoreCard => scoreCard.section === "Lower")

        return(
            <div className="Board">
                <div className="Board-Head">
                    <div className="round-counter">Round: {this.state.Round}</div>
                    <h1>Yahtzee!</h1>
                    <div className="Board-Dice">{renderedDice}</div>
                    <button onClick={this.rollDice} disabled={this.state.Roll >= 3 || this.state.currRolling}>Roll Dice</button>
                </div>
                <div className="Board-ScoreCard">
                    <h1>ScoreCard</h1>
                    <h3>Upper <span className="total-scores"> Round 1: {this.state.upperScore[0]} Round 2: {this.state.upperScore[1]} Round 3: {this.state.upperScore[2]}</span> </h3>
                    {UpperSection.map(row => <ScoreCard key={row.id} id={row.id} scores={row.score} description={row.description} recordScore={this.recordScore} />)}
                     
                    <h3>Lower <span className="total-scores"> Round 1: {this.state.lowerScore[0]} Round 2: {this.state.lowerScore[1]} Round 3: {this.state.lowerScore[2]} </span></h3>
                    {LowerSection.map(row => <ScoreCard key={row.id} id={row.id} scores={row.score} description={row.description} recordScore={this.recordScore}  />)}
                    <h3>Total <span className="total-scores">Round 1: {this.state.lowerScore[0] + this.state.upperScore[0]} Round 2: {this.state.lowerScore[1] + this.state.upperScore[1]} Round 3: {this.state.lowerScore[2] + this.state.upperScore[2]}</span></h3>
                    <button onClick={this.nextRound}>Next Round</button><button onClick={this.reset}>Reset</button>
                </div>
            </div>
        )
    }
}

export default Board