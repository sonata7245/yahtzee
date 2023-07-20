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
        return (
            <div className="ScoreCard">
                <div className="ScoreCard-Desc">{this.props.description}:</div>
                <div onClick={this.recordScore} className="ScoreCard-Rd">{this.props.round1}</div>
                <div onClick={this.recordScore} className="ScoreCard-Rd">{this.props.round2}</div>
                <div onClick={this.recordScore} className="ScoreCard-Rd">{this.props.round3}</div>
            </div>
        )
    }
}

export default ScoreCard