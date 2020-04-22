import React, { createRef } from 'react'
import { createStore } from '../../src/createStore'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [...state, action.payload]
    case 'REMOVE_TODO':
      return state.filter((item, index) => index !== action.payload)
    default:
      return state
  }
}

const [Store, useStore] = createStore(reducer)

const AddTodo = () => {
  const input = createRef()
  const { dispatch } = useStore()

  const addTodo = (evt) => {
    dispatch({ type: 'ADD_TODO', payload: input?.current?.value })
    if (input?.current?.value) {
      input.current.value = ""
    }
  }

  return (
    <>
      <input type="text" ref={input} />
      <button onClick={addTodo}>ADD</button>
    </>
  )
}

const Todos = () => {
  const { data, dispatch } = useStore()

  const removeTodo = (index) => {
    dispatch({ type: 'REMOVE_TODO', payload: index })
  }

  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>
          <span
            onClick={() => removeTodo(index)}
            style={{ fontWeight: 'bold', marginRight: 20, cursor: 'pointer' }}
          >(X)</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

const TodoListStory = () => {
  return (
    <Store>
      <AddTodo />
      <Todos />
    </Store>
  )
}

export default TodoListStory
