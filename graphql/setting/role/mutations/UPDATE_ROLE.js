import { gql } from 'graphql-tag'

export const UPDATE_ROLE = gql`
  mutation updateRole($input: UpdateRoleInput!) {
    updateRole(input: $input) {
      id
    }
  }
`
