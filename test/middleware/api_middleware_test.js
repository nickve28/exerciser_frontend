import moxios from 'moxios'
import sinon from 'sinon'
import { expect } from 'chai'

import apiMiddleware from 'app/middlewares/api_middleware'
import createFakeStore from 'test/helpers/store_helper'

const config = {
  plural: 'exercises',
  actions: {
    ['FETCH_EXERCISES']: ['exercises', 'exerciseCount'],
    ['FETCH_EXERCISE']: ['exercise'],
  },
  cache: ['FETCH_EXERCISES'],
  cacheTime: 5
}

const target = apiMiddleware(config)

describe('API Middleware tests', () => {
  before(() => {
    moxios.install()
  })

  after(() => {
    moxios.uninstall()
  })

  describe('When no data is fetched', () => {
    beforeEach(() => {
      moxios.stubRequest('http://localhost:4000/api/graphql', {
        status: 200,
        responseText: JSON.stringify({
          data: {
            exercises: [],
            exerciseCount: 0
          }
        })
      })
    })

    it('should dispatch the original pending action', () => {
      const state = {
        exercises: {
          data: {},
          requests: {}
        },
        authentication: {
          token: '123'
        }
      }
      const store = createFakeStore(state)

      const callback = sinon.stub()

      const action = {
        type: 'FETCH_EXERCISES',
        status: 'pending',
        query: `{
          exercises {
            id, name
          },
          exerciseCount
        }`
      }

      return target(store)(callback)(action).then(() => {
        expect(callback).to.have.been.calledWith(action)
      })
    })

    it('should dispatch a success action', () => {
      const state = {
        exercises: {
          data: {},
          requests: {}
        },
        authentication: {
          token: '123'
        }
      }
      const store = createFakeStore(state)
      sinon.stub(store, 'dispatch')

      const callback = sinon.stub()

      const action = {
        type: 'FETCH_EXERCISES',
        status: 'pending',
        query: `{
          exercises {
            id, name
          },
          exerciseCount
        }`
      }
      return target(store)(callback)(action).then(() => {
        expect(store.dispatch).to.have.been.calledWith(sinon.match({
          type: 'FETCH_EXERCISES',
          status: 'success'
        }))
      })
    })

    it('the success action should only contain the payload fields specified', () => {
      const state = {
        exercises: {
          data: {},
          requests: {}
        },
        authentication: {
          token: '123'
        }
      }
      const store = createFakeStore(state)
      sinon.stub(store, 'dispatch')

      const callback = sinon.stub()

      const action = {
        type: 'FETCH_EXERCISES',
        status: 'pending',
        query: `{
          exercises {
            id, name
          },
          exerciseCount
        }`
      }

      const payload = {
        exerciseCount: 0,
        exercises: []
      }

      return target(store)(callback)(action).then(() => {
        expect(store.dispatch).to.have.been.calledWith(sinon.match({
          payload,
          type: 'FETCH_EXERCISES',
          status: 'success'
        }))
      })
    })
  })

  describe('When data is already fetched, but outside of the time boundary', () => {
    let clock

    before(() => {
      clock = sinon.useFakeTimers()
    })

    after(() => {
      clock.restore()
    })

    afterEach(() => {
      clock.reset()
    })

    beforeEach(() => {
      moxios.stubRequest('http://localhost:4000/api/graphql', {
        status: 200,
        responseText: JSON.stringify({
          data: {
            exercises: [],
            exerciseCount: 0
          }
        })
      })
    })

    it('should dispatch the original pending action', () => {
      const entities = { id: '1' }
      const order = ['1']
      const response = {
        response: ['1'],
        status: 'success',
        timestamp: new Date()
      }

      const query = `{
        exercises {
          id, name
        },
        exerciseCount
      }`

      const state = {
        exercises: {
          data: {
            entities,
            order
          },
          requests: {
            [query]: response
          }
        },
        authentication: {
          token: '123'
        }
      }
      const store = createFakeStore(state)
      clock.tick(1000 * 60 * 5)
      clock.tick(1) //past 5 minutes

      const callback = sinon.stub()

      const action = {
        query,
        type: 'FETCH_EXERCISES',
        status: 'pending',
      }

      return target(store)(callback)(action).then(() => {
        expect(callback).to.have.been.calledWith(action)
      })
    })

    it('should dispatch a success action', () => {
      const entities = { id: '1' }
      const order = ['1']
      const response = {
        response: ['1'],
        status: 'success',
        timestamp: new Date()
      }

      const query = `{
        exercises {
          id, name
        },
        exerciseCount
      }`

      const state = {
        exercises: {
          data: {
            entities,
            order
          },
          requests: {
            [query]: response
          }
        },
        authentication: {
          token: '123'
        }
      }
      const store = createFakeStore(state)
      sinon.stub(store, 'dispatch')

      clock.tick(1000 * 60 * 5)
      clock.tick(1) //past 5 minutes

      const callback = sinon.stub()

      const action = {
        query,
        type: 'FETCH_EXERCISES',
        status: 'pending',
      }

      return target(store)(callback)(action).then(() => {
        expect(store.dispatch).to.have.been.calledWith(sinon.match({
          type: 'FETCH_EXERCISES',
          status: 'success'
        }))
      })
    })
  })

  describe('When data is attempted to be fetched, but failed', () => {
    let clock

    before(() => {
      clock = sinon.useFakeTimers()
    })

    after(() => {
      clock.restore()
    })

    afterEach(() => {
      clock.reset()
    })

    beforeEach(() => {
      moxios.stubRequest('http://localhost:4000/api/graphql', {
        status: 200,
        responseText: JSON.stringify({
          data: {
            exercises: [],
            exerciseCount: 0
          }
        })
      })
    })

    it('should dispatch the original pending action', () => {
      const entities = { id: '1' }
      const order = ['1']
      const response = {
        response: 'some error',
        status: 'failed',
        timestamp: new Date()
      }

      const query = `{
        exercises {
          id, name
        },
        exerciseCount
      }`

      const state = {
        exercises: {
          data: {
            entities,
            order
          },
          requests: {
            [query]: response
          }
        },
        authentication: {
          token: '123'
        }
      }
      const store = createFakeStore(state)

      const callback = sinon.stub()

      const action = {
        query,
        type: 'FETCH_EXERCISES',
        status: 'pending',
      }

      return target(store)(callback)(action).then(() => {
        expect(callback).to.have.been.calledWith(action)
      })
    })

    it('should dispatch a success action', () => {
      const entities = { id: '1' }
      const order = ['1']
      const response = {
        response: 'some error',
        status: 'failed',
        timestamp: new Date()
      }

      const query = `{
        exercises {
          id, name
        },
        exerciseCount
      }`

      const state = {
        exercises: {
          data: {
            entities,
            order
          },
          requests: {
            [query]: response
          }
        },
        authentication: {
          token: '123'
        }
      }
      const store = createFakeStore(state)
      sinon.stub(store, 'dispatch')

      clock.tick(1000 * 60 * 5)
      clock.tick(1) //past 5 minutes

      const callback = sinon.stub()

      const action = {
        query,
        type: 'FETCH_EXERCISES',
        status: 'pending',
      }

      return target(store)(callback)(action).then(() => {
        expect(store.dispatch).to.have.been.calledWith(sinon.match({
          type: 'FETCH_EXERCISES',
          status: 'success'
        }))
      })
    })
  })

  describe('When data is already succesfully fetched', () => {
    it('should dispatch any action', () => {
      const entities = { id: '1' }
      const order = ['1']
      const response = {
        response: ['1'],
        status: 'success',
        type: 'FETCH_EXERCISES',
        timestamp: new Date()
      }

      const query = `{
        exercises {
          id, name
        },
        exerciseCount
      }`

      const state = {
        exercises: {
          data: {
            entities,
            order
          },
          requests: {
            [query]: response
          }
        },
        authentication: {
          token: '123'
        }
      }
      const store = createFakeStore(state)
      sinon.stub(store, 'dispatch')

      const callback = sinon.stub()

      const action = {
        query,
        type: 'FETCH_EXERCISES',
        status: 'pending',
      }

      return target(store)(callback)(action).then(() => {
        expect(callback).to.not.have.been.called
        expect(store.dispatch).to.not.have.been.called
      })
    })
  })
})