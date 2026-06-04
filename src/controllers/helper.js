export const badRequest = (body) => {
  return {
    statusCode: 400,
    body,
  }
}

export const successCreate = (body) => {
  return {
    statusCode: 201,
    body,
  }
}

export const internalServerError = () => {
  return {
    statusCode: 500,
    body: {
      errorMessage: 'Internal server error!',
    },
  }
}
