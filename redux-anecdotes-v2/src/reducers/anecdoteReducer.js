

const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.anecdote.id)
    return [...old, action.anecdote ]
  }
  if (action.type === 'CREATE') {
    return [...store, action.content]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.data
  }
  return store
}

export const anecdoteInit = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export const submitAnecdote = (content) => {
  return {
    type: 'CREATE',
    content
  }
}

export const voteAnecdote = (anecdote) => {
  return {
    type: 'VOTE',
    anecdote
  }
}

export const filter = (content) => {
  return {
    type: 'FILTER',
    content
  }
}

export default reducer