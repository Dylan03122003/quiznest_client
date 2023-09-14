import { useQueryClient } from 'react-query'

export function useCustomRefetchQuery(queryString: string) {
  const queryClient = useQueryClient()

  async function refetchQuery() {
    await queryClient.refetchQueries({ queryKey: [queryString], exact: true })
  }

  return { refetchQuery }
}
