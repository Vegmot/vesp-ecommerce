import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Container, Card } from 'semantic-ui-react'
import Product from './Product'
import CreateProductButton from '../../components/CreateProductButton'

import styles from './ProductsScreen.module.css'

const ProductsScreen = () => {
  const [products, setProducts] = useState([])

  const userLogin = useSelector(state => state.userLogin)
  const { userData } = userLogin

  useEffect(() => {
    getAllProducts()
  }, [])

  const getAllProducts = async () => {
    const res = await axios.get('/api/products')

    setProducts(res.data.products)
  }

  return (
    <section className={styles['products-screen']}>
      <Container>
        <h1>Products</h1>

        <Card.Group itemsPerRow={4} centered>
          {products &&
            products.length > 0 &&
            products.map(product => (
              <div className={styles['ui-card']}>
                <Product key={product._id} product={product} />
              </div>
            ))}
        </Card.Group>
      </Container>

      {userData && userData.isAdmin && <CreateProductButton />}
    </section>
  )
}

export default ProductsScreen
