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

  const authorColumn = {
    label: 'author',
    field: 'from',
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

  const columns = [dateColumn, refColumn, authorColumn, subjectColumn, toColumn]

  return {
    columns,
  }
}

export default useLetterTable
