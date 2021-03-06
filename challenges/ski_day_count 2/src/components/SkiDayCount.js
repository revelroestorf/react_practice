import React, { Component } from 'react'
import '../stylesheets/ui.scss'

export class SkiDayCount extends Component {

  render(props) {
    return (
      <div className="ski-day-count">
        <div className="total-days">
          <span>{this.props.total}</span>
          <span>days</span>
        </div>
        <div className="powder-days">
          <span>{this.props.powder}</span>
          <span>days</span>
        </div>
        <div clasName="backcountry-days">
          <span>{this.props.backcountry}</span>
          <span>days</span>
        </div>
        <div>
          <span>{this.props.goal}</span>
        </div>
      </div>
    )
  }
}
