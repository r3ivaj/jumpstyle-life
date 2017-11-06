import axios from 'axios'
import { youtubeAPIKey } from './config'
axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3'

export const getChannel = (channelId) => {
  return new Promise((resolve, reject) => {
    axios.get('/channels', {
      params: {
        part: 'snippet',
        id: channelId,
        key: youtubeAPIKey
      }
    })
    .then(response => {
      const channels = response.data.items
      if (channels.length === 0) {
        reject('No channel found')
      } else {
        resolve(channels[0])
      }
    })
    .catch(err => reject('The Youtube API returned an error'))
  })
}
