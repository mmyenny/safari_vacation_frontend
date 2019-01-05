import React, { Component } from 'react'

import './App.css'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allAnimals: []
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:4567/Animals').then(response => {
      this.setState({
        allAnimals: response.data
      })
      console.log(this.state.allAnimals)
    })
  }

  render() {
    return (
      <div>
        <h1>Welcome to the Safari!</h1>
        <p>Here's a list of all the animals seen today!</p>
        {this.state.allAnimals.map((animal, index) => {
          // console.log(animal.species)
          return (
            <p className="animalList" key={index}>
              {animal.species}
            </p>
          )
        })}
        <p>Here are all the animals seen in the jungle today!</p>
        <p>Delete all the animals in the desert.</p>
        <p>The total number of animals seen today is:</p>
        <p>
          The total number of times Lions, Tigers, and Bears have been seen
          today is:
        </p>
      </div>
    )
  }
}

export default App
