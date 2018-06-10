import React from 'react'
import { submitAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const anecdote = {
      content: e.target.anecdote.value,
      votes: 0
    }
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(anecdote)
    console.log(newAnecdote)
    this.props.submitAnecdote(newAnecdote)

  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { submitAnecdote }
)(AnecdoteForm)
