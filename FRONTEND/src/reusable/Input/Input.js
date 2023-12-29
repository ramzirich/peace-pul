import React from 'react';
import {View, Text, TextInput} from 'react-native';
import { InputStyles } from './InputStyles';
import { Controller } from 'react-hook-form';

export const Input = ({control, label, name, placeholder, secureTextEntry, rules}) =>{
    return(
        <View>
            <Text style={InputStyles.label}>{label}</Text>           
                <Controller
                    control={control}
                    name={name}
                    rules={rules}
                    render = {({field : {value, onChange, onBlur}, fieldState:{error}}) =>(
                        <>
                            <View 
                                style={[InputStyles.container, {borderColor: error ? 'red': '#e8e8e8'}]}>
                                <TextInput
                                    style={InputStyles.input}
                                    placeholder={placeholder}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    secureTextEntry={secureTextEntry}
                                />
                            </View>
                            
                            {error && (
                               
                                <Text style={{color:'red', alignSelf:'stretch'}}>{error.message || 'Error'}</Text>
                            )}
                        </>
                    )}
                />      
        </View>
        
    )
}