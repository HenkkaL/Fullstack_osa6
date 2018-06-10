import React from 'react'
import { clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const { notification } = this.props
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    if(notification)
      setTimeout(() => {
        this.props.clearNotification()}, 3000)

    return (
      <div style={style}>
        { notification }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  clearNotification
}

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)

export default ConnectedNotification
