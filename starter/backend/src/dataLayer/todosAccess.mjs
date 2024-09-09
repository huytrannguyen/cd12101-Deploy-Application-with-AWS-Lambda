import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import AWSXRay from 'aws-xray-sdk-core'

export class TodoAccess {
  constructor(
    documentClient = AWSXRay.captureAWSv3Client(new DynamoDB()),
    todosTable = process.env.TODOS_TABLE,
    todosCreatedAtIndex = process.env.TODOS_CREATED_AT_INDEX
  ) {
    this.documentClient = documentClient
    this.todosTable = todosTable
    this.dynamoDbClient = DynamoDBDocument.from(this.documentClient)
    this.todosCreatedAtIndex = todosCreatedAtIndex
  }

  async getAllTodos(userId) {
    const result = await this.dynamoDbClient.query({
      TableName: this.todosTable,
      IndexName: this.todosCreatedAtIndex,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    });
    return result.Items
  }

  async createTodo(todo) {
    await this.dynamoDbClient.put({
      TableName: this.todosTable,
      Item: todo
    })

    return todo
  }

  async deleteTodo(userId, todoId) {
    await this.dynamoDbClient.delete({
        TableName: this.todosTable,
        Key: {
          userId: userId,
          todoId: todoId
        }
    })
    return todoId
  }

  async updateTodo(userId, todoId, body) {
    await this.dynamoDbClient.update({
        TableName: this.todosTable,
        Key: {
            todoId: todoId,
            userId: userId
        },
        UpdateExpression: "SET #n = :name, dueDate = :dueDate, done = :done",
        ExpressionAttributeNames: {
          "#n": "name"
        },
        ExpressionAttributeValues: {
          ":name": body.name,
          ":dueDate": body.dueDate,
          ":done": body.done,
        },
    })

    return body
  }
}
