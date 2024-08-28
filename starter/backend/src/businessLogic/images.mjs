import { ImageAccess } from '../dataLayer/imagesAccess.mjs'

const imageAccess = new ImageAccess()

export async function getAllImages() {
  return await imageAccess.getAllImages()
}

export async function createImage(todoId, imageId, event) {
    const timestamp = new Date().toISOString()
    const newImage = JSON.parse(event.body)
  
    const newItem = {
      todoId,
      timestamp,
      imageId,
      imageUrl: `https://${bucketName}.s3.amazonaws.com/${imageId}`,
      ...newImage
    }
  
    await imageAccess.createImage(newItem)
  
    return newItem
}