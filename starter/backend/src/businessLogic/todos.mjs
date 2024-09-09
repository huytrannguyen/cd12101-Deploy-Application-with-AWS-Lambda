import * as uuid from 'uuid'

import { TodoAccess } from '../dataLayer/todosAccess.mjs'

const todoAccess = new TodoAccess()
const bucketName = process.env.TODOS_IMAGE_S3_BUCKET;

export async function getAllTodos() {
  return await todoAccess.getAllTodos()
}

export async function createTodo(createTodoRequest, userId) {
  const itemId = uuid.v4()

  return await todoAccess.createTodo({
    todoId: itemId,
    userId: userId,
    createdAt: new Date().toISOString(),
    attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${todoId}`,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false,
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