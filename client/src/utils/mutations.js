import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $id: String!, $image: String!) {
    addUser(username: $username, id: $id, image: $image){
        user{
      username
      id
      image
    }
  }
}
`

