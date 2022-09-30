import { gql } from 'graphql-tag'

export const UPDATE_COMPANY = gql`
  mutation updateCompany($input: UpdateCompanyInput!) {
    updateCompany(input: $input) {
      id
    }
  }
`
