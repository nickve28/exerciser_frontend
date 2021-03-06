import React from 'react'

import { SelectField, MenuItem } from 'material-ui'
import Delete from 'material-ui/svg-icons/action/delete'
import { Field } from 'redux-form'

import _ from 'lodash'

const FIELD_TYPE_MAPPING = {
  metric: { type: 'text' },
  mode: { type: 'number' },
  duration: { type: 'number' },
  amount: { type: 'number' },
  weight: { type: 'number', step: 'any' },
  sets: { type: 'number' },
  reps:  { type: 'number' }
}

export default (props) => {
  const {
    fieldName, index, renderField, exercises, remove, onChange, fields
  } = props

  const deleteStyle = {
    float: 'right'
  }

  return (
    <li className='list-view-group-item list-view-group-item-gray' key={index}>
      <div className="form-group">
        <div>
          <label style={{marginRight: '5px'}}>Exercise #{index + 1}</label>
          <Delete style={deleteStyle} color="#7f8c8d" onClick={remove} />
        </div>
        <Field className="form-control" name={`${fieldName}.exerciseId`}component={properties =>
          <div>
            <SelectField
              name="exerciseId"
              value={properties.input.value.toString()}
              onChange={(e, key, value) => {
                properties.input.onChange(value)
                onChange(value)
              }}
              maxHeight={200}
            >
              {_.map(exercises, exercise => {
                return <MenuItem name="exercise_list" value={exercise.id} key={exercise.id} primaryText={exercise.name} />
              })}
            </SelectField>
            <div>
              {properties.meta.touched && <span className="error-text">{properties.meta.error}</span>}
            </div>
          </div>
        } />
      </div>
      {
        _.map(fields, field => {
          let fieldTypeProps = FIELD_TYPE_MAPPING[field] || { type: 'text' }
          const label = _.capitalize(field)
          return <Field
            key={`${fieldName}.${field}`}
            name={`${fieldName}.${field}`}
            component={renderField}
            label={label}
            {...fieldTypeProps}
          />
        })
      }
    </li>
  )
}
