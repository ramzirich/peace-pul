import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = 'authToken';

export const setAuthToken = async(token) =>{
    try{
        await AsyncStorage.setItem(TOKEN_KEY, token);
    }catch(error){
        console.error('Error setting authentication token: ', error);
    }
} 

export const getAuthToken = async() =>{
    try{
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        return token;
    }catch(error){
        console.error('Error getting authentication token: ', error);
        return null;
    }
}