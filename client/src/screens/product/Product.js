import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Rating, Image } from 'semantic-ui-react'

const Product = ({ product }) => {
  return (
    <>
      <Card as={Link} to={`/products/${product._id}`}>
        <Image
          src={product.image}
          alt={product.name}
          style={{ height: '180px' }}
        />

        <Card.Content>
          <Card.Header>{product.name}</Card.Header>
          <Card.Meta style={{ marginTop: '1vh' }}>
            <Rating
              icon='star'
              rating={product.rating}
              maxRating={5}
              disabled
            />{' '}
            {product.countReviews + ' reviews'}
          </Card.Meta>
          <Card.Description>
            {product.description.substring(0, 100) + '...'}
          </Card.Description>
        </Card.Content>

        <Card.Content extra>$ {product.price}</Card.Content>
      </Card>
    </>
  )
}

export default Product
