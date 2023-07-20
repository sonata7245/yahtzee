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
                {id: "die5", value: 5, locked: false, rolling: false},
                {id: "die6", value: 6, locked: false, rolling: false}
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
                {id: 20, description: "Upper Total", score:[null,null,null], section:"Upper"  },
                {id: 21, description: "Bonus", score:[null,null,null], section:"Upper"  },
                {id: 7, description: "3 of a Kind", score:[null,null,null], section:"Lower"  },
                {id: 8, description: "4 of a Kind", score:[null,null,null], section:"Lower"  },
                {id: 9, description: "Full House", score:[null,null,null], section:"Lower"  },
                {id: 10, description: "Small Straight", score:[null,null,null], section:"Lower"  },
                {id: 11, description: "Large Straight", score:[null,null,null], section:"Lower"  },
                {id: 12, description: "Yahtzee!", score:[null,null,null], section:"Lower"  },
                {id: 13, description: "Yahtzee Bonus!", score:[null,null,null], section:"Lower"  },
                {id: 22, description: "Lower Total", score: [null,null,null], section:"Lower"  },
            ]

        })
        this.lockDie = this.lockDie.bind(this)
        this.rollDice = this.rollDice.bind(this)
        this.recordScore = this.recordScore.bind(this)
    }

    //when selected set die to locked = true
    lockDie(id){
         const updatedDice = this.state.Dice.map((die) => {    
            if (die.id === id){
                 return {...die, locked: !die.locked }

            }
            return die
        })
        this.setState({Dice: updatedDice})
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

    recordScore(desc, id){
        //require user to roll atleast once
        if(this.state.Roll > 0){
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

        }else{
            alert("You need to roll first!")
        }
    }
   
    render(){
        let renderedDice = this.state.Dice.map(die => <Die key={die.id} id={die.id} value={die.value} lock={this.lockDie} locked={die.locked} rolling={die.rolling} />)
        let UpperSection = this.state.ScoreCards.filter(scoreCard => scoreCard.section === "Upper")
        let LowerSection = this.state.ScoreCards.filter(scoreCard => scoreCard.section === "Lower")

        return(
            <div className="Board">
                <div className="Board-Dice">
                <h1>Yahtzee!</h1>
                <div>{renderedDice}</div>
                <button onClick={this.rollDice} disabled={this.state.Roll >= 3 || this.state.currRolling}>Roll Dice</button>
                </div>
                <div className="Board-ScoreCard">
                    <h1>ScoreCard</h1>
                    <h3>Upper</h3>
                    {UpperSection.map(row => <ScoreCard key={row.id} id={row.id} round1={row.score[0]} round2={row.score[1]} round3={row.score[2]} description={row.description} recordScore={this.recordScore} />)}
                    <h3>Lower</h3>
                    {LowerSection.map(row => <ScoreCard key={row.id} id={row.id} round1={row.score[0]} round2={row.score[1]} round3={row.score[2]} description={row.description} recordScore={this.recordScore}  />)}
                    <h3>Total Score:</h3>
                    
                </div>
            </div>
        )
    }
}

export default Board