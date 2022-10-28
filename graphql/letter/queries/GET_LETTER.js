import { gql } from 'graphql-tag'

export const GET_LETTER = gql`
  query getLetter($id: SID!) {
    letter(id: $id) {
      id
      ref
      authorId
      cityId
      companyId
      publishedDate
      to
      subject
      attachment
      type
      category
      company {
        id
        name
        code
      }
      author {
        id
        name
      }
      city {
        id
        name
      }
      tags {
        id
        label
        slug
      }
    }
  }
`
