import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {

  render() {
    return (
      <div className="columns search">
        <div className="control column">
          <input className="input" value={this.props.value} onChange={this.props.handleChange} type="text" placeholder="Location ie. Vancouver, New York" />
        </div>
        <div className="control column">
          <button className="button is-primary" onClick={() => { this.props.getNewContent(this.props.value) }}>NEW</button>
          <button className="button is-primary" onClick={() => { this.props.getExpContent(this.props.value) }}>EXPIRING</button>
        </div>
      </div>
    )
  }
}

