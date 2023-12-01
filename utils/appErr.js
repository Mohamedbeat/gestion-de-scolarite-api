class AppErr extends Error {
  constructor() {
    super();
  }
  createErr(message, statusCode, statusText) {
    this.message = message;
    this.statusCode = statusCode;
    this.statusText = statusText;
    return this;
  }
}

module.exports = new AppErr();
// export default new AppErr();
