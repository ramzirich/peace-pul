import { StyleSheet, Text, View } from "react-native"
import { CustomHeader } from "../../reusable/components/header/CustomHeader"
import { useEffect, useState } from "react"
import axios from "axios"
import { config } from "../../../config"
import { create } from "react-test-renderer"
import { CustomColors } from "../../styles/color"

export const PsychiatristInfo =() =>{
    const [doctor, setDoctor] = useState({})
    useEffect(() =>{
        const fetchUserData = async() =>{
            try{
                const response =await  axios.get(`${config.apiUrl}/doctor/1`);
                setDoctor(response.data)
            }catch(error){
                console.error('Error fetching user data:', error.message);
            }
        }
        fetchUserData();
    }, [])
    console.log(doctor)
    return(
        <>
            
            <View style={styles.big_container}>
                <CustomHeader />
                <View style={styles.info_card}>
                    {doctor && <Text>{doctor.about}</Text>}
                </View>
                <View style={styles.cost_rating}>
                    <View style={styles.costRating_container}>
                        <View style={styles.cost_circle} />
                        <View>
                            <Text>Cost</Text>
                            <Text>${doctor.hourly_rate}/hr</Text>
                        </View>
                    </View>

                    <View style={styles.costRating_container}>
                        <View>
                            <Text style={styles.start}>★</Text>
                        </View>
                        <View>
                            <Text>Rating</Text>
                            <Text style={{fontSize:10}}>4.5 200votes</Text>
                        </View>                        
                    </View>
                </View> 
            </View>
        </>
        
    )
}

const styles = StyleSheet.create({
    big_container:{
        paddingHorizontal:20
    },
    info_card:{
        height:80,
        // width:320,
        // alignSelf:"center",
        marginTop:20,
        backgroundColor: CustomColors.grey,
        borderRadius:20,
        padding: 10,
        marginBottom: 40
    },
    cost_rating:{
        flexDirection:'row',
        // paddingHorizontal
        justifyContent:'space-between',
        alignItems:'center'
    },
    costRating_container:{
        flexDirection:'row',
        gap:5,
        alignItems:'center'
    },
    cost_circle:{
        height:45,
        width:45,   
        backgroundColor:CustomColors.blue,
        borderRadius:22.5,
    },
    start:{
        fontSize:45,
        color:"gold"
    }
})