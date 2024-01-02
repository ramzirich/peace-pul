import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../utils/AuthContext';
import { Link } from 'react-router-native';
import { Square } from '../../reusable/elements/square/Square';
import { CustomHeader } from '../../reusable/components/header/CustomHeader';
import { HeaderButton } from '../../reusable/components/headerButtons/HeaderButtons';
import { config } from '../../../config';
import axios from 'axios';
import { SliderHorizental } from '../../reusable/components/sliderHorizental/SliderHorizental';
import { CustomColors } from '../../styles/color';

const Home = () => {
  const [user, setUser] = React.useState({});
  useEffect(() =>{
    const fetchUserData = async() =>{
      try{
        const response = await axios.get(`${config.apiUrl}/user`,{
          headers:{
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTkyLjE2OC4wLjEwMzo4MDAwL2FwaS9sb2dpbiIsImlhdCI6MTcwMzkzNDg3NiwiZXhwIjoxNzAzOTM4NDc2LCJuYmYiOjE3MDM5MzQ4NzYsImp0aSI6InJWbWxGcTFBRXFqUEVUZksiLCJzdWIiOiIzIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.g-ib7FjZ3VZqYDvaGbPx5cNxtSLRP6rVj1Lbb84n6Zs'
          }
        });
        setUser(response.data);   
      }catch(error){
        console.error('Error fetching user data:', error.message);
      }
    };
    fetchUserData();
  }, [])

  console.log(user.length ==0 ?true:false)
  return (
    <View>
      {user.length == 0? <CustomHeader name={user.first_name}/>: 
        <Text style={{marginVertical:10}}>Loading...</Text>} 
      <HeaderButton />
      <SliderHorizental />
      <View style={styles.videoLength}>

      </View>
    </View>
      /* <Text>Welcome, {user ? user.first_name : 'Guest'}!</Text>
     
      <Link to="/">
        <Text>Hi</Text>
      </Link> */
      
  );
};

const styles= StyleSheet.create({
  videoLength:{
    width:100,
    height:100,
    borderRadius: 50,
    marginTop: 20,
    backgroundColor: CustomColors.black,
    alignSelf: "center"
  }
})

export default Home;