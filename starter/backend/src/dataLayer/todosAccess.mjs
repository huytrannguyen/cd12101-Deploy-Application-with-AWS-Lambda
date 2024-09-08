import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import AWSXRay from 'aws-xray-sdk-core'

export class TodoAccess {
  constructor(
    documentClient = AWSXRay.captureAWSv3Client(new DynamoDB()),
    todosTable = process.env.TODOS_TABLE
  ) {
    this.documentClient = documentClient
    this.todosTable = todosTable
    this.dynamoDbClient = DynamoDBDocument.from(this.documentClient)
  }

  async getAllTodos() {
    const result = await this.dynamoDbClient.scan({
      TableName: this.todosTable
    })
    return result.Items
  }

  async createTodo(todo) {
    await this.dynamoDbClient.put({
      TableName: this.todosTable,
      Item: todo
    })

    return todo
  }

  async getTodo(todoId) {
    const todo = await this.dynamoDbClient.get({
        TableName: todosTable,
        Key: {
          todoId: todoId
        }
    })
    return todo
  }

  async deleteTodo(todoId) {
    await this.dynamoDbClient.delete({
        TableName: this.todosTable,
        Key: {
          todoId: todoId
        }
    })
    return todoId
  }

  async updateTodo(todoId, body) {
    await this.dynamoDbClient.put({
        TableName: this.todosTable,
        Key: {
            todoId: todoId
        },
        UpdateExpression: "SET #n = :name, dueDate = :dueDate, done = :done",
        ExpressionAttributeNames: {
          "#n": "name"
        },
        ExpressionAttributeValues: {
          ":name": updatedTodo.name,
          ":dueDate": updatedTodo.dueDate,
          ":done": updatedTodo.done,
        },
    })

    return body
  }
}
