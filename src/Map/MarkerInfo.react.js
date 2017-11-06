import React from 'react'
import { InfoWindow } from 'react-google-maps'
import MarkerContent from './MarkerContent.react'

const MarkerInfo = ({ toggleOpen, jumper, id}) => (
  <InfoWindow
    onCloseClick={() => toggleOpen(id)}
  >
    <MarkerContent
      jumper={jumper}
      id={id}
    />
  </InfoWindow>
)

export default MarkerInfo
