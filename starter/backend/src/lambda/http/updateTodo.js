import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import { updateTodo } from '../../businessLogic/todos.mjs'
import httpCors from '@middy/http-cors'

const logger = createLogger('api/updateTodo')
export const handler = middy()
  .use(httpErrorHandler())
  .use(
    httpCors({
      origin: "*",
      credentials: true
    })
  )
  .handler(async(event) => {
  const todoId = event.pathParameters.todoId
  const updatedTodo = JSON.parse(event.body)
  
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  logger.info(`Updating todo with ID: ${todoId} and params ${updatedTodo}`)
  await updateTodo(todoId, updatedTodo)
  return todoId
})