import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import AWSXRay from 'aws-xray-sdk-core'

export class ImageAccess {
  constructor(
    documentClient = AWSXRay.captureAWSv3Client(new DynamoDB()),
    imagesTable = process.env.IMAGES_TABLE
  ) {
    this.documentClient = documentClient
    this.imagesTable = imagesTable
    this.dynamoDbClient = DynamoDBDocument.from(this.documentClient)
  }

  async createImage(image) {
    await this.dynamoDbClient.put({
      TableName: this.imagesTable,
      Item: image
    })

    return image
  }
}
