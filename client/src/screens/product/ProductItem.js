import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Grid, Image } from 'semantic-ui-react'
import axios from 'axios'

import styles from './ProductItem.module.css'

const ProductItem = ({ match }) => {
  const productID = match.params.pid
  const [product, setProduct] = useState({})

  const userLogin = useSelector(state => state.userLogin)
  const { userData } = userLogin

  useEffect(() => {
    getProductDetail(productID)
  }, [productID])

  const getProductDetail = async pid => {
    const res = await axios.get(`/api/products/product/${pid}`)

    console.log(res)

    setProduct(res.data)
  }

  return (
    <>
      <Container>
        <section className={styles['product-item-screen']}>
          {userData ? 'You are logged in' : 'You are not logged in'}
          <h2>Product Details</h2>

          <Grid>
            <Grid.Row>
              <Grid.Column
                width={12}
                className={styles['product-item-container']}
                style={{ padding: 0 }}
              >
                {product ? (
                  <>
                    <div className={styles['product-item']}>
                      <div className={styles['product-item-top']}>
                        <div className={styles['product-item-image']}>
                          <Image src={product.image} alt={product.name} />
                        </div>

                        <div className={styles['product-item-info']}>
                          <p>Product name: {product.name}</p>
                          <p>Price: $ {product.price}</p>
                          <p>Brand: {product.brand}</p>
                          <p>
                            Category:{' '}
                            {product.category.charAt(0).toUpperCase() +
                              product.category.substring(1)}
                          </p>
                          <p>{product.countReviews} reviews</p>
                        </div>
                      </div>

                      <div className={styles['product-item-bottom']}>
                        <div className={styles['product-item-description']}>
                          <p>{product.description}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  'Failed to load product'
                )}
              </Grid.Column>

              <Grid.Column width={2} className={styles['sidebar']}>
                Cart and Checkout
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </section>

        <section
          className={styles['product-item-reviews']}
          style={{ marginTop: '2vh' }}
        >
          <h2>Reviews</h2>
          <Grid>
            <Grid.Row>
              <Grid.Column
                width={12}
                className={styles['product-item-reviews-container']}
              ></Grid.Column>
            </Grid.Row>
          </Grid>
        </section>
      </Container>
    </>
  )
}

export default ProductItem
