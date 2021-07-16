import { useQuery } from '@apollo/client'

import { Grid, Dimmer, Loader } from 'semantic-ui-react'

import PostCard from '../components/PostCard'
import { GET_ALL_POSTS } from '../graphql'

const Home = () => {
  const { loading, data, error } = useQuery(GET_ALL_POSTS)

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

  var allPost = <h2>No Posts Available!</h2>
  if (data.getPosts) {
    allPost = data.getPosts.map((post) => (
      <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
        <PostCard post={post} />
      </Grid.Column>
    ))
  }

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>{allPost}</Grid.Row>
    </Grid>
  )
}

export default Home
