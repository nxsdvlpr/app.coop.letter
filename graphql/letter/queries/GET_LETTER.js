import { gql } from 'graphql-tag'

export const GET_LETTER = gql`
  query getLetter($id: SID!) {
    letter(id: $id) {
      id
      ref
      companyId
      publishedDate
      to
      subject
      attachment
      category
      company {
        id
        name
        code
      }
      tags {
        id
        label
        slug
      }
    }
  }
`
