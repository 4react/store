# @4react / state

A Redux-like state container for React Applications.

#### NOTE
This package is largely inspired by [Redux](https://github.com/reduxjs/redux). Please consider to support their work.

## Usage

### Import dependency

```
npm i @4react/state
```

### Create Store
Use the ***createStore*** utility to create both the store provider and its corresponding consumer hook,
passing the main reducer of the store to it.

```jsx
import { createStore } from '@4react/state'

export const [ MyStore, useMyStore ] = createStore(myStoreReducer)
```

### Provide Store
Use the ***store provider*** to provide the store down to your application.

```jsx
import { MyStore } from 'myStore'

const App = () => {
  return (
    <MyStore>
      <MyComponent />
    </MyStore>
  )
}
```

### Use store
Use the ***store custom hook*** to **retrieve store data** and **dispatch actions**

```jsx
const MyInnerComponent = () => {
  const { data, dispatch } = useMyStore()

  const onClick = () => {
     dispatch({ type: 'YOUR_ACTION' })
  }

  return (
    <>
      <span>{data}</span>
      <button onClick={onClick}>
        click here
      </button>
    </>
  )
}
```

## API

### createStore()

Creates both a store provider and its corresponding hook.

Depending on the type of state management you want to implement,
you can decide to keep a single global store,
rather than creates multiple stores and provide them down to different sections of your application.

You can also use multiple nested stores for different manners.

```js
createStore(reducer, [preloadedState], [enhancer])
```

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| reducer | Function | - | A reducing function that returns the next state, given the current state and an action. |
| preloadedState | any | *computed* | ***optional***. The initial state. If not specify the initial state is automatically computed from reducers state default value. |
| enhancer | Function | - | ***optional***. The store enhancer. You may optionally specify it to enhance the store with third-party capabilities. |

Returns an array containing 2 different elements:
1. The custom store provider (see [Store Provider](#store-provider))
2. The custom consumer hook. (see [Consumer Hook](#consumer-hook))

#### Store Provider

The Store Provider is used to provide global store to the entire application.
It is most commonly used inside app main component.

```js
const App = () => {
  return (
    <MyStore>
      ...
    </MyStore>
  );
};
```

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | any | - | ***optional*** You can use this prop to force the providing of specific store data. It is most commonly used for **testing** purpose. |

#### Consumer Hook

The Consumer Hook is used to retrieve both the actual store state
and the dispatch function.

```js
const { data, dispatch } = useMyStore()

const { data } = useMyStore(store => store.counter)
```

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | Function | - | ***optional*** Use to retrieve a custom section of the store state. |

| Return (object) | Type | Description |
| --- | --- | --- |
| data | any | The actual store state or a selection of it. |
| dispatch | Function | The dispatch function, used to dispatch actions |

### combineReducers()

Similar to *Redux*'s combineReducers, it creates a new reducer starting from
a map of reducers. The resulting function will be able to reduce a state
with the same shape of the map of reducers passed to it.

```js
const todos = combineReducers({
  all: allReducer,
  checked: checkedReducer
})
```

Arguments:
1. `reducers` (object): the map of reducers to be combined together.
2. \[`initialValue`\] (any): This parameter is **optional**. If not specify
the state default value is automatically computed from reducers state default
state value inside the passed map.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| reducers | object<string,Function> | - | The map of reducers to be combined together. |
| initialValue | any | *computed* | ***optional*** If not specify, it is automatically computed from reducers default states value inside the passed map. |
