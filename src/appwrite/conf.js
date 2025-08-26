import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class Service {
    client = new Client;
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    // Post Services
    async createPost({ title, slug, content, thumbnail, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug, // documentId
                {
                    title,
                    content, // HTML
                    thumbnail, // File id
                    status,
                    userId
                }, // data
            );
        } catch (error) {
            console.log("Appwrite service :: create post", error);
            return null;
        }
    }

    async updatePost(slug, { title, content, thumbnail, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug, // documentId
                {
                    title, content, thumbnail, status
                }, // data (optional)
            );
        } catch (error) {
            console.log("Appwrite services :: update post", error);
            return null;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug // documentId
            );
            return true;
        } catch (error) {
            console.log("Appwrite services :: deletePost", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug, // documentId
            );
        } catch (error) {
            console.log("Appwrite services :: getPost", error);
            return null;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                queries
            );
        } catch (error) {
            console.log("Appwrite services :: getAllPost", error);
            return null;
        }
    }

    // File Services
    async uploadFile(file) {
        try {
            return await this.storage.createFile( // return file id
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite services :: upload file", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId, // bucketId
                fileId // fileId
            );

            return true;
        } catch (error) {
            console.log("Appwrite services :: delete file", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFileView(
            config.appwriteBucketId, // bucketId
            fileId, // fileId
        );
    }

}

const service = new Service();

export default service;