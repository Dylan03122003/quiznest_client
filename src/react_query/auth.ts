import { useAuth } from '@clerk/clerk-react'
import { useQuery } from 'react-query'
import { QUERY_KEYS } from '../api/deck'

export const useTokenQuery = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: QUERY_KEYS.TOKEN,
    queryFn: async () => await getToken(),
    onError(err) {
      console.log('Token query error: ', err)
    },
  })
}
