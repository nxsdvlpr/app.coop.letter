import { gql } from 'graphql-tag'

export const DAILY_LOAN_REPORT = gql`
  query dailyLoanReport($startDate: String!, $endDate: String!) {
    dailyLoanReport(startDate: $startDate, endDate: $endDate) {
      dateAt
      activeAmount
      activeCount
      completeAmount
      completeCount
    }
  }
`
