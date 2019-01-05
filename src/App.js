import React, { Component } from 'react'

import './App.css'
import axios from 'axios'

// The react app should:
//  [x]Display all animals the user has seen
//  [x]Display all animals seen in the Jungle
//  [x]Remove all animals that I have seen in the Desert.
//  [x]Add all the CountOfTimesSeen and get a total number of animals seen
//  [x]Get the CountOfTimesSeen of lions, tigers and bears

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allAnimals: [],
      jungleAnimals: [],
      totalCount: '',
      totalCountLTB: ''
    }
  }

  componentDidMount = () => {
    this.getAllAnimals()
    this.seenInJungle()
    this.totalAnimalCount()
    this.totalCountOfLTB()
  }

  getAllAnimals = () => {
    axios.get('http://localhost:4567/Animals').then(response => {
      this.setState({
        allAnimals: response.data
      })
    })
  }

  seenInJungle = () => {
    axios.get('http://localhost:4567/Animal/jungle').then(response => {
      // console.log(response.data)
      this.setState({
        jungleAnimals: response.data
      })
    })
  }

  deleteDesertAnimals = () => {
    axios.delete('http://localhost:4567/Animals/desert').then(response => {
      this.getAllAnimals()
    })
  }

  totalAnimalCount = () => {
    axios.get('http://localhost:4567/Count').then(response => {
      this.setState({
        totalCount: response.data
      })
    })
  }

  totalCountOfLTB = () => {
    axios.get('http://localhost:4567/Countofltb').then(response => {
      this.setState({
        totalCountLTB: response.data
      })
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to the Safari!</h1>
        <h4>Here's a list of all the animals seen today!</h4>
        {this.state.allAnimals.map((animal, index) => {
          // console.log(animal.species)
          return (
            <p className="animalList" key={index}>
              {animal.species}
            </p>
          )
        })}
        <h4>Here are all the animals seen in the jungle today!</h4>
        {this.state.jungleAnimals.map((jungleAnimal, index) => {
          return (
            <p className="animalList" key={index}>
              {jungleAnimal.species}
            </p>
          )
        })}
        <h4>Delete all the animals in the desert!</h4>
        <button onClick={this.deleteDesertAnimals}>Delete</button>
        <h4>The total number of animals seen today is:</h4>
        <p>{this.state.totalCount}</p>
        <h4>
          The total number of times Lions, Tigers, and Bears have been seen
          today is:
        </h4>
        <p>{this.state.totalCountLTB}</p>
      </div>
    )
  }
}

export default App
