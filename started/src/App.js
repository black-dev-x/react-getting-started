import React from 'react';
import './App.css';

const testData = [
  {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
  {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
];

class Form extends React.Component {

  userNameInput = React.createRef()

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.userNameInput.current.value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="gitHub username" ref={this.userNameInput} required/>
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
    profiles: testData
  }

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form></Form>
        <CardList profiles={this.state.profiles}></CardList>
      </div>
    )
  }
}

export default App;
