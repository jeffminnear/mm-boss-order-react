import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Boss.css'

const imgUrl = 'https://s3-us-west-2.amazonaws.com/mm-bosses/img/'

class Boss extends Component {
    static propTypes = {
        name: PropTypes.string,
        classes: PropTypes.string,
        handleClick: PropTypes.func
    }

    render() {
        const { classes, name, handleClick, order } = this.props

        return (
            <div className={`col boss ${classes}`} data-name={name} onClick={handleClick}>
                <div className="img-wrapper" style={{ position: 'relative' }}>
                    <img className="img-fluid" src={imgUrl + name.split(' ')[0].toLowerCase() + '.jpg'} />
                    <div className="order-number">{order}</div>
                </div>
                
                <p>{name}</p>
            </div>
        )
    }
}

export default Boss