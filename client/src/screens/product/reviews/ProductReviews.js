import React from 'react'
import { Comment, Rating } from 'semantic-ui-react'

const ProductReviews = ({ review }) => {
  return (
    <>
      {review && (
        <Comment.Group size='small'>
          <Comment>
            <Comment.Avatar as='a' src={review.avatar} />
            <Comment.Content>
              <Comment.Author as='a'>{review.displayName}</Comment.Author>
              <Comment.Metadata>
                <span>{review.createdAt.substring(0, 10)}</span>
                <Rating
                  icon='star'
                  rating={review.rating}
                  maxRating={5}
                  disabled
                />
              </Comment.Metadata>
              <Comment.Text>{review.text}</Comment.Text>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      )}
    </>
  )
}

export default ProductReviews
