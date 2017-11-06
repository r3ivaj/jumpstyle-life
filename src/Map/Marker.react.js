import React from 'react'
import { pure } from 'recompose'
import { Marker } from 'react-google-maps'
import MarkerInfo from './MarkerInfo.react'

const JumperMarker = ({ jumper, toggleOpen, id }) => (
  <Marker
    position={{
      lat: jumper.getIn(['location', 'lat']),
      lng: jumper.getIn(['location', 'lng'])
    }}
    onClick={() => toggleOpen(id)}
  >
    {
      jumper.getIn(['marker', 'isOpen']) &&
      <MarkerInfo toggleOpen={toggleOpen} jumper={jumper} id={id} />
    }
  </Marker>
)

export default pure(JumperMarker)
