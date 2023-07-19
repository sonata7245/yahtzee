import React, { Component } from 'react'
import Die from './Die'
import rollDie from './helpers'

class Board extends Component{
    constructor(props){
        super(props);
        this.state = ({
            Dice: [
                {id: "die1", value: rollDie(), locked: false, rolling: false},
                {id: "die2", value: rollDie(), locked: false, rolling: false},
                {id: "die3", value: rollDie(), locked: false, rolling: false},
                {id: "die4", value: rollDie(), locked: false, rolling: false},
                {id: "die5", value: rollDie(), locked: false, rolling: false},
                {id: "die6", value: rollDie(), locked: false, rolling: false}
            ],
            Roll: 1,
            currRolling: false

        })
        this.lockDie = this.lockDie.bind(this)
        this.rollDice = this.rollDice.bind(this)
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
   
    render(){
        let renderedDice = this.state.Dice.map(die => <Die key={die.id} id={die.id} value={die.value} lock={this.lockDie} locked={die.locked} rolling={die.rolling} />)
        return(
            <div>
                <div>{renderedDice}</div>
                <button onClick={this.rollDice} disabled={this.state.Roll > 3 || this.state.currRolling}>Roll Dice</button>
            </div>
        )
    }
}

export default Board