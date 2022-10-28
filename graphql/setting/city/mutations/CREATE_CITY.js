import { gql } from 'graphql-tag'

export const CREATE_CITY = gql`
  mutation createCity($input: CreateCityInput!) {
    createCity(input: $input) {
      id
    }
  }
`
