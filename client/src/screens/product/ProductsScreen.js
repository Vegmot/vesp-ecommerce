import React, { useState, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Container, Card, Loader, Dropdown } from 'semantic-ui-react'
import Product from './Product'
import CreateProductButton from '../../components/CreateProductButton'
import { useProductsInfiniteScroll } from '../../utils/useInfiniteScroll'

import styles from './ProductsScreen.module.css'

const ProductsScreen = ({ match }) => {
  const [page, setPage] = useState(1)
  const keyword = match.params.keyword || ''
  const sortBy = match.params.sortBy || ''
  const { loading, error, products, hasMore } = useProductsInfiniteScroll(
    page,
    keyword,
    sortBy
  )

  const observer = useRef()
  const lastProductRef = useCallback(
    node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPN => prevPN + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  const userLogin = useSelector(state => state.userLogin)
  const { userData } = userLogin

  return (
    <>
      <section className={styles['products-screen']}>
        <Container>
          <h1>Products</h1>

          <Card.Group itemsPerRow={4} centered>
            {products &&
              products.length > 0 &&
              products.map((product, index) => {
                if (products.length === index + 1) {
                  return (
                    <div
                      ref={lastProductRef}
                      className={styles['ui-card']}
                      key={product._id}
                    >
                      <Product product={product} />
                    </div>
                  )
                } else {
                  return (
                    <div className={styles['ui-card']} key={product._id}>
                      <Product product={product} />
                    </div>
                  )
                }
              })}
          </Card.Group>
        </Container>

        {userData && userData.isAdmin && <CreateProductButton />}
      </section>

      {loading && <Loader active inline='centered' size='big' />}
      {error && !loading && <p>{error}</p>}
    </>
  )
}

export default ProductsScreen
