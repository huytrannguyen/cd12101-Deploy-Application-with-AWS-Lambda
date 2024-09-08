import middy from '@middy/core'
import httpCors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getAllTodos } from '../../businessLogic/todos.mjs'

const logger = createLogger('api/getTodos')
export const handler = middy()
  .use(httpErrorHandler())
  .use(
    httpCors({
      origin: "*",
      credentials: true
    })
  )
  .handler(async (event) => {
    logger.info("Getting all todos")
    const todos = await getAllTodos()

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: todos
      })
    }
  })