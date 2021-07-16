import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { DELETE_POST, GET_ALL_POSTS, DELETE_COMMENT } from '../graphql'

import { Button, Confirm, Popup } from 'semantic-ui-react'

const DeleteButton = ({ postId, commentId, forPreview, successCallback }) => {
  const [openConfirm, setOpenConfirm] = useState(false)

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST

  const [deletePostOrComment, { loading }] = useMutation(mutation, {
    variables: {
      input: commentId ? { postId, commentId } : postId,
    },
    update: (caches, { data: { deletePost } }) => {
      if (!commentId) {
        const data = caches.readQuery({ query: GET_ALL_POSTS })
        caches.writeQuery({
          query: GET_ALL_POSTS,
          data: {
            getPosts: data.getPosts.filter((p) => p.id !== deletePost.id),
          },
        })
      }
      if (successCallback) successCallback()
    },
  })

  const confirmDelete = () => {
    setOpenConfirm(false)
    deletePostOrComment()
  }

  return (
    <>
      <Popup
        content={commentId ? 'Delete Comment' : 'Delete Post'}
        inverted
        trigger={
          <Button
            loading={loading}
            as='div'
            floated='right'
            color='red'
            icon='trash alternate'
            onClick={() => setOpenConfirm(true)}
            disabled={forPreview}
          />
        }
      />
      <Confirm
        open={openConfirm}
        header='Delete Post??'
        onCancel={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
      />
    </>
  )
}

export default DeleteButton
