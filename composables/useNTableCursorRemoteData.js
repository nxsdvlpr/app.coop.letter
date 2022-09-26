import { ref, reactive, useContext, computed } from '@nuxtjs/composition-api'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import { defaults } from 'lodash'

export default function useNTableCursorRemoteData(config = {}) {
  const perPage = config.perPage ? ref(config.perPage) : ref(20)

  const { $toast, $__, app } = useContext()

  const methods = {}

  const client = app.apolloProvider.clients.defaultClient

  const defaultVariables = defaults(
    config.customVariables ? config.customVariables : {},
    {
      paging: {
        after: null,
        first: perPage.value,
      },
      sorting: {
        field: 'id',
        direction: 'DESC',
      },
    }
  )

  const defaultPageInfo = {
    perPage: perPage.value,
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: '',
    endCursor: '',
  }

  const variables = reactive({ ...defaultVariables })

  if (!config.getQuery && !config.destroyQuery) {
    return {
      variables,
    }
  }

  const { result, loading, onError, refetch } = useQuery(
    config.getQuery,
    variables,
    {
      errorPolicy: 'ignore',
      fetchPolicy: 'cache-and-network',
      throttle: 5000,
    }
  )

  const subRows = ref([])

  const callSubRows = async () => {
    try {
      await client
        .query({ query: config.getSubQuery, variables })
        .then(({ data }) => {
          subRows.value = data[config.dataProperty].edges.map(
            (edge) => edge.node
          )
        })
    } catch (e) {
      console.log(e)
    }
  }

  if (config.getSubQuery) {
    setTimeout(async () => await callSubRows(), 1000)
  }

  onError((error) => {
    console.log(error)
  })

  const mainRows = useResult(result, [], (data) => {
    if (data[config.dataProperty].edges) {
      return data[config.dataProperty].edges.map((edge) => edge.node)
    }
    return data[config.dataProperty]
  })

  const rows = computed(() => {
    if (config.getSubQuery) {
      if (mainRows.value.length === subRows.value.length) {
        return $__.mergeArrayByKey(mainRows.value, subRows.value, 'id')
      }
      return []
    }
    return mainRows.value
  })

  const pageInfo = useResult(result, defaultPageInfo, (data) => {
    return {
      ...data[config.dataProperty].pageInfo,
      ...{ perPage: perPage.value },
    }
  })

  const totalRecords = useResult(result, 0, (data) => {
    return data[config.dataProperty].totalCount
  })

  methods.onPageChange = (type) => {
    if (type === 'next') {
      if (!pageInfo.value.hasNextPage) return false
      variables.paging = {
        after: pageInfo.value.endCursor,
        first: perPage.value,
      }
    } else if (type === 'prev') {
      if (!pageInfo.value.hasPreviousPage) return false
      variables.paging = {
        before: pageInfo.value.startCursor,
        last: perPage.value,
      }
    }
  }

  methods.onPerPageChange = (value) => {
    perPage.value = parseInt(value)

    if (variables.paging.first) {
      variables.paging = {
        after: null,
        first: perPage.value,
      }
    } else if (variables.paging.last) {
      variables.paging = {
        after: null,
        first: perPage.value,
      }
    }
  }

  methods.onSortChange = (params) => {
    let orderBy = {}

    if (params[0].type === 'none') {
      orderBy = defaultVariables.sorting
    } else {
      const key = params[0].field
      const value = params[0].type.toUpperCase()

      orderBy = {
        field: key,
        direction: value,
      }
    }

    variables.sorting = orderBy
  }

  methods.onCustomVariablesChange = (customVariables) => {
    for (const key of Object.keys(customVariables)) {
      variables[key] = customVariables[key]
    }
  }

  methods.onSearch = (params) => {
    variables.paging = {
      after: null,
      first: perPage.value,
    }

    // @todo: optimize non searchTerm GraphQL filter query
    if (params.searchTerm) {
      variables.query = `%${params.searchTerm}%`
    } else {
      delete variables.query
    }
  }

  if (config.destroyQuery) {
    const { mutate: destroy } = useMutation(config.destroyQuery, {
      refetchQueries: [
        {
          query: config.getQuery,
          variables,
        },
      ],
    })

    methods.destroyItems = (
      items,
      successCallback = () => {},
      errorCallback = () => {}
    ) => {
      destroy({
        ids: items.deletedRows.map((item) => {
          return item.id
        }),
      }).then(
        ({ data }) => {
          successCallback(data)
        },
        (error) => {
          $toast.error(error.message)
          errorCallback(error)
        }
      )
    }
  }

  return {
    variables,
    rows,
    totalRecords,
    pageInfo,
    loading,
    refetch,
    methods,
  }
}
