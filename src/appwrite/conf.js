import config from "../config/config";
import { Client, ID, Databases, Query } from "appwrite";

class Service {
    client = new Client;
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    // Post Services
    async createPost({ title, slug, content, status, userId, createdBy }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug, // documentId
                {
                    title,
                    content, // HTML
                    status,
                    userId,
                    createdBy
                }, // data
            );
        } catch (error) {
            console.log("Appwrite service :: create post", error);
            return null;
        }
    }

    async updatePost(slug, { title, content, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug, // documentId
                {
                    title, content, status
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

    async getPosts(queries) {
        queries = queries ? queries : [Query.equal('status', 'active')];
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

}

const service = new Service();

export default service;