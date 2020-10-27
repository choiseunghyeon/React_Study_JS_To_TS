import { AxiosError, AxiosResponse } from "axios"
import { useState, useEffect } from "react"



type PromiseCreator = () => Promise<AxiosResponse<any>>;

export default function usePromise(promiseCreator: PromiseCreator, deps: any[]): [boolean, AxiosResponse | null, AxiosError | null] {
  // 대기 중/완료/실패에 대한 상태 관리

  const [loading, setLoading] = useState<boolean>(false)
  const [resolved, setResolved] = useState<AxiosResponse | null>(null)
  const [error, setError] = useState<AxiosError | null>(null)

  useEffect(() => {
    const process = async () => {
      setLoading(true)
      try {
        const resolved = await promiseCreator()
        setResolved(resolved)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    process()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return [loading, resolved, error]
}
