import React from 'react';
import './App.css';
import axios from 'axios';

class Form extends React.Component {

  state = { userName: ''}

  handleSubmit = async (event) => {
    event.preventDefault()
    const response = await axios.get(`https://api.github.com/users/${this.state.userName}`)
    this.setState({userName: ''})
    this.props.onSubmit(response.data)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="gitHub username" 
          value={this.state.userName} onChange={event => this.setState({ userName: event.target.value})} 
          required/>
        <button>Add card</button>
      </form>
    )
  }
}

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card {...profile}></Card>)}
  </div>
)

class Card extends React.Component {
  render() {
    const profile = this.props;
    return( 
    <div className="github-profile">
      <img src={profile.avatar_url}/>
      <div className="info">
        <div className="name">{profile.name}</div>
        <div className="company">{profile.company}</div>
      </div>
    </div>
    )
  }
}

class App extends React.Component {

  state = {
    profiles: []
  }

  addNewProfile = profile => {
    this.setState({profiles: [profile, ...this.state.profiles]})
  }

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}></Form>
        <CardList profiles={this.state.profiles}></CardList>
      </div>
    )
  }
}

export default App;
