import React, { Component, useState } from 'react';
import {SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview';


const Web = (props:any) => {
  const deviceConnected=props.bluetooth

  //블루투스 통신
  const handleRequest=async(data:string)=>{
    if (deviceConnected) {
      const isConnected = await deviceConnected.isConnected();

      if (isConnected) {
        console.log(data)
        const response = await deviceConnected.write(data);

        if (response) {
          console.log("블루투스 전송 완료")
          return;
        }
      }
    }
  }

  //web에서 rn으로 데이터 받기
  const handleMessage = (event: any) => {
    const { nativeEvent: {data} } = event;
    console.log(data)

    //web에서 ""를 포함하여 data를 날린다.
    if(data==`"A"`){
      handleRequest("0")
    }else if(data===`"B"`){
      handleRequest("2")
    }else if(data===`"C"`){
      handleRequest("3")
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        onMessage={handleMessage} 
        source={{uri: 'file:///android_asset/index.html'}} 
      />
    </SafeAreaView>
  )
}

export default Web;