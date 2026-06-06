export const badRequest = (body) => ({
  statusCode: 400,
  body,
})

export const ok = (body) => ({
  statusCode: 200,
  body,
})

export const successCreate = (body) => ({
  statusCode: 201,
  body,
})

export const internalServerError = () => ({
  statusCode: 500,
  body: {
    errorMessage: 'Internal server error!',
  },
})
