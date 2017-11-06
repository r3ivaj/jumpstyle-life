import { OrderedMap } from 'immutable'
import Raven from 'raven-js'
import { db } from '../firebase'
import { getChannel } from '../youtube'

const LOAD = 'JUMPSTYLE/JUMPERS/LOAD'
const TOGGLE_OPEN = 'JUMPSTYLE/JUMPERS/TOGGLE_OPEN'
const LOAD_CHANNEL = 'JUMPSTYLE/JUMPERS/LOAD_CHANNEL'

export default function reducer(state = OrderedMap(), action = {}) {
  switch (action.type) {
    case LOAD:
      return state.merge(action.jumpers)
    case TOGGLE_OPEN:
      return state.updateIn(
        [action.jumperId, 'marker', 'isOpen'],
        flag => !flag
      )
    case LOAD_CHANNEL:
      return state.updateIn(
        [action.jumperId, 'channel'],
        channel => channel.merge({
          title: action.channel.snippet.title,
          thumbnailUrl: action.channel.snippet.thumbnails.default.url
        })
      )
    default: return state
  }
}

export const loadJumpers = () => {
  return dispatch => {
    let jumpers = OrderedMap()
    db.collection('jumpers').get()
    .then(snapshot => {
      snapshot.forEach(jumper =>
        jumpers = jumpers.mergeDeep({
          [jumper.id]: {
            ...jumper.data(),
            marker: {
              isOpen: false,
            }
          }
        })
      )
      dispatch({ type: LOAD, jumpers })
    })
    .catch(err => Raven.captureMessage(
      'Error getting documents',
      { extra: { err } }
    ))
  }
}

export const toggleOpen = jumperId => {
  return {
    type: TOGGLE_OPEN,
    jumperId,
  }
}

export const loadChannel = jumperId => {
  return (dispatch, getState) => {
    const channelId = getState().jumpers.getIn([jumperId, 'channel', 'id'])
    getChannel(channelId)
    .then(channel =>
      dispatch({ type: LOAD_CHANNEL, channel, jumperId })
    )
    .catch(err => Raven.captureMessage(
      'Error fetching jumper',
      { extra: { err } }
    ))
  }
}
