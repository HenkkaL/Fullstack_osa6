import React from 'react'
import { submitAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const anecdote = {
      content: e.target.anecdote.value,
      votes: 0
    }
    e.target.anecdote.value = ''
    this.props.submitAnecdote(anecdote)
    this.props.notify(`You added new anecdote "${anecdote.content}"`, 3)
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
  { submitAnecdote, notify }
)(AnecdoteForm)
