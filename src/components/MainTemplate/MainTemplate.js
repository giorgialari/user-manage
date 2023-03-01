import React, {Component} from 'react'
import '../MainTemplate/MainTemplate.css'
import Header from './Header'
import Footer from './Footer'

export class MainTemplate extends Component {
    render() {
      return (
        <div>
          <Header></Header>
          {this.props.children}
          <Footer></Footer>
        </div>
      )
    }
  }
  
  export default MainTemplate
  