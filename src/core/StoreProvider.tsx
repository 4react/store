import React, { Context, FC, Reducer, useMemo, useReducer } from 'react'
import { Action, StoreContext, StoreContextValue } from './StoreContext'

export interface StoreProviderProps<S, A extends Action> {
  data?: S,
}

export type StoreProvider<S, A extends Action> = FC<StoreProviderProps<S, A>> & {
  context: Context<StoreContextValue<S, A>>
}

const storeProviderFactory = <S, A extends Action>(
  context: StoreContext<S, A>,
  reducer: Reducer<S, A>,
  preloadedState?: S
): StoreProvider<S, A> => {

  // @ts-ignore
  const initialState: S = preloadedState || reducer(undefined, { type: undefined })

  const storeProvider: StoreProvider<S, A> = (props) => {
    const { data: customData, children } = props
    let [data, dispatch] = useReducer<Reducer<S, A>>(reducer, initialState)

    const value: StoreContextValue<S, A> = useMemo(() => ({
      data: customData !== undefined ? customData : data,
      dispatch
    }), [data, dispatch])

    return (
      <context.Provider value={value}>
        {children}
      </context.Provider>
    )
  }

  storeProvider.context = context
  return storeProvider
}

export default storeProviderFactory
