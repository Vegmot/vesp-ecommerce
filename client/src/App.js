import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ModalManager from './components/modals/ModalManager'
import Navbar from './components/layout/navbar/Navbar'
import ProductsScreen from './screens/product/ProductsScreen'
import ProductItem from './screens/product/ProductItem'

const App = () => {
  return (
    <>
      <ModalManager />
      <Navbar />
      <Switch>
        <Route exact path='/products/:pid' component={ProductItem} />
        <Route
          exact
          path='/products/category/:category'
          component={ProductsScreen}
        />
        <Route exact path='/' component={ProductsScreen} />
      </Switch>
    </>
  )
}

export default App
