import React, { Component } from 'react';
import axios from 'axios'

import Boss from './components/Boss'
import './App.css';



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      game: 'Mega Man',
      bosses: null
    }
  }

  componentDidMount() {
    this.getBosses()
  }

  getBosses = () => {
    axios.get(`https://mm-boss-order-api.herokuapp.com/game/${this.state.game}`)
      .then((res) => {        
        this.setState({ bosses: res.data.sort((a, b) => a.position > b.position ? 1 : -1) })
      })
  }

  getBossOrder = (e) => {
    e.preventDefault()
    let parent = e.target.closest('.boss')
    axios.get(`https://mm-boss-order-api.herokuapp.com/game/${this.state.game}/` + parent.dataset.name)
      .then((res) => {        
        this.setState({ bosses: res.data.sort((a, b) => a.position > b.position ? 1 : -1) })
      })
  }

  getTopRow = () => {
    const { bosses } = this.state
    if (!bosses || !bosses.length || bosses.length == 0) return null
    let row

    if (bosses.length < 8) {
      row = bosses.map((boss, i) => {
        if (i > 1) return null
        return <Boss handleClick={this.getBossOrder} name={boss.name} order={boss.order} key={i} />
      })
    } else {
      row = bosses.map((boss, i) => {
        if (i > 2) return null
        return <Boss handleClick={this.getBossOrder} name={boss.name} order={boss.order} key={i} />
      })
    }

    return (
      <div className="row top-row">{row}</div>
    )
  }

  getMiddleRow = () => {
    const { bosses } = this.state
    if (!bosses || !bosses.length || bosses.length == 0) return null
    let left, right

    if (bosses.length < 8) {
      left = <Boss classes={`order-1`} handleClick={this.getBossOrder} name={bosses[2].name} order={bosses[2].order} key={2} />
      right = <Boss classes={`order-3`} handleClick={this.getBossOrder} name={bosses[3].name} order={bosses[3].order} key={3} />
    } else {
      left = <Boss classes={`order-1`} handleClick={this.getBossOrder} name={bosses[3].name} order={bosses[3].order} key={3} />
      right = <Boss classes={`order-3`} handleClick={this.getBossOrder} name={bosses[4].name} order={bosses[4].order} key={4} />
    }
    
    return (
      <div className="row middle-row">
        {left}
        <div className="col order-2"></div>
        {right}
      </div>
    )
  }

  getBottomRow = () => {
    const { bosses } = this.state
    if (!bosses || !bosses.length || bosses.length == 0) return null
    let row
    
    if (bosses.length < 8) {
      row = bosses.map((boss, i) => {
        if (i < 4) return null
        return <Boss handleClick={this.getBossOrder} name={boss.name} order={boss.order} key={i} />
      })
    } else {
      row = bosses.map((boss, i) => {
        if (i < 5) return null
        return <Boss handleClick={this.getBossOrder} name={boss.name} order={boss.order} key={i} />
      })
    }

    return (
      <div className="row bottom-row">{row}</div>
    )
  }

  getHeader = () => {
    const options = [
      'Mega Man',
      'Mega Man 2'
    ]

    return (
      <select
        onChange={(e) => this.setState({ game: e.target.value }, () => this.getBosses())}
      >
        {options.map((option, i) => {
          return <option key={i}>{option}</option>
        })}
      </select>
    )
  }

  render() {
    if (this.state.bosses) {
      return (
        <div className="container App">
          {this.getHeader()}
          <div className="content">
            {this.getTopRow()}
            {this.getMiddleRow()}
            {this.getBottomRow()}
          </div>
        </div>
      )
    }

    return (
      <div className="container App">
        loading...
      </div>
    )
  }
}

export default App;
