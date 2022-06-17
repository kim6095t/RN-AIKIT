import React, {useEffect} from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'


function Splash({navigation}) {
    useEffect(()=>{
        setTimeout(()=>{
            navigation.replace('SelectBleAndWeb')
        }, 2000)
    })
    return (
        <View style={styles.body}>
            <Image 
                style={styles.logo}
                source={require('../../assets/image/aicar.png')}
            />
            <Text style={styles.text}>
                AI 키트
            </Text>
        </View>
    )
}

const styles=StyleSheet.create({
    body:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#D9BDAD'
    },
    logo:{
        width: 300,
        height: 300,
    },
    text:{
        fontSize: 70,
        color: '#000000',
        fontFamily:"NanumPenScript-Regular"
    }
})

export default Splash