import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { createStore } from 'redux'

import reducers from 'app/reducers/index'
import { mountRender } from 'test/helpers/render_helper'

import ExerciseList from 'app/sections/exercises/containers/list'
import ListView from 'app/components/list_view'
import ExerciseViewItem from 'app/sections/exercises/components/exercise_view_item'
import Title from 'app/components/title'

chai.use(chaiEnzyme())

describe('<ExerciseList /> Test', () => {
  it('should render its title', () => {
    const store = createStore(reducers, {})
    const wrapper = mountRender(<ExerciseList />, store)
    const title = wrapper.find(Title)
    expect(title.length).to.eq(1)
    expect(title.first().text()).to.contain('Exercises (0')
  })

  it('should render its exercises', () => {
    const exercises = {
      data: {
        entities: [{ id: '1', name: 'foo' }],
        count: 1
      }
    }

    const initialState = { exercises }
    const store = createStore(reducers, initialState)

    const wrapper = mountRender(<ExerciseList />, store)

    const list = wrapper.find(ListView)
    expect(list.length).to.eq(1)

    const childElements = list.find(ExerciseViewItem)
    expect(childElements.length).to.eq(1)
  })

  it('should render a create exercise link', () => {
    const store = createStore(reducers, {})
    const wrapper = mountRender(<ExerciseList />, store)
    const link = wrapper.find('a').first()
    expect(link.text()).to.eql('Create exercise')
  })
})