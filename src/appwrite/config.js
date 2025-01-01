import conf from "../conf/conf";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, // documentId
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      ); // data
    } catch (error) {
      console.log("appwrite service :: createPost :: error: ", error);
    }
  }
  async updatePost(slug, { title, content, featuredImage, status}) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, // documentId
        {
          title,
          content,
          featuredImage,
          status,

        }
      ); // data
    } catch (error) {
      console.log("appwrite service :: updatePost :: error: ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug // documentId
      );
      return true;
    } catch (error) {
      console.log("appwrite service :: deletePost :: error: ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("appwrite service :: getPost :: error: ", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("appwrite :: getPosts :: error: ", error);
      return false;
    }
  }
  // file services
  async fileUpload(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBuckteId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("appwrite :: fileUpload :: error: ", error);
      return false;
    }
  }

  async fileDelete(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBuckteId, // bucketId
        fileId // fileId
      );
      return true;
    } catch (error) {
      console.log("appwrite :: fileDelete :: error: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBuckteId, fileId);
  }
}
const service = new Service();

export default service;
