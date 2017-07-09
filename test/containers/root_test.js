import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { createStore } from 'redux'

import reducers from 'app/reducers/index'
import { mountRender } from 'test/helpers/render_helper'

import Root from 'app/containers/root'

chai.use(chaiEnzyme())

describe('<Root /> Test', () => {
  it('should render the login form if the user is not authenticated', () => {
    const store = createStore(reducers, {})
    const wrapper = mountRender(<Root><div className="test" /></Root>, store)

    const loginForm = wrapper.find('.login-form')
    expect(loginForm.length).to.eq(1)

    const testEl = wrapper.find('.test')
    expect(testEl.length).to.eq(0)
  })

  it('should not render the user icon if the user is not authenticated', () => {
    const store = createStore(reducers, {})
    const wrapper = mountRender(<Root><div className="test" /></Root>, store)

    const userIcon = wrapper.find('.user-nav')
    expect(userIcon.length).to.eq(0)
  })

  it('should render the content if the user is authenticated', () => {
    const initialState = {
      authentication: {
        token: '123',
        loginState: 'logged_in'
      },
      users: {
        data: {
          entities: {
            '1': {
              id: '1',
              name: 'Nick'
            }
          }
        }
      }
    }
    const store = createStore(reducers, initialState)
    const wrapper = mountRender(<Root><div className="test" /></Root>, store)

    const loginForm = wrapper.find('.login-form')
    expect(loginForm.length).to.eq(0)

    const testEl = wrapper.find('.test')
    expect(testEl.length).to.eq(1)
  })
})