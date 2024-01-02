import { StyleSheet, View } from "react-native"
import { Square } from "../../elements/square/Square"

export const HeaderButton = () =>{
    return(
        <View style={styles.container}>
            <Square tag="Psychiatrist"/>
            <Square tag="Volunteer"/>
            <Square tag="Songs"/>
            <Square tag="Videos"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    }
})