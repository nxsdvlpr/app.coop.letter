import { gql } from 'graphql-tag'

export const GET_LETTER = gql`
  query getLetter($id: SID!) {
    letter(id: $id) {
      id
      publishedDate
      city
      destination
      subject
      tags {
        id
        label
        slug
      }
    }
  }
`
