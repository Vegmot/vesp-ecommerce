import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Grid, Image, Rating } from 'semantic-ui-react'
import axios from 'axios'
import ProductReviews from './reviews/ProductReviews'

import styles from './ProductItem.module.css'
import PurchaseOverview from './overview/PurchaseOverview'

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
                width={10}
                className={styles['product-item-container']}
                style={{ padding: 0 }}
              >
                {product ? (
                  <>
                    <div className={styles['product-item']}>
                      <div className={styles['product-item-top']}>
                        <div className={styles['product-item-image']}>
                          <Image
                            src={product.image && product.image}
                            alt={product.name}
                          />
                        </div>

                        <div className={styles['product-item-info']}>
                          <p>Name: {product.name && product.name}</p>

                          <p>Price: $ {product.price && product.price}</p>

                          <p>Brand: {product.brand && product.brand}</p>

                          <p>
                            Category:{' '}
                            {product.category &&
                              product.category.charAt(0).toUpperCase() +
                                product.category.substring(1)}
                          </p>

                          <Rating
                            icon='star'
                            rating={product.rating}
                            maxRating={5}
                            disabled
                          />
                          <p>
                            {product.countReviews && product.countReviews}{' '}
                            review(s)
                          </p>
                        </div>
                      </div>

                      <div className={styles['product-item-bottom']}>
                        <div className={styles['product-item-description']}>
                          <p>{product.description && product.description}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  'Failed to load product'
                )}
              </Grid.Column>

              <Grid.Column width={2}></Grid.Column>

              <Grid.Column width={4} className={styles['sidebar']}>
                <PurchaseOverview product={product} />
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
                width={10}
                className={styles['product-item-reviews-container']}
              >
                {product.countReviews > 0
                  ? product.reviews.map(review => {
                      return <ProductReviews key={review._id} review={review} />
                    })
                  : 'This product has no reviews'}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </section>
      </Container>
    </>
  )
}

export default ProductItem
