import middy from '@middy/core'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import httpCors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { createLogger } from '../../utils/logger.mjs'

const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)
const logger = createLogger("api/generateUploadUrl");
const s3Client = new S3Client()

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    httpCors({
      credentials: true
    })
  )
  .handler(async (event) => {
  const todoId = event.pathParameters.todoId

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  logger.info(`Creating new upload Url for todo with Id: ${todoId}`)
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: todoId,
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: urlExpiration,
  });

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      uploadUrl: url,
    }),
  }
})