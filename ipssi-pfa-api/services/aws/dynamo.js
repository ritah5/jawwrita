const AWS = require("aws-sdk");

class AWSDynamoDB {
  constructor(table) {
    AWS.config = new AWS.Config();
    AWS.config.region = "eu-west-3";

    this.table = table;
    this.db = new AWS.DynamoDB.DocumentClient();
    this._dynamo = new AWS.DynamoDB();
  }

  /**
   * @param {AWS.DynamoDB.DocumentClient.QueryInput} options
   * @returns {Promise<AWS.DynamoDB.DocumentClient.QueryOutput>}
   */
  query(options) {
    options.TableName = this.table;
    return new Promise((resolve, reject) => {
      this.db.query(options, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }

  /**
   * @param {AWS.DynamoDB.DocumentClient.UpdateItemInput} options
   * @returns {Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput>}
   */
  update(options) {
    options.TableName = this.table;
    return new Promise((resolve, reject) => {
      this.db.update(options, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }

  /**
   * @param {AWS.DynamoDB.DocumentClient.GetItemInput} options
   * @returns {Promise<AWS.DynamoDB.DocumentClient.GetItemOutput>}
   */
  get(options) {
    options.TableName = this.table;
    return new Promise((resolve, reject) => {
      this.db.get(options, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }

  /**
   * @param {AWS.DynamoDB.DocumentClient.PutItemInput} options
   * @returns {Promise<AWS.DynamoDB.DocumentClient.PutItemOutput>}
   */
  put(options) {
    options.TableName = this.table;
    return new Promise((resolve, reject) => {
      this.db.put(options, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }

  /**
   * @param {AWS.DynamoDB.DocumentClient.DeleteItemInput} options
   * @returns {Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput>}
   */
  delete(options) {
    options.TableName = this.table;
    return new Promise((resolve, reject) => {
      this.db.delete(options, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }

  /**
   * @param {AWS.DynamoDB.DocumentClient.ScanInput} options
   * @returns {Promise<AWS.DynamoDB.DocumentClient.ScanOutput>}
   */
  scan(options) {
    options.TableName = this.table;
    return new Promise((resolve, reject) => {
      this.db.scan(options, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }

  /**
   * @param {AWS.DynamoDB.DocumentClient.BatchGetRequestMap} options
   * @returns {Promise<AWS.DynamoDB.DocumentClient.BatchGetResponseMap>}
   */
  batchGet(options) {
    let queryParams = { RequestItems: {} };
    queryParams.RequestItems[this.table] = options;
    return new Promise((resolve, reject) => {
      this.db.batchGet(queryParams, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }

  /**
   * @param {AWS.DynamoDB.DocumentClient.BatchWriteItemRequestMap} options
   * @returns {Promise<AWS.DynamoDB.DocumentClient.BatchWriteItemOutput>}
   */
  batchWrite(options) {
    let writeParams = { RequestItems: {} };
    writeParams.RequestItems[this.table] = options;
    return new Promise((resolve, reject) => {
      this.db.batchWrite(writeParams, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }
}

module.exports = (table) => {
  return new AWSDynamoDB(table);
};
