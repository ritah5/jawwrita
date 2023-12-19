const AWS = require("aws-sdk");

class S3 {
  constructor(bucket) {
    AWS.config = new AWS.Config();
    AWS.config.region = "eu-west-3";

    this.s3 = new AWS.S3();
    this.bucket = bucket;
  }

  /**
   * @param {Promise<AWS.S3.HeadObjectRequest>} options
   * @returns {Promise<AWS.S3.HeadObjectOutput>}
   */
  exists(Key) {
    return new Promise((resolve, reject) => {
      this.s3.headObject(
        {
          Bucket: this.bucket,
          Key,
        },
        (err, data) => {
          if (err) {
            reject(false);
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  getFile(key) {
    return new Promise((resolve, reject) => {
      this.s3.getObject(
        {
          Bucket: this.bucket,
          Key: key,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data.Body);
          }
        }
      );
    });
  }
  readDir(key) {
    return new Promise((resolve, reject) => {
      this.s3.listObjects(
        {
          Bucket: this.bucket,
          Prefix: key,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data.Contents);
          }
        }
      );
    });
  }
  /**
   * @param {Promise<AWS.S3.PutObjectRequest>} options
   * @returns {Promise<AWS.S3.PutObjectOutput>}
   */
  putFile(path, data) {
    return new Promise((resolve, reject) => {
      this.s3.putObject(
        {
          Bucket: this.bucket,
          Key: path,
          Body: data,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  /**
   * @param {Promise<AWS.S3.PutObjectRequest>} options
   * @returns {Promise<AWS.S3.PutObjectOutput>}
   */
  downloadFile(path) {
    return new Promise((resolve, reject) => {
      this.s3.getSignedUrl(
        "getObject",
        {
          Bucket: this.bucket,
          Key: path,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  /**
   * @param {string} path - The key (file path) of the object to be deleted.
   * @returns {Promise<AWS.S3.DeleteObjectOutput>}
   */
  deleteFile(path) {
    return new Promise((resolve, reject) => {
      this.s3.deleteObject(
        {
          Bucket: this.bucket,
          Key: path,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
}

module.exports = (bucket) => {
  return new S3(bucket);
};
