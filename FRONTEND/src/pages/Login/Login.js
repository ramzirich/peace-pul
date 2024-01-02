import React from 'react';
import { Keyboard, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { CustomColors } from '../../styles/color';
import { Input } from '../../reusable/elements/Input/Input';
import { CustomButton } from '../../reusable/elements/Button/CustomButton';
import { config } from '../../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../utils/AuthContext';


export default Login = () =>{
    const [inputs, setInputs] = React.useState({
        email:'',
        password:''
    });

    const [errors, setErrors] = React.useState({});

    const navigate = useNavigate();

    const {updateUser, user} = useAuth();


    const validate = () =>{
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
          } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input a valid email', 'email');
            isValid = false;
          }else if(inputs.email.length>100){
              handleError('Email cannot exceed 100 characters', 'email');
              isValid = false;
          }

          if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
          } else if (inputs.password.length < 8) {
            handleError('Min password length of 8', 'password');
            isValid = false;
          }else if(inputs.password.length>20){
              handleError('last name cannot exceed 20 characters', 'last_name');
              isValid = false;
          }else if(!inputs.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[\s\S]{8,20}$/)){
              handleError('The password must contain at least one uppercase letter, one lowercase letter,' +
                              'one numeric digit, one special character.', 'password');
          }
      
          if (isValid) {
            login(inputs);
          }
    }

    const login = async(inputs) =>{
        try{
            const response = await axios.post(`${config.apiUrl}/login`, inputs);
            await AsyncStorage.setItem('authToken', response.data.authorisation.token);
            console.log("Before updateUser", user);
            updateUser(response.data.user)
            console.log("after updateUser", user);
            navigate('/home')
        }catch(error){
            console.error("Coudn't login: ", error.response?.data || error.message)
        }
    }

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
      };
      const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
      };

    return(
        <SafeAreaView style={{backgroundColor: CustomColors.white, flex: 1}}>
            <ScrollView
                contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>

                <Text style={{color: CustomColors.black, fontSize: 40, fontWeight: 'bold'}}>
                Login
                </Text>
                <Text style={{color: CustomColors.grey, fontSize: 18, marginVertical: 10}}>
                Enter Your Details to Register
                </Text>

                <View style={{marginVertical: 20}}>

                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        label="Email"
                        placeholder="Enter your email address"
                        error={errors.email}
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        label="Password"
                        placeholder="Enter your password"
                        error={errors.password}
                        password
                    />

                <CustomButton title="Login" onPress={validate} />
                {/* <Text
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 16,
                    }}>
                    Already have account ?Login
                </Text> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}