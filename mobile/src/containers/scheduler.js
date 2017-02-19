import React, { PropTypes, Component } from 'react'
import {
  View,
  ListView,
} from 'react-native'
import { connect } from 'react-redux'

import style from '../styles/main'
import * as actions from '../actions/actions'

import Schedule from '../components/schedule'

class Scheduler extends Component {

  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (oldRowValue, newRowValue) => oldRowValue !== newRowValue,
    })

    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.schedules),
    }

    this.selectSchedule = this.selectSchedule.bind(this)
    this.toggleSchedule = this.toggleSchedule.bind(this)
    this.saveTitle = this.saveTitle.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.schedules !== this.props.schedules) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.schedules),
      })
    }
  }

  selectSchedule(uuid) {
    this.props.dispatch(actions.selectSchedule(uuid))
  }

  toggleSchedule(uuid) {
    this.props.dispatch(actions.toggleSchedule(uuid))
  }

  saveTitle(uuid, title) {
    this.props.dispatch(actions.saveTitle(uuid, title))
  }

  render() {
    return (
      <View style={style.body}>
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections
          renderSeparator={(sectionId, rowId) => (
            <View key={rowId} style={style.schedule_divider} />
          )}
          renderRow={(row) => {
            const { uuid, expanded, enabled, time, title, dow } = row
            return (
              <Schedule
                uuid={uuid}
                isExpanded={expanded}
                enabled={enabled}
                time={time}
                title={title}
                dow={dow}
                onSelect={this.selectSchedule}
                onToggle={this.toggleSchedule}
                onTitleChanged={this.saveTitle}
              />
            )
          }}
        />
      </View>
    )
  }
}

Scheduler.propTypes = {
  schedules: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}


export default connect(state => ({
  schedules: state.scheduleReducer.schedules,
}))(Scheduler)
