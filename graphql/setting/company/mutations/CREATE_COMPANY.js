import { gql } from 'graphql-tag'

export const CREATE_COMPANY = gql`
  mutation createCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      id
    }
  }
`
