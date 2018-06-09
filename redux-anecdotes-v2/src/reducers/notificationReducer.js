const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'VOTE':
    return `You voted: ${action.anecdote.content}`
  case 'CREATE':
    return `you added new anecdote ${action.content}`
  case 'CLEAR':
    return ''
  default:
    return state
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

export const notification = (anecdote) => {
  return {
    type: 'SET_NOTIFICATION',
    anecdote
  }
}

export default notificationReducer