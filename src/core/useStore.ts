import { Action, StoreContext, StoreContextValue } from './StoreContext'
import { useContext } from 'react'

export type StoreHookSelector<S> = (store: S) => any

export interface StoreHook<S, A extends Action> {
  (selector?: StoreHookSelector<S>): StoreContextValue<S, A>
}

const useStoryFactory = <S, A extends Action>(context: StoreContext<S, A>): StoreHook<S, A> => (
  (selector?: StoreHookSelector<S>) => {
    const { data, dispatch } = useContext(context)
    if (selector) {
      return { data: selector(data), dispatch }
    }
    return { data, dispatch }
  }
)

export default useStoryFactory
