import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (type) => {
    this.setState(previousState => {
      return ({
        filters:{
          ...previousState.filters,
          type: type
        }
      })
    })
  }

  onFindPetsClick = () => {
    let queryParam 

    if (this.state.filters.type === 'all') { 
      queryParam = ""
    } else {
      queryParam = `?type=${this.state.filters.type}`
    }

    fetch(`/api/pets${queryParam}`)
      .then(resp => resp.json)
      .then(pets => {
        this.setState({pets: pets}) 
      })
  }

  onAdoptPet = (id) => {
    let pet = this.state.pets.find(pet => pet.id === id)
    pet.isAdopted = true
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType = {this.onChangeType} onFindPetsClick = {this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets = {this.state.pets} onAdoptPet = {this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
