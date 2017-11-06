import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadChannel } from '../redux/jumpers'
import './MarkerContent.css'

const ChannelLink = ({children, youtubeUrl}) => (
  <a
    href={youtubeUrl}
    rel='noopener noreferrer'
    target="_blank"
  >
    {children}
  </a>
)

class MarkerContent extends Component {
  componentWillMount() {
    const { jumper } = this.props
    if (!jumper.getIn(['channel', 'title'])) {
      this.props.loadChannel(this.props.id)
    }
  }

  render() {
    const { jumper } = this.props
    const youtubeUrl = `http://youtube.com/channel/${jumper.getIn(['channel', 'id'])}`
    return (
      <div className="marker-content">
        <ChannelLink youtubeUrl={youtubeUrl}>
          <h3>{jumper.getIn(['channel', 'title'])}</h3>
        </ChannelLink>
        <ChannelLink youtubeUrl={youtubeUrl}>
          <img
            src={jumper.getIn(['channel', 'thumbnailUrl'])}
            alt="Jumper thumbnail"
          />
        </ChannelLink>
      </div>
    )
  }
}

export default connect(null, { loadChannel })(MarkerContent)
