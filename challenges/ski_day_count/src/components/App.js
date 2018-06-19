import React, { Component } from 'react'
import { SkiDayCount } from './SkiDayCount'
import { SkiDayList } from './SkiDayList'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allSkiDays: [
        {
          resort: "Squaw Valley",
          date: new Date("1/2/2016"),
          powder: true,
          backcountry: false
        },
        {
          resort: "Kirkwood",
          date: new Date("3/28/2016"),
          powder: false,
          backcountry: false
        },
        {
          resort: "Mt. Tallac",
          date: new Date("4/2/2016"),
          powder: false,
          backcountry: true
        }
      ]
    }
  }
  countDays(filter) {
    return this.state.filter(
      (day) => (filter) ? day[filter] : day).length
  }
  render() {
    return (
      <div className="App">
        <SkiDayList days={this.state} />
        <SkiDayCount total={this.countDays}
                     powder={this.countDays(powder)}
                     backcountry={this.countDays(backcountry)}/>
      </div>
    )
  }
}
