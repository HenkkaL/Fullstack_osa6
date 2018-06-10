import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.anecdote.id)
    return [...old, action.anecdote]
  }
  if (action.type === 'CREATE') {
    return [...store, action.anecdote]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.anecdotes
  }
  return store
}

export const anecdoteInit = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  }
}

export const submitAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch ({
      type: 'CREATE',
      anecdote: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch ({
      type: 'VOTE',
      anecdote: updatedAnecdote
    })
  }

}

export const filter = (content) => {
  return {
    type: 'FILTER',
    content
  }
}

export default reducer