import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'semantic-ui-react'
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
      <section>
        <Container>
          {product ? (
            <>
              <div>{product.name}</div>
              <div>$ {product.price}</div>
            </>
          ) : (
            'Failed to load product'
          )}
        </Container>
      </section>
    </>
  )
}

export default ProductItem
