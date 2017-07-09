import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { shallow, mount } from 'enzyme'
const muiTheme = getMuiTheme()

export const shallowRender = (node, store) =>
  shallow(node, {
    context: { muiTheme, store }
  })

export const mountRender = (node, store) =>
  mount(node, {
    context: { muiTheme, store },
    childContextTypes: {
      muiTheme: React.PropTypes.object,
      store: React.PropTypes.any
    }
  })