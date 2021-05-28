import { useEffect, useState } from 'react'
import axios from 'axios'

export const useProductsInfiniteScroll = (page, keyword = '', sortBy = '') => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)

    axios({
      method: 'GET',
      url: '/api/products',
      params: { page, keyword, sortBy },
    })
      .then(res => {
        setProducts(prevProducts => {
          return [...prevProducts, ...res.data.products.map(product => product)]
        })
        setHasMore(res.data.products.length > 0)
        setLoading(false)
      })
      .catch(e => {
        setError(e.message)
        setLoading(false)
      })
  }, [page, keyword, sortBy])
  return { loading, error, products, hasMore }
}
