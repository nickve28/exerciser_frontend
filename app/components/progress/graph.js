import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import map from 'lodash-es/map'
import first from 'lodash-es/first'
import last from 'lodash-es/last'
import groupBy from 'lodash-es/groupBy'
import defaults from 'lodash-es/defaults'
import reduce from 'lodash-es/reduce'
import concat from 'lodash-es/concat'
import reverse from 'lodash-es/reverse'

import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

const createEmptyObject = (date) => {
  return [{reps: null, sets: null, weight: null, date: date}] //shame we need to workaround like this..
}

export default ({progress}) => {
  const data = reverse(progress.progress)
  //workaround since dates are not properly supported in this library...
  const startDate = first(data).date
  const endDate = last(data).date
  const dateRange = Array.from(moment.range(startDate, endDate).by('day'))

  const groupedData = groupBy(data, 'date')
  const graphData = reduce(dateRange, (memo, date) => {
    const dateFormatted = moment(date).format('YYYY-MM-DD')
    let progressData = groupedData[dateFormatted] || createEmptyObject(dateFormatted)
    progressData = map(progressData, d => {
      return defaults({date: moment(d.date).format('DD-MM-YY')}, d)
    })

    memo = concat(memo, progressData)
    return memo
  }, [])
  const metric = progress.exerciseMetric

  return (
    <ResponsiveContainer width="95%" height={300}>
      <LineChart data={graphData}>
        <Line type="monotone" name={metric} dataKey="weight" stroke="#8884d8" connectNulls={true} />
        <Line type="monotone" dataKey="reps" stroke="#000000" connectNulls={true} />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  )

}
