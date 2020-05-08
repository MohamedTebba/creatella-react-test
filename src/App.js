import React from 'react';
//styles
import './styles/basic.scss'
import './styles/header.scss'
//components
import ProductsList from './ProductsList'

class App extends React.Component {

 shouldComponentUpdate(){
   return false
 }

  render(){
    return (
      <div className="App">
      <header>
        <h1>Products Grid</h1>
        <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
      </header>
      <ProductsList/>
      </div>
    )

  }
  
}

export default App;