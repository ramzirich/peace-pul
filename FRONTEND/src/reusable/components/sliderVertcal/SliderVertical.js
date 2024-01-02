import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CustomColors } from "../../../styles/color"
import { Card } from "../card/Card"


export const SliderVertical  = ({userList, dr=null}) =>{
   
    renderItem = ({item}) =>{
        return(
            <Card first_name={item.first_name} text={item.about}
              last_name={item.last_name} dr={dr} imgUrl={item.img_url}/>
        )
    }

    return(
        <View style={{alignItems:'center', marginTop:20}}>
            <FlatList 
                data={userList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id }
            />
        </View>
    )
} 

const SECTIONS = [
    {
      title: 'Made for you',
      data: [
        {
          key: '1',
          text: 'Item text 1',
          uri: 'https://picsum.photos/id/1/200 https://picsum.photos/id/1/200 https://picsum.photos/id/1/200' +
           'https://picsum.photos/id/1/200 https://picsum.photos/id/1/200',
        },
        {
          key: '2',
          text: 'Item text 2',
          uri: 'https://picsum.photos/id/10/200 https://picsum.photos/id/10/200 https://picsum.photos/id/10/200',
        },
      ]
    }]
