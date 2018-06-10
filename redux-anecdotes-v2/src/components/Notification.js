import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    console.log("notification", this.props)
    const { notification } = this.props
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    if (notification) {
      return (
        <div style={style}>
          {notification}
        </div>
      )}
    return (
      <div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.notification)
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification
