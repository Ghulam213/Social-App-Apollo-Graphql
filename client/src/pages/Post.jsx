import { useContext, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import moment from 'moment'

import { AuthContext } from '../context/auth'
import { GET_POST, CREATE_COMMENT } from '../graphql'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'

import {
  Grid,
  Dimmer,
  Loader,
  Image,
  Card,
  Button,
  Form,
  Popup,
} from 'semantic-ui-react'

const Post = (props) => {
  const { user } = useContext(AuthContext)
  const postId = props.match.params.postId

  const deletePostSuccess = () => props.history.push('/')

  const [comment, setComment] = useState('')

  const { data, loading, error } = useQuery(GET_POST, {
    variables: { input: postId },
  })

  const [createComment, { loading: commentLoading }] = useMutation(
    CREATE_COMMENT,
    {
      update: (_, __) => {
        setComment('')
      },
    }
  )

  const createCommentCallback = () => {
    createComment({
      variables: {
        input: { postId: postId, body: comment },
      },
    })
  }

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>
    )
  }

  if (error) {
    return <h3>{error.message}</h3>
  }

  const {
    id,
    username,
    body,
    createdAt,
    likeCount,
    commentCount,
    likes,
    comments,
  } = data.getPost

  return (
    <Grid centered>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            floated='right'
            size='small'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton
                post={{
                  id,
                  likeCount,
                  likes,
                }}
                user={user}
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
                      content: commentCount,
                    }}
                    as='div'
                    onClick={() => console.log('commented')}
                  />
                }
              />
              {user && user.username === username && (
                <DeleteButton postId={id} successCallback={deletePostSuccess} />
              )}
            </Card.Content>
          </Card>
          {user && (
            <Card fluid>
              <Card.Content>
                <Card.Header>Add a Comment</Card.Header>
                <Form noValidate onSubmit={createCommentCallback}>
                  <Form.Input
                    placeholder='What you have on your mind?'
                    name='body'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    type='submit'
                    primary
                    loading={commentLoading}
                    disabled={comment.trim() === ''}
                  >
                    Comment
                  </Button>
                </Form>
              </Card.Content>
            </Card>
          )}
          {comments.map((c) => (
            <Card fluid key={c.id}>
              <Card.Content>
                <Card.Header>{c.username}</Card.Header>
                <Card.Meta>{moment(c.createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{c.body}</Card.Description>
                {user && user.username === c.username && (
                  <DeleteButton postId={id} commentId={c.id} />
                )}
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Post
