import React, { Component } from 'react'
import './Die.css'


class Die extends Component{


    constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
    }

    static defaultProps ={
        dieFace: [
            {face: "fas fa-dice-one die", faceShake: "fa-solid fa-dice-d6 fa-shake die" },
            {face: "fas fa-dice-two die", faceShake: "fa-solid fa-dice-d6 fa-shake die" },
            {face: "fas fa-dice-three die", faceShake: "fa-solid fa-dice-d6 fa-shake die" },
            {face: "fas fa-dice-four die", faceShake: "fa-solid fa-dice-d6 fa-shake die" },
            {face: "fas fa-dice-five die", faceShake: "fa-solid fa-dice-d6 fa-shake die" },
            {face: "fas fa-dice-six die", faceShake: "fa-solid fa-dice-d6 fa-shake die" }
        ]
    }

    

    handleClick(){
        this.props.lock(this.props.id)
    }



    render(){
        let styleList = `${this.props.rolling ? this.props.dieFace[this.props.value-1].faceShake : this.props.dieFace[this.props.value-1].face} 
                        ${this.props.locked ? "locked" : ""}`
        return(
            <i onClick={this.handleClick} className={styleList}></i>
        )
    }

}

export default Die