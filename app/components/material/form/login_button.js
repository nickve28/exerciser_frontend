import React from 'react'
import { RaisedButton, FloatingActionButton } from 'material-ui'
import Check from 'material-ui/svg-icons/navigation/check'
import MediaQuery from 'react-responsive'

const SMALL_DEVICE_QUERY = '(max-device-width: 1024px)'
const LARGE_DEVICE_QUERY = '(min-device-width: 1024px)'

export default ({ label }) =>
  <div>
    <MediaQuery query={SMALL_DEVICE_QUERY}>
      <FloatingActionButton className="add-exercise-btn" type="submit">
        <Check />
      </FloatingActionButton>
    </MediaQuery>

    <MediaQuery query={LARGE_DEVICE_QUERY}>
      <RaisedButton style={{marginTop: '10px'}} label={label} primary={true} type="submit" />
    </MediaQuery>
  </div>