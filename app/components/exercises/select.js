import React from 'react'
import map from 'lodash-es/map'

import {MenuItem, SelectField} from 'material-ui'

const renderItems = exercises => {
  return map(exercises, exercise => {
    const {id, name} = exercise
    return (
      <MenuItem
        key={id}
        value={id}
        primaryText={name}
      />
    )
  })
}

export default ({exercises, selectedExercise, onSelect}) => {

  return (
    <SelectField
      floatingLabelText="Exercise"
      floatingLabelFixed={true}
      value={selectedExercise}
      onChange={(event, index, value) => onSelect(value)}
    >
      {renderItems(exercises)}
    </SelectField>
  )
}
