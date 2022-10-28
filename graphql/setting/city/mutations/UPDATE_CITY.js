import { gql } from 'graphql-tag'

export const UPDATE_CITY = gql`
  mutation updateCity($input: UpdateCityInput!) {
    updateCity(input: $input) {
      id
    }
  }
`
