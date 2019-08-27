import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'

/* COMPONENTS */ 
import Navbar from './components/Navbar'
import Search from './components/Search'
import Home from './components/Home'
import Results from './components/Results'

import './App.css';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      value: '' 
    }
    this.handleChange = this.handleChange.bind(this)
    this.getNewContent = this.getNewContent.bind(this)
    this.getExpContent = this.getExpContent.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  async getNewContent(city) {
    try {
      const response = await axios.post('http://127.0.0.1:5000/location', {
        location: city
      }).then(async(response) => {
        let country = response.data.Results[0].c
        const data = await axios.post('http://127.0.0.1:5000/new', {
          code: country
        })
        console.log(data.data.ITEMS)
        const movieJSX = data.data.ITEMS.map((data, i) =>
          <div key={i} className="column is-one-quarter">
            <h2>{data.title}</h2>
            <p>Date added: {data.unogsdate}</p>
            <img src={data.image}></img>
          </div>
        )
        this.setState({
          ...this.state,
          movies: movieJSX
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getExpContent(city) {
    try {
      const response = await axios.post('http://127.0.0.1:5000/location', {
        location: city
      }).then(async(response) => {
        let country = response.data.Results[0].c
        const data = await axios.post('http://127.0.0.1:5000/expire', {
          code: country
        })
        console.log(data.data.ITEMS)
        const movieJSX = data.data.ITEMS.map((data, i) =>
          <div key={i} className="column is-one-quarter">
            <h2>{data.title}</h2>
            <p>Date of removal: {data.unogsdate}</p>
            <img src={data.image}></img>
          </div>
        )
        this.setState({
          ...this.state,
          movies: movieJSX
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar></Navbar>

        <Search 
          movies={this.state.movies}
          value={this.state.value}
          handleChange={this.handleChange}
          getNewContent={this.getNewContent}
          getExpContent={this.getExpContent}
        ></Search>
        <div>
          <Switch>
            <Route path="/" render={() => {
              return <Home movies={this.state.movies}></Home>
            }} />

            <Route path="/new" render={() => {
              return <Results></Results>
            }} />

            <Route path="/expiring" render={() => {
              return <Results></Results>
            }} />
          </Switch>
        </div>
      </div>
    )
  }
}
