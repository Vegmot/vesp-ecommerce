import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ModalManager from './components/modals/ModalManager'
import Navbar from './components/layout/navbar/Navbar'
import ProductsScreen from './screens/product/ProductsScreen'
import ProductItem from './screens/product/ProductItem'
import CartScreen from './screens/cart/CartScreen'
import ProfileScreen from './screens/user/ProfileScreen'
import OrderScreen from './screens/order/OrderScreen'
import ShippingScreen from './screens/order/ShippingScreen'
import BillingScreen from './screens/order/BillingScreen'

const App = () => {
  return (
    <>
      <ModalManager />
      <Navbar />
      <Switch>
        <Route exact path='/confirm-order' component={OrderScreen} />
        <Route exact path='/billing' component={BillingScreen} />
        <Route exact path='/shipping' component={ShippingScreen} />
        <Route exact path='/orders' component={OrderScreen} />
        <Route exact path='/profile' component={ProfileScreen} />
        <Route exact path='/cart' component={CartScreen} />
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
