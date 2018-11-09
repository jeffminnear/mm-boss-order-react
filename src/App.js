import React, { Component } from 'react';
import axios from 'axios'

import Boss from './components/Boss'
import './App.css';



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bosses: null
    }
  }

  componentDidMount() {
    this.getBosses()
  }

  getBosses() {
    axios.get('https://mm-boss-order-api.herokuapp.com/game/Mega Man 2')
      .then((res) => {        
        this.setState({ bosses: res.data.sort((a, b) => a.position > b.position) })
      })
  }

  getBossOrder = (e) => {
    e.preventDefault()
    let parent = e.target.closest('.boss')
    axios.get('https://mm-boss-order-api.herokuapp.com/game/Mega Man 2/' + parent.dataset.name)
      .then((res) => {        
        this.setState({ bosses: res.data.sort((a, b) => a.position > b.position) })
      })
  }

  getTopRow() {
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

  getMiddleRow() {
    const { bosses } = this.state
    if (!bosses || !bosses.length || bosses.length == 0) return null
    let row

    if (bosses.length < 8) {
      row = bosses.map((boss, i) => {
        if (i < 2 || i > 3) return null
        return <Boss handleClick={this.getBossOrder} name={boss.name} order={boss.order} key={i} />
      })
    } else {
      row = bosses.map((boss, i) => {
        if (i < 3 || i > 4) return null
        return <Boss handleClick={this.getBossOrder} name={boss.name} order={boss.order} key={i} />
      })
    }
    
    return (
      <div className="row middle-row">{row}</div>
    )
  }

  getBottomRow() {
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

  render() {
    if (this.state.bosses) {
      return (
        <div className="container App">
          {this.getTopRow()}
          {this.getMiddleRow()}
          {this.getBottomRow()}
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


// const bosses = [
//   {
//     "weakness": [
//       "Time Stopper",
//       "Crash Bomber"
//     ],
//     "_id": "5bdb24d5eab29034382b2070",
//     "name": "Quick Man",
//     "weapon": "Quick Boomerang",
//     "game": "Mega Man 2",
//     "position": 3,
//     "img": "https://s3-us-west-2.amazonaws.com/mm-bosses/img/quick.jpg",
//     "order": 1
//   },
//   {
//     "weakness": [
//       "Quick Boomerang",
//       "Metal Blade"
//     ],
//     "_id": "5bdb23ffeab29034382b206d",
//     "name": "Metal Man",
//     "weapon": "Metal Blade",
//     "game": "Mega Man 2",
//     "position": 6,
//     "img": "https://s3-us-west-2.amazonaws.com/mm-bosses/img/metal.jpg",
//     "order": 2
//   },
//   {
//     "weakness": [
//       "Metal Blade"
//     ],
//     "_id": "5bdb2480eab29034382b206f",
//     "name": "Bubble Man",
//     "weapon": "Bubble Lead",
//     "game": "Mega Man 2",
//     "position": 1,
//     "img": "https://s3-us-west-2.amazonaws.com/mm-bosses/img/bubble.jpg",
//     "order": 3
//   },
//   {
//     "weakness": [
//       "Bubble Lead"
//     ],
//     "_id": "5bdb2589eab29034382b2073",
//     "name": "Heat Man",
//     "weapon": "Atomic Fire",
//     "game": "Mega Man 2",
//     "position": 4,
//     "img": "https://s3-us-west-2.amazonaws.com/mm-bosses/img/heat.jpg",
//     "order": 4
//   },
//   {
//     "weakness": [
//       "Atomic Fire"
//     ],
//     "_id": "5bdb25a1eab29034382b2074",
//     "name": "Wood Man",
//     "weapon": "Leaf Shield",
//     "game": "Mega Man 2",
//     "position": 5,
//     "img": "https://s3-us-west-2.amazonaws.com/mm-bosses/img/wood.jpg",
//     "order": 5
//   },
//   {
//     "weakness": [
//       "Leaf Shield"
//     ],
//     "_id": "5bdb2462eab29034382b206e",
//     "name": "Air Man",
//     "weapon": "Air Shooter",
//     "game": "Mega Man 2",
//     "position": 2,
//     "img": "https://s3-us-west-2.amazonaws.com/mm-bosses/img/air.jpg",
//     "order": 6
//   },
//   {
//     "weakness": [
//       "Air Shooter"
//     ],
//     "_id": "5bdb24fdeab29034382b2071",
//     "name": "Crash Man",
//     "weapon": "Crash Bomber",
//     "game": "Mega Man 2",
//     "position": 8,
//     "img": "https://s3-us-west-2.amazonaws.com/mm-bosses/img/crash.jpg",
//     "order": 7
//   },
//   {
//     "weakness": [
//       "Metal Blade",
//       "Crash Bomber"
//     ],
//     "_id": "5bdb2519eab29034382b2072",
//     "name": "Flash Man",
//     "weapon": "Time Stopper",
//     "game": "Mega Man 2",
//     "position": 7,
//     "img": "https://s3-us-west-2.amazonaws.com/mm-bosses/img/flash.jpg",
//     "order": 8
//   }
// ].sort((a, b) => a.position > b.position)