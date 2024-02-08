const success = (statusCode, result) => {
  return {
    status: "OK",
    statusCode,
    result
  }
}

const error = (statusCode, msg) => {
  return {
    status: "Error",
    statusCode,
    msg
  }
}

export { success, error }; 