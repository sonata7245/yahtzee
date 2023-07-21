import React, { Component } from 'react'
import './ScoreCard.css'

class ScoreCard extends Component{
    constructor(props){
        super(props);
        this.recordScore = this.recordScore.bind(this)
    }

    recordScore(evt){
        this.props.recordScore(this.props.description, this.props.id)
    }

    
    
    render(){
        const scoreArray = this.props.scores.map(sc => sc)
        return (
            
            <div className="ScoreCard">
                <div className="ScoreCard-Desc">{this.props.description}</div>
                <div className="ScoreCard-Scores">
                <div onClick={this.recordScore} className="ScoreCard-Rd">{scoreArray[0]}</div>
                <div onClick={this.recordScore} className="ScoreCard-Rd">{scoreArray[1]}</div>
                <div onClick={this.recordScore} className="ScoreCard-Rd">{scoreArray[2]}</div>
                </div>
            </div>
        )
    }
}

export default ScoreCard