import { StoreContext, StoreContextValue } from './StoreContext'
import { useContext } from 'react'

export type StoreHookSelector<S> = (store: S) => any

export interface StoreHook<S> {
  (selector?: StoreHookSelector<S>): StoreContextValue<S>
}

const useStoryFactory = <S>(context: StoreContext<S>): StoreHook<S> => (
  (selector?: StoreHookSelector<S>) => {
    const { data, dispatch } = useContext(context)
    if (selector) {
      return { data: selector(data), dispatch }
    }
    return { data, dispatch }
  }
)

export default useStoryFactory
