import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { Button, Icon, Label, Popup } from 'semantic-ui-react'

import { LIKE_POST } from '../graphql'

const LikeButton = ({ post: { id, likeCount, likes }, user, forPreview }) => {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (user && likes.find((l) => l.username === user.username)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [user, likes])

  const [likePost] = useMutation(LIKE_POST, {
    variables: {
      input: id,
    },
  })

  const likeSubButton = user ? (
    liked ? (
      <Button color='teal' onClick={likePost}>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button color='teal' basic onClick={likePost}>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button color='teal' basic as={Link} to='/login'>
      <Icon name='heart' />
    </Button>
  )

  return (
    <Popup
      content={liked ? 'Unlike Post' : 'Like Post'}
      inverted
      trigger={
        <Button as='div' labelPosition='right' disabled={forPreview}>
          {likeSubButton}
          <Label as='a' basic color='teal' pointing='left'>
            {likeCount}
          </Label>
        </Button>
      }
    />
  )
}

export default LikeButton
