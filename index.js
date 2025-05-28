//install @aws-sdk/client-s3,npm i @aws-sdk/s3-request-presigner
//import S3Client and S3RequestPresigner
// https://www.youtube.com/watch?v=oAR3pahiCQk&list=PLr60VaMrue74TwtxNfMGteP4yaousjCNz

const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const client = new S3Client({
  region: "us-east-1", //AWS region inside created bucket
  credentials: {
    accessKeyId: "AKIAUQ4L26EPJ6KL37NV",
    secretAccessKey: "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",
  },
});

const getObjectSignedUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: "ritikchauhanvatsbucket",
    Key: key,
  });

  const url = await getSignedUrl(client, command, {
    // expiresIn: 20, //to expire in 20 seconds
  });
  return url;
};

const putObjectSignedUrl = async (key,contentType) => {
  const command = new PutObjectCommand({
    Bucket: "ritikchauhanvatsbucket",
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(client, command);      //once we upload a object on a url it doesn't work again
  return url;
};

(async () => {
  //   const hello = await getObjectSignedUrl('ritik');      //gives access denied
  const hello = await getObjectSignedUrl("Picture 21, Picture.jpeg"); //Correct object key in bucket , paste key from properties of Object
  //https://ritikchauhanvatsbucket.s3.us-east-1.amazonaws.com/ritik?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUQ4L26EPJ6KL37NV%2F20250528%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250528T051927Z&X-Amz-Expires=900&X-Amz-Signature=774e1dc1b1a253d75e93500840e3a11ea589467b0460e50dd19eb49428b579ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject

  console.log("hello", hello); //now give Permissions access to ram
  //   https://ritikchauhanvatsbucket.s3.us-east-1.amazonaws.com/ritik?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUQ4L26EPJ6KL37NV%2F20250528%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250528T052742Z&X-Amz-Expires=900&X-Amz-Signature=ea7d68de50bf8cb56e4caa5cb24308bab275e4f66753f5de14b6324a346e6289&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject
  //gives the specified key doesn't exist

  //Now this pre signed url work ON Block all public access also
  // https://ritikchauhanvatsbucket.s3.us-east-1.amazonaws.com/Picture%2021%2C%20Picture.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUQ4L26EPJ6KL37NV%2F20250528%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250528T053021Z&X-Amz-Expires=900&X-Amz-Signature=ac9da2420b0c32dfac0aff0a1151abc41525f51258e850177ffc25a9b75b9552&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject
})();

(async () => {
  const putUrl = await putObjectSignedUrl("newUniqueKey",'image/jpeg');
  console.log("putUrl",putUrl);
//   https://ritikchauhanvatsbucket.s3.us-east-1.amazonaws.com/newUniqueKey?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUQ4L26EPJ6KL37NV%2F20250528%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250528T065925Z&X-Amz-Expires=900&X-Amz-Signature=d584ed2889f2e7f3d9ccc927de779769cbb6dac1eb7a1e92e9626668bdce510b&X-Amz-SignedHeaders=host&x-amz-checksum-crc32=AAAAAA%3D%3D&x-amz-sdk-checksum-algorithm=CRC32&x-id=PutObject
})();

//Same for DELETE AND LISTING

//We create a user named as Ram on behalf of root user
// IAM -> Users -> Create User (Ram)
// Then Security Credentials -> Access Key -> Create Access key -> CLI -> Create access key -> Copy Access key
// and Secret access key
//Inside Ram->Add Permissions->Attach policies directly->AmazonS3FullAccess

//Pre signed url is of 2 type (Put Object,Get Object)
// GetObjectCommand - get
// put - insert

//INSTALL AWS CLI


// --------------
// Now paste puturl in postman and select request type as PUT,Body as binary and upload your image .jpeg