import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadJumpers } from '../redux/jumpers'
import GoogleMap from './GoogleMap.react'

class Map extends Component {
  componentWillMount() {
    this.props.loadJumpers()
  }

  render() {
    return <GoogleMap jumpers={this.props.jumpers} />
  }
}

export default connect(
  state => ({ jumpers: state.jumpers }),
  { loadJumpers }
)(Map)
