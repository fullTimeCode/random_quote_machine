import { Component, ReactNode } from 'react'

import './App.css'
import Quote from './components/quote/Quote'

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <Quote />
      </>
    )
  }
}

export default App
