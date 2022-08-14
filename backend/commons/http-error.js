class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // call Error Class to add a "message" property
    this.code = errorCode; // Adds a "code" property
  }
}

module.exports = HttpError;