import React from 'react'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
import Marker from './Marker.react'
import { toggleOpen } from '../redux/jumpers'

const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAP-ejahus7H5ASsTg0ETbboIR0MNWYvAk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `450px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props =>
  <GoogleMap
    defaultZoom={2}
    defaultCenter={{ lat: 25, lng: 0 }}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={20}
      defaultMaxZoom={12}
    >
      {props.jumpers.entrySeq().map(([id, jumper]) =>
          <Marker
            jumper={jumper}
            id={id}
            toggleOpen={props.toggleOpen}
            key={id}
          />
      )}
    </MarkerClusterer>
  </GoogleMap>
)

export default connect(
  null,
  { toggleOpen }
)(Map)
