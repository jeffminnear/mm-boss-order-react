import React, { Component } from 'react'

const imgUrl = 'https://s3-us-west-2.amazonaws.com/mm-bosses/img/'

class Boss extends Component {
    render() {
        return (
            <div className="col boss" data-name={this.props.name} onClick={this.props.handleClick}>
                <div className="img-wrapper">
                    <img className="img-fluid" src={imgUrl + this.props.name.split(' ')[0].toLowerCase() + '.jpg'} />
                </div>

                <div className="order-number">{this.props.order}</div>

                <h6>{this.props.name}</h6>
            </div>
        )
    }
}

export default Boss