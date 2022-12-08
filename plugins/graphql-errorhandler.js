import { onError } from '@apollo/client/link/error'

// Handle errors
onError((error) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error)
  }
})
