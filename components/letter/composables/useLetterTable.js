const useLetterTable = () => {
  const dateColumn = {
    label: 'Date',
    field: 'publishedDate',
    align: 'center',
    width: '100px',
    type: 'date_short',
  }

  const refColumn = {
    label: 'Ref',
    field: 'ref',
    width: '200px',
  }

  const cityColumn = {
    label: 'City',
    field: 'city',
    width: '150px',
  }

  const subjectColumn = {
    label: 'Subject',
    field: 'subject',
  }

  const toColumn = {
    label: 'To',
    field: 'to',
  }

  const columns = [dateColumn, refColumn, cityColumn, subjectColumn, toColumn]

  return {
    columns,
  }
}

export default useLetterTable
