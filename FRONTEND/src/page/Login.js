import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, ScrollView } from "react-native";
import { Input } from "../reusable/Input/Input";
import { CustomButton } from "../reusable/button/CustomButton";
import { config } from "../../config";
import { getAuthToken, setAuthToken } from "../utils/AuthToken";

export const Login = ({navigation}) =>{
    const { control, handleSubmit, formState} = useForm();

    const onLoginPressed = async(data) =>{
        try{
            const response = await axios.post(`${config.apiUrl}/login`, data);
            const token = response.data.authorisation.token;
            await setAuthToken(token);
            console.log(response.data);
        }catch(error){
            console.error("Coudn't login: ", error.response?.data || error.message)
        }
    }

    const isFormValid = formState.isValid

    return(
        <ScrollView>
            <Input 
                control={control}
                label='email'
                name = 'email' 
                placeholder='email'
                rules={{
                    required:'email is required',
                    maxLength:{value:100, message:"Email cannot exceed 100 character"},
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Invalid email address',
                    },
                }}    
            />
                <Input 
                    control={control}
                    label='Password'
                    name = 'password'               
                    placeholder='password'
                    rules={{
                        required:'password is required', 
                        minLength:{value:8, message:'password cannot be less than 8'},
                        maxLength:{value:20, message:'password cannot exceed than 20'},
                        pattern:{
                            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[\s\S]{8,20}$/,
                            message:"Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, one special character"
                        }
                    }} 
                />
                <CustomButton 
                    text="Sign in" 
                    onPress={handleSubmit(onLoginPressed)}
                    disabled={!isFormValid} />
                <Button title="Go to register"
                        onPress={() => navigation.navigate('register')}
                />
        </ScrollView>
    )
}