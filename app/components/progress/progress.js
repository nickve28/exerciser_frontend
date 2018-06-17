import React from 'react'
import isEmpty from 'lodash-es/isEmpty'

import ProgressGraph from './graph'
import EnduranceProgressGraph from './endurance_graph'

export default ({progress, exerciseType}) => {
  if (isEmpty(progress)) {
    return <div>Please select an exercise</div>
  }

  if (exerciseType === 'strength') {
    return (
      <div>
        <p>Progress: </p>
        <ProgressGraph progress={progress} />
      </div>
    )
  }
  return (
    <div>
      <p>Progress: </p>
      <EnduranceProgressGraph progress={progress} />
    </div>
  )
}
