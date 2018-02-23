import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Form, Button, Grid, Image } from 'semantic-ui-react'

const Menu = () => {

  const navStyle = {
    background: '#ddd',
    padding: 10,
  }

  const active = {
    background: 'blue',
    color: 'white',
    padding: 10
  }

  return (
    <div style={navStyle}>
      <NavLink exact to='/' activeStyle={active}>anecdotes</NavLink>&nbsp;
    <NavLink exact to='/create' activeStyle={active}>create new</NavLink>&nbsp;
    <NavLink exact to='/about' activeStyle={active}>about</NavLink>&nbsp;
</div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id} >
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>"{anecdote.content}" by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

const About = () => (
  <Grid>
    <Grid.Column width={10}>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </Grid.Column>
  <Grid.Column  width={6}>
    <Image src="https://upload.wikimedia.org/wikipedia/commons/4/4f/KnuthAtOpenContentAlliance.jpg" />
  </Grid.Column>
  </Grid>
)

const Footer = () => {
  const footerStyle = {
    marginTop:50
  }

  return(<div style={footerStyle}>
    <hr />
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/lopossumi/routed-anecdotes'>https://github.com/lopossumi/routed-anecdotes</a> for the source code.
  </div>)
}

const Notification = ({ notification }) => {
  const style = {
    color: 'green',
    border: '1px solid',
    borderRadius: 10,
    padding: 10,
    margin: 10
  }
  return (notification && <div style={style}>{notification}</div>)
}

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
      <Form onSubmit={this.handleSubmit}>
      <Form.Field>
        <label>Content</label>
        <input name='content' value={this.state.content} onChange={this.handleChange} />
      </Form.Field>
      <Form.Field>
        <label>Author</label>
        <input name='author' value={this.state.author} onChange={this.handleChange} />
      </Form.Field>
      <Form.Field>
        <label>Url for more info</label>
        <input name='info' value={this.state.info} onChange={this.handleChange} />
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
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

  notify = (notification) => {
    this.setState({ notification })
    setTimeout(() => { this.setState({ notification: '' }) }, 10000)
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.notify(`a new anecdote created: "${anecdote.content}".`)
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
      <Container>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification notification={this.state.notification} />
            <Route exact path='/' render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path='/create' render={({ history }) => <CreateNew history={history} addNew={this.addNew} />} />
            <Route path='/about' render={() => <About />} />
            <Route
              exact path='/anecdotes/:id'
              render={({ match }) =>
                <Anecdote anecdote={this.anecdoteById(match.params.id)} />
              } />

            <Footer />
          </div>
        </Router>
      </Container>
    )
  }
}

export default App;
