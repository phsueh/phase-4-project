import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './component/Home'
import PostContainer from './component/PostContainer'
import SignInForm from './component/SignInForm'
import SignUpForm from './component/SignUpForm'


export default class App extends Component {

  state = {
    id: 0,
    username: '',
    bio: '',
    experience: '',
    location: '',
    ask_salary: 0,
    current_position: '',
    desired_job_title: '',
    posts: [],
    token: ''
  }

  componentDidMount(){
    if(localStorage.token) {
      fetch('/me', {
        headers: {
          "authorization" : localStorage.token
        }
      })
        .then(res => res.json())
        .then(this.login)
    }
  }

  login = (userInfo) => {
    console.log(userInfo)
    this.setState({
      id: userInfo.user.id,
      username: userInfo.user.username,
      bio: userInfo.user.bio,
      experience: userInfo.user.experience,
      location: userInfo.user.location,
      ask_salary: userInfo.user.ask_salary,
      current_position: userInfo.user.current_position,
      desired_job_title: userInfo.user.desired_job_title,
      posts: userInfo.user.posts,
      token: userInfo.token
    })
    localStorage.token = userInfo.token
  }

  logOut = () => {
    this.setState({
      id: 0,
      username: '',
      bio: '',
      experience: '',
      location: '',
      ask_salary: 0,
      current_position: '',
      desired_job_title: '',
      posts: [],
      token: ''
    })
    localStorage.clear()
  }

  render() {
    console.log(localStorage.token)
    return (
      <Switch>
        <Route exact path='/'>
          <Home username={this.state.username} logout={this.logOut}/>
          <SignInForm login={this.login}/>
          <SignUpForm login={this.login}/>
        </Route>
        <Route path='/posts'>
          <PostContainer/>
        </Route>
      </Switch>
    )
  }
}
