import { useContext } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { AuthContext } from '../context/auth'

import { Card, Image, Button, Popup } from 'semantic-ui-react'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

const PostCard = ({ post, forPreview }) => {
  const { user } = useContext(AuthContext)
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{post.username}</Card.Header>
        <Card.Meta as={Link} to={`/post/${post.id}`} disabled={forPreview}>
          {moment(post.createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{post.body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton
          post={{ id: post.id, likeCount: post.likeCount, likes: post.likes }}
          user={user}
          forPreview={forPreview}
        />
        <Popup
          content='Comment on Post'
          inverted
          trigger={
            <Button
              basic
              content=' '
              color='teal'
              icon='comments'
              label={{
                basic: true,
                color: 'teal',
                pointing: 'left',
                content: post.commentCount,
              }}
              as={Link}
              to={`/post/${post.id}`}
              disabled={forPreview}
            />
          }
        />
        {user && user.username === post.username && (
          <DeleteButton postId={post.id} forPreview={forPreview} />
        )}
      </Card.Content>
    </Card>
  )
}

export default PostCard
