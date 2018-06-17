import { shallow } from 'enzyme'
import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

import Title from 'app/components/title'

chai.use(chaiEnzyme())

describe('<Title /> Test', () => {
  it('should set the title', () => {
    const props = {
      title: 'Exercises'
    }

    const wrapper = shallow(<Title {...props} />)
    expect(wrapper.find('h3').text()).to.eq('Exercises')
  })

  it('should append the count to the title when present', () => {
    const props = {
      title: 'Exercises',
      count: 2
    }

    const wrapper = shallow(<Title {...props} />)
    expect(wrapper.find('h3').text()).to.eq('Exercises (2)')
  })

  it('should render its children', () => {
    const props = {
      title: 'Exercises'
    }

    const wrapper = shallow(<Title {...props}><div class="test" /></Title>)
    expect(wrapper.find('.test').first).to.exist
  })
})