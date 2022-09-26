import { gql } from 'graphql-tag'

export const GET_ME = gql`
  query getMe {
    me {
      id
      name
      username
      phone
      avatar
      role {
        id
        name
        shortname
        access
      }
    }
  }
`
