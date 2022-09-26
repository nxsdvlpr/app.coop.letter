import { gql } from 'graphql-tag'

export const DAILY_LOAN_STATUS_REPORT = gql`
  query dailyLoanStatusReport($startDate: String!, $endDate: String!) {
    dailyLoanStatusReport(startDate: $startDate, endDate: $endDate) {
      dateAt
      createdCount
      verifiedCount
      rejectedCount
      activatedCount
      completedCount
    }
  }
`
