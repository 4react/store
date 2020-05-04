/* eslint-disable react-hooks/rules-of-hooks */
import React, { Context, FC, Reducer, useMemo, useReducer } from 'react'
import { Action, StoreContext, StoreContextValue } from './StoreContext'

export interface StoreProviderProps<S> {
  data?: S
}

export type StoreProvider<S> = FC<StoreProviderProps<S>> & {
  context: Context<StoreContextValue<S>>
}

const storeProviderFactory = <S extends any>(
  context: StoreContext<S>,
  reducer: Reducer<S, Action>,
  preloadedState?: S
): StoreProvider<S> => {
  // @ts-ignore
  const initialState: S = preloadedState || reducer(undefined, { type: undefined })

  const storeProvider: StoreProvider<S> = props => {
    const { data: customData, children } = props
    const [data, dispatch] = useReducer<Reducer<S, Action>>(reducer, customData || initialState)

    const value: StoreContextValue<S> = useMemo(
      () => ({ data, dispatch }),
      [data, dispatch]
    )

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
