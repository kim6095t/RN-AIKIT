import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/pages/Splash';
import SelectBleAndWeb from './src/pages/SelectBleAndWeb';

const RootStack = createNativeStackNavigator()

export default function App() {
  return (
      <NavigationContainer>
        <RootStack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerTitleAlign:'center',
            headerStyle:{
              backgroundColor:'#A5937B'
            },
            headerTintColor:'#ffffff',
            headerTitleStyle:{
              fontSize:35,
              fontFamily:"NanumPenScript-Regular"
            }
          }}
        >
            <RootStack.Screen 
              name="Splash" 
              component={Splash}
              options={{
                headerShown:false
              }}
            />
            <RootStack.Screen 
              name="SelectBleAndWeb" 
              component={SelectBleAndWeb} 
              options={{
                headerShown:false
              }}
            />
        </RootStack.Navigator>
      </NavigationContainer>
  )
}