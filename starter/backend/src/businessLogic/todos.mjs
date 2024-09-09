import * as uuid from 'uuid'

import { TodoAccess } from '../dataLayer/todosAccess.mjs'

const todoAccess = new TodoAccess()
const bucketName = process.env.IMAGES_S3_BUCKET;

export async function getAllTodos(userId) {
  return await todoAccess.getAllTodos(userId)
}

export async function createTodo(createTodoRequest, userId) {
  const itemId = uuid.v4()

  return await todoAccess.createTodo({
    todoId: itemId,
    userId: userId,
    createdAt: new Date().toISOString(),
    attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${itemId}`,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false,
  })
}

export async function getTodo(todoId) {
    return await todoAccess.getTodo(todoId)
}

export async function deleteTodo(userId, todoId) {
    return await todoAccess.deleteTodo(userId, todoId)
}

export async function updateTodo(userId, todoId, body) {
    return await todoAccess.updateTodo(userId, todoId, body)
}