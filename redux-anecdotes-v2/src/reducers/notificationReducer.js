const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.content
  case 'CLEAR': {
    return null
  }
  default:
    return state
  }
}

export const notify = (content, delay) => {
  return (dispatch) => {
    dispatch ({
      type: 'NOTIFY',
      content
    })
    setTimeout(() => {
      dispatch ({
        type: 'CLEAR'
      })
    }, delay*1000)
  }
}

export default notificationReducer