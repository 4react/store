import React, { Reducer } from 'react'
import storeProviderFactory, { StoreProvider } from './core/StoreProvider'
import storeContextFactory, { Action, StoreContext } from './core/StoreContext'
import useStoryFactory, { StoreHook } from './core/useStore'

export interface StoreCreator<S, A extends Action> {
  (reducer: Reducer<S, A>, preloadedState?: S): [StoreProvider<S, A>, StoreHook<S, A>]
}

export interface StoreEnhancer<S, A extends Action> {
  (storeCreator: StoreCreator<S, A>): StoreCreator<S, A>
}


export const createStore = <S, A extends Action>(
  reducer: Reducer<S, A>,
  preloadedState?: S,
  enhancer?: StoreEnhancer<S, A>
): [StoreProvider<S, A>, StoreHook<S, A>] => {

  if (enhancer) {
    return enhancer(createStore)(reducer, preloadedState)
  }

  const context: StoreContext<S, A> = storeContextFactory()
  const storeProvider = storeProviderFactory<S, A>(context, reducer, preloadedState)
  const useStore = useStoryFactory(context)

  return [storeProvider, useStore]
}
