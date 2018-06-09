import React from 'react'
import { clearNotification } from '../reducers/notificationReducer'

class Notification extends React.Component {

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    if(this.props.store.getState().notification)
      setTimeout(() => {
        this.props.store.dispatch(clearNotification()
        )}, 3000)

    return (
      <div style={style}>
        {this.props.store.getState().notification }
      </div>
    )
  }
}

export default Notification
