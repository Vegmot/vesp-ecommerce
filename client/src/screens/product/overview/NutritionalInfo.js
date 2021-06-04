import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const NutritionalInfo = ({ product }) => {
  return (
    <>
      {product.isVegan && (
        <h5>
          <span>
            <Icon name='vimeo' />
          </span>
          Vegan{' '}
        </h5>
      )}

      {product.isNONGMO && (
        <h5>
          <span>
            <Icon name='gofore' />
          </span>
          NON-GMO{' '}
        </h5>
      )}

      {product.isKosher && (
        <h5>
          <span>
            <Icon name='kickstarter k' />
          </span>
          Kosher
        </h5>
      )}

      {product.isCrueltyFree && (
        <h5>
          <span>
            <Icon name='copyright outline' />
          </span>
          Cruelty-free
        </h5>
      )}

      {product.isOrganic && (
        <h5>
          <span>
            <Icon name='opera' />
          </span>
          Organic
        </h5>
      )}

      {product.isGlutenFree && (
        <h5>
          <span>
            <Icon name='pie graph' />
          </span>
          Gluten-free
        </h5>
      )}

      {product.isAllergenFree && (
        <h5>
          <span>
            <Icon name='vimeo' />
          </span>
          Allergen-free
        </h5>
      )}
    </>
  )
}

export default NutritionalInfo
