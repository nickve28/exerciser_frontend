
import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { createStore } from 'redux'

import reducers from 'app/reducers/index'
import { mountRender } from 'test/helpers/render_helper'

import Login from 'app/sections/authentication/containers/login'
import Title from 'app/components/title'

chai.use(chaiEnzyme())

describe('<Login /> Test', () => {
  it('should render the Log in title', () => {
    const store = createStore(reducers)

    const wrapper = mountRender(<Login />, store)
    const title = wrapper.find(Title)
    expect(title.length).to.eq(1)

    expect(title.first().html()).to.contain('Log in')
  })

  it('should require the username', () => {
    const store = createStore(reducers)

    const wrapper = mountRender(<Login />, store)
    const usernameField = wrapper.find('input[name="username"]')
    usernameField.simulate('focus')
    usernameField.simulate('blur')

    expect(
      usernameField.parent().html()
    ).to.contain('is required')
  })

  it('should require the password', () => {
    const store = createStore(reducers)

    const wrapper = mountRender(<Login />, store)
    const password = wrapper.find('input[type="password"]')
    password.simulate('focus')
    password.simulate('blur')

    expect(
      password.parent().html()
    ).to.contain('is required')
  })
})