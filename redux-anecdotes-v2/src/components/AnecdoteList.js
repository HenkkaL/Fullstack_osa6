import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import Filter from '../components/Filter'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  vote = async (anecdote) => {
    anecdote.votes = anecdote.votes + 1
    const updatedAnecdote = await anecdoteService.update(anecdote)
    console.log(updatedAnecdote)
    this.props.voteAnecdote(updatedAnecdote)
  }
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotesToShow.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                this.vote(anecdote)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const filterAndSort = (anecdotes, filter) => {
  return anecdotes.filter(a => a.content.includes(filter)).sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  console.log(state.anecdotes)
  return {
    anecdotesToShow: filterAndSort(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { voteAnecdote }
)(AnecdoteList)
export default ConnectedAnecdoteList
