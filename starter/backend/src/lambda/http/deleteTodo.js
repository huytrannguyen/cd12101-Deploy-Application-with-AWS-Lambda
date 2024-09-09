import middy from '@middy/core'
import httpCors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { deleteTodo } from '../../businessLogic/todos.mjs'
import { createLogger } from '../../utils/logger.mjs'
import { getUserId } from "../utils.mjs";

const logger = createLogger('api/deleteTodo')
export const handler = middy()
  .use(httpErrorHandler())
  .use(
    httpCors({
      credentials: true
    })
  )
  .handler(async(event) => {
  const userId = getUserId(event);
  const todoId = event.pathParameters.todoId
  
  // TODO: Remove a TODO item by id
  logger.info(`Deleting todo with Id: ${todoId}`)
  await deleteTodo(userId, todoId)
  return todoId
})

