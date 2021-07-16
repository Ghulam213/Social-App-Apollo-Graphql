import { gql } from '@apollo/client'

// POST

const POST_FIELDS = gql`
  fragment postFields on Post {
    id
    username
    body
    createdAt
    commentCount
    likeCount
    comments {
      id
      body
      username
      createdAt
    }
    likes {
      id
      username
      createdAt
    }
  }
`

export const GET_ALL_POSTS = gql`
  query getAllPosts {
    getPosts {
      ...postFields
    }
  }
  ${POST_FIELDS}
`

export const GET_POST = gql`
  query getPost($input: ID!) {
    getPost(input: $input) {
      ...postFields
    }
  }
  ${POST_FIELDS}
`

export const CREATE_POST = gql`
  mutation createPost($input: String!) {
    createPost(input: $input) {
      ...postFields
    }
  }
  ${POST_FIELDS}
`

export const DELETE_POST = gql`
  mutation deletePost($input: ID!) {
    deletePost(input: $input) {
      id
    }
  }
`

export const LIKE_POST = gql`
  mutation likePost($input: ID!) {
    likePost(input: $input) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`

// COMMENT

export const CREATE_COMMENT = gql`
  mutation createComment($input: CommentInput!) {
    createComment(input: $input) {
      id
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation deleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
      id
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`

// USER

const USER_FIELDS = gql`
  fragment userFields on User {
    id
    username
    token
    createdAt
    email
  }
`

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      ...userFields
    }
  }
  ${USER_FIELDS}
`

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterInput!) {
    register(input: $input) {
      ...userFields
    }
  }
  ${USER_FIELDS}
`
