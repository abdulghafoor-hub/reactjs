import { config } from "../configuration/config";
import { Client, ID, Databases, Storage, Query} from 'appwrite';
 
export class Serive{
    client =new Client();
    databases;
    bucket;
    constructor(){
            this.client
                .setEndpoint(config.appWriteUrl)
                .setProject(config.appWriteProjectId);
            this.databases=new Databases(this.client);
            this.bucket=new Storage(this.client);
    }
    async createPost({title, slug,content, imageupload, status, userID}){
        try {
            await this.databases.createDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug,
                {
                    title,
                    content,
                    imageupload,
                    status,
                    userID,
                }
            )
        }
        catch (error) {
            console.log("AppWrite Service:: Create post::error",error);
            throw error
        }
    }
    async updatePost(slug,{title, content, imageupload, status}){
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    imageupload,
                    status
                }
            )
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async deletePost(slug){
        try {
             await this.databases.deleteDocumen(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug)
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(config.appWriteDatabaseId,config.appWriteCollectionId,queries)
        } catch (error) {
            console.log("Error", error);
            throw error
        }

    }
    //file upload service
    async uploadFile (file){
        try {
            return await this.bucket.createFile(config.appWriteBucketId,ID.unique(), file)
        }
        catch (error) {
            console.log("Error Uploding", error);
        }
    }
    async deleteFile (fileId){
        try {
            await this.bucket.deleteFile(config.appWriteBucketId,fileId)
            return true;
        }
        catch (error) {
            console.log("Error Uploding", error);
            return false
        }
    }
    async getFilePreview (fileId){
        return this.bucket.getFilePreview(config.appWriteBucketId,fileId)
    }
}
 const dbService=new Serive();
 export default dbService;