import { useContext, useState } from 'react'
import { useMutation } from '@apollo/client'

import { AuthContext } from '../context/auth'
import PostCard from '../components/PostCard'

import { useForm } from '../hooks/useForm'

import { Form, Button } from 'semantic-ui-react'
import { GET_ALL_POSTS, CREATE_POST } from '../graphql'

const AddPost = (props) => {
  const { user } = useContext(AuthContext)
  const [error, setError] = useState(null)

  const { onChange, onSubmit, values } = useForm({ body: '' }, addPostCallback)

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update: (caches, { data: { createPost: post } }) => {
      const data = caches.readQuery({ query: GET_ALL_POSTS })
      caches.writeQuery({
        query: GET_ALL_POSTS,
        data: { getPosts: [post, ...data.getPosts] },
      })
      props.history.push('/')
    },
    onError: (err) => {
      setError(err.graphQLErrors[0].message)
    },
  })

  function addPostCallback() {
    setError(null)
    createPost({
      variables: {
        input: values.body,
      },
    })
  }

  return (
    <div>
      <h1 className='page-title'>Add Post</h1>
      {error && (
        <div className='ui error message'>
          <p>{error}</p>
        </div>
      )}
      <Form noValidate onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <h1>{`@${user.username}`}</h1>
        <Form.TextArea
          label='Body'
          placeholder='What you have on your mind?'
          name='body'
          value={values.body}
          onChange={onChange}
          error={error}
        />
        <Button type='submit' primary>
          Post
        </Button>
      </Form>
      <hr />
      <h1 className='page-title'>Preview</h1>
      <PostCard
        post={{
          id: 'previewId',
          username: user.username,
          body: values.body,
          createdAt: new Date().toISOString(),
          likeCount: 0,
          commentCount: 0,
          likes: [],
          comment: [],
        }}
        forPreview
      />
    </div>
  )
}

export default AddPost
