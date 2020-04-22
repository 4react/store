import { Context, createContext, Dispatch, Reducer, ReducerAction } from 'react'

export interface Action {
  type: string
  [key: string]: any
}

export interface StoreContextValue<S, A extends Action> {
  data: S,
  dispatch: Dispatch<ReducerAction<Reducer<S, A>>>
}

export type StoreContext<S, A extends Action> = Context<StoreContextValue<S, A>>

const storeContextFactory = <S, A extends Action>(): StoreContext<S, A> => (
  // @ts-ignore
  createContext<StoreContextValue<S, A>>(undefined)
)

export default storeContextFactory
