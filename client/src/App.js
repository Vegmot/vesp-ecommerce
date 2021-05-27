import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ModalManager from './components/modals/ModalManager'
import Navbar from './components/layout/navbar/Navbar'
import ProductsScreen from './screens/product/ProductsScreen'

const App = () => {
  return (
    <>
      <ModalManager />
      <Navbar />
      <Switch>
        <Route exact path='/' component={ProductsScreen} />
      </Switch>
    </>
  )
}

export default App
