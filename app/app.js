import './app.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ReduxThunk from 'redux-thunk'

import middlewares from './middlewares/index'

import reducers from './reducers/index'

import Root from './containers/root'
import Exercises from './sections/exercises/containers/list'
import NewExercise from './sections/exercises/containers/new'
import ExerciseDetails from 'app/sections/exercises/containers/details'
import Workouts from './containers/workouts'
import WorkoutDetail from './containers/workout_detail'
import NewWorkout from './containers/new_workout'
import EditWorkout from './containers/edit_workout'

import Progress from './containers/progress'

import injectTapEventPlugin from 'react-tap-event-plugin'

import { Router, Route, hashHistory, IndexRoute } from 'react-router'

let composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

if (process.env.NODE_ENV === 'production') { //eslint-disable-line
  composeEnhancers = compose
}

const enhancer = composeEnhancers(
  applyMiddleware(ReduxThunk, ...middlewares)
)

const token = localStorage.getItem('auth_token')
const initialState = {
  authentication: {
    token,
    loginState: token ? 'logged_in' : 'logged_out'
  }
}

//middleware not loaded?
const store = createStore(reducers, initialState, enhancer)

injectTapEventPlugin()

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
        <Route path="/" component={Root}>
          <IndexRoute component={Exercises} />
          <Route path="/exercises/new" component={NewExercise} />
          <Route path ="/exercises/:id" component={ExerciseDetails} />
          <Route path ="/workouts" component={Workouts} />
          <Route path="/workouts/new" component={NewWorkout} />
          <Route path="/workouts/:id" component={WorkoutDetail} />
          <Route path="/workouts/:id/edit" component={EditWorkout} />
          <Route path="/progress" component={Progress} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('#root'))