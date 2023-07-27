import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  c="rksid"
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <News pageSize={25}/>
      </div>
    )
  }
}
