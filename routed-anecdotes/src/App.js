import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {
  ListGroup, ListGroupItem, Image, Grid, Row, Col, Alert, Jumbotron, FormGroup,
  ControlLabel, FormControl, Button, Navbar, Nav, NavItem
} from 'react-bootstrap'

const Menu = () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        Anecdote app
    </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem href="#">
          <Link to="/">anecdotes</Link>
        </NavItem>
        <NavItem href="#">
          <Link to="/create">create new</Link>
        </NavItem>
        <NavItem href="#">
          <Link to="/about">about</Link>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      )}
    </ListGroup>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <Jumbotron>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <div>has {anecdote.votes} votes</div>
    <div>for more see <a>{anecdote.info}</a></div>
  </Jumbotron>
)

const About = () => (
  <Grid>
    <Row>
      <Col md={8}>
        <h2>About anecdote app</h2>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Col>
      <Col>
        <Image src="https://myhero.com/images/guest/g27620/hero25988/g27620_u25887_chimage.jpeg" thumbnail />
      </Col>
    </Row>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>content</ControlLabel>
            <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>author</ControlLabel>
            <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>url for more info</ControlLabel>
            <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Button type="submit" bsStyle="success">create</Button>
          </FormGroup>
        </form>
      </div>
    )

  }
}


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.setState({ notification: `a new ancdote ${anecdote.content} created!` })
    setTimeout(() => this.setState({ notification: '' }), 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }



  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <Menu />
            {(this.state.notification &&
              <Alert color="succes">{this.state.notification}</Alert>
            )}            
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/about" render={() => <About />} />
            <Route path="/create" render={({ history }) => <CreateNew history={history} addNew={this.addNew} />} />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

// const notificationStyle = {
//   color: 'green',
//   fontSize: 16,
//   borderStyle: 'solid',
//   borderWidth: 1,
//   borderRadius: 5,
//   padding: 10,
//   margin: 5
// }

// const menuStyle = {
//   backgroundColor: 'lightblue',
//   padding: 10,
//   margin: 5
// }

export default App;
