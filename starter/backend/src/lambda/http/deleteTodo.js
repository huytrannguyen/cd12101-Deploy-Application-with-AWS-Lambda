import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { deleteTodo } from '../../businessLogic/todos.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      origin: "*",
      credentials: true
    })
  )
  .handler(async(event) => {
  const todoId = event.pathParameters.todoId
  
  // TODO: Remove a TODO item by id
  await deleteTodo(todoId)
  return todoId
})

