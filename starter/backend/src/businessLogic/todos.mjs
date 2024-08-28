import * as uuid from 'uuid'

import { TodoAccess } from '../dataLayer/todosAccess.mjs'

const todoAccess = new TodoAccess()

export async function getAllTodos() {
  return await todoAccess.getAllTodos()
}

export async function createTodo(createTodoRequest, userId) {
  const itemId = uuid.v4()

  return await todoAccess.createTodo({
    id: itemId,
    userId: userId,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate
  })
}

export async function getTodo(todoId) {
    return await todoAccess.getTodo(todoId)
}

export async function deleteTodo(todoId) {
    return await todoAccess.deleteTodo(todoId)
}

export async function updateTodo(todoId, body) {
    return await todoAccess.updateTodo(todoId, body)
}