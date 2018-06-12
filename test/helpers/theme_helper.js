import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { shallow, mount } from 'enzyme'
import merge from 'lodash-es/merge'
const muiTheme = getMuiTheme()

export const shallowRender = (node, opts = {}) => shallow(node, {
  context: merge({
    muiTheme: muiTheme
  }, opts)
})

export const mountRender = (node, opts = {}) => mount(node, {
  context: merge({
    muiTheme: muiTheme
  }, opts),
  childContextTypes: {
    muiTheme: React.PropTypes.object
  }
})