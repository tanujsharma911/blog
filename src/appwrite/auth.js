import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) { // Sign Up
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )

            if (userAccount) {
                // Make the user login
                return await this.login({ email, password });
            }
            else {
                return userAccount;
            }
        }
        catch (error) {
            console.log("Appwrite services :: create account", error);
            throw error
        }
    }

    async login({ email, password }) { // Sign In
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        }
        catch (error) {
            console.error("Appwrite services :: login", error);
            throw error;
        }
    }

    async checkAuthStatus() {
        try {
            // If successful, user is authenticated
            // return await this.account.get();
            // Proceed with your authenticated app flow

            const sessions = await this.account.listSessions();

            if (sessions.sessions && sessions.sessions.length > 0) {
                // Active session exists, safe to get user details
                return await this.account.get();
            } else {
                // No active session, user not logged in
                return null;
            }
        } catch (error) {
            if (error.code === 401) {
                // User is not authenticated
                return null;
            }
            console.error("Appwrite Auth :: checkAuthStatus", error);
            // Redirect to login page or show login UI
            // window.location.href = '/login';
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions(); // logout from all devices
            // redirect user to login page
            return true;
        } catch (error) {
            console.log("Appwrite service :: logout", error);
            return false;
        }
    }
}

const authService = new AuthService();

export default authService;