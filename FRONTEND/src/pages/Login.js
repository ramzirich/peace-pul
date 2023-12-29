import React from 'react';
import { Text, View } from 'react-native';
import { Link } from 'react-router-native';

export default Login = ({}) =>{
    return(
        <View>
            <Text>Login</Text>
            <Link to="/register">
                <Text>Go to About</Text>
            </Link>
        </View>
    )
}