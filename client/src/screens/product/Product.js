import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'

const Product = ({ product }) => {
  return (
    <>
      <Card
        image={product.image}
        header={product.name}
        description={product.description.substring(0, 100) + '...'}
        extra={'$ ' + product.price}
        as={Link}
        to={`/products/${product._id}`}
      />
    </>
  )
}

export default Product
