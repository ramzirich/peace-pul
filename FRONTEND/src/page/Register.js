import React from "react";
import { ScrollView, View, Button } from "react-native";
import { Input } from "../reusable/Input/Input";
import { Controller, useForm } from "react-hook-form";
import { CustomButton } from "../reusable/button/CustomButton";
import { getAuthToken, setAuthToken } from "../utils/AuthToken";
import { config } from "../../config";
import axios from "axios";


export const Register = ({navigation}) =>{
    const {control, handleSubmit, formState} = useForm();
 
    const onSignInPressed = async(data) =>{
        try{
            const response = await axios.post(`${config.apiUrl}/register`, data);
            const token = response.data.authorisation.token;
            await setAuthToken(token);
            console.log(response.data);
        }catch(error){
            console.error("Coudn't register: ", error.response?.data || error.message)
        }
    }

    const isFormValid = formState.isValid

    return(
        <ScrollView>
            <View> 
                <Input 
                    control={control}
                    label='first name'
                    name = 'first_name' 
                    placeholder='name'
                    rules={{
                        required:'first name is required',
                        maxLength:{value:20,message:'first name cant exceed 20 characters'
                        }}} 
                />

                <Input 
                    control={control}
                    label='last name'
                    name = 'last_name' 
                    placeholder='name'
                    rules={{
                        required:'last name is required',
                        maxLength:{value:20,message:'last name cant exceed 20 characters'}
                    }} 
                />

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
                    secureTextEntry
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
                    onPress={handleSubmit(onSignInPressed)}
                    disabled={!isFormValid} />
            </View>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('login')}
            />
        </ScrollView>
        
    )
}

 // const onSignInPressed = () =>{
    //     axios({
    //         method:"GET",
    //         url:"https://jsonplaceholder.typicode.com/posts"
    //         // url:"http://127.0.0.1:8000/api/neuroticism_records",
    //         //     headers: {
    //         //       "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzAzNzgyODIyLCJleHAiOjE3MDM3ODY0MjIsIm5iZiI6MTcwMzc4MjgyMiwianRpIjoidldsVnlIS3FKRExTSDRWRSIsInN1YiI6IjMiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.XXsp8r3uDWbZo9AEb1dTuK3qfDx0d9gEeYhqShbKOt0"
    //         //     }  
    //     }).then(res =>console.log(res)).catch(err =>console.log(err))
    // }