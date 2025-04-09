import { Account, Client, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.cherrizbox',
    projectId: '67e54a0600249c33af4c',
    databaseId: '67e54bcd003da3d16b3b',
    userCollectionId: '67e54c1d0003145e0149',
    videoCollectionId: '67e54c4b0012b5d71cbe',
    photoCollectionId: '67e6e13600234c3bff8b',
    storageId: '67e54f5e001b77aae0cd'
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    photoCollectionId,
    storageId
} = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Export the account client
export { account };

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);

        if(!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username);
        await SignIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountid: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );
        
        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function SignIn(email, password) {
    try {
        // First, try to delete any existing session
        try {
            await account.deleteSession('current');
        } catch (error) {
            // Ignore errors if no session exists
        }
        
        // Create new session
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw error;
    }
}

// Logout function
export const logout = async () => {
    try {
        // First check if we have a valid session
        try {
            const session = await account.getSession('current');
            if (session) {
                try {
                    await account.deleteSession(session.$id);
                } catch (deleteError) {
                    console.log('Error deleting session:', deleteError);
                    // Continue even if we can't delete the session
                }
            }
        } catch (sessionError) {
            console.log('No valid session found:', sessionError);
            // Continue even if we can't get the session
        }
        
        // Clear any local storage or state
        return true;
    } catch (error) {
        console.error('Logout error:', error);
        // Even if there's an error, we should allow the user to proceed
        return true;
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountid', currentAccount.$id)]
        );

        if(!currentUser) throw Error;

        return currentUser.documents[0];
        
    } catch (error) {
        console.log("Error getting current user:", error);
        return null;
    }
};

// Get all posts (combining videos and photos)
export const getAllPosts = async () => {
    try {
        // Fetch videos
        const videosPromise = databases.listDocuments(
            databaseId,
            videoCollectionId
        );
        
        // Fetch photos
        const photosPromise = databases.listDocuments(
            databaseId,
            photoCollectionId
        );
        
        // Wait for both requests to complete
        const [videos, photos] = await Promise.all([videosPromise, photosPromise]);
        
        // Combine and process the results
        const allPosts = [
            ...videos.documents.map(video => ({...video, type: 'video'})),
            ...photos.documents.map(photo => ({...photo, type: 'photo'}))
        ];
        
        // Sort by creation date (newest first)
        allPosts.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
        
        return allPosts;
    } catch (error) {
        console.error("Error getting all posts:", error);
        throw error;
    }
};

