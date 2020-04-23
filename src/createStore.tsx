import React, { Reducer } from 'react'
import storeProviderFactory, { StoreProvider } from './core/StoreProvider'
import storeContextFactory, { Action, StoreContext } from './core/StoreContext'
import useStoryFactory, { StoreHook } from './core/useStore'

export interface StoreCreator<S> {
  (reducer: Reducer<S, Action>, preloadedState?: S): [StoreProvider<S>, StoreHook<S>]
}

export interface StoreEnhancer<S> {
  (storeCreator: StoreCreator<S>): StoreCreator<S>
}


export const createStore = <S extends any>(
  reducer: Reducer<S, Action>,
  preloadedState?: S,
  enhancer?: StoreEnhancer<S>
): [StoreProvider<S>, StoreHook<S>] => {

  if (enhancer) {
    return enhancer(createStore)(reducer, preloadedState)
  }

  const context: StoreContext<S> = storeContextFactory()
  const storeProvider = storeProviderFactory<S>(context, reducer, preloadedState)
  const useStore = useStoryFactory(context)

  return [storeProvider, useStore]
}
