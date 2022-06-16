import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  FlatList,
  Alert,
  TouchableOpacity,
  Button,
} from 'react-native';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';

const Ble: React.FC = (props:any) => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [deviceConnected, setDeviceConnected] = useState<BluetoothDevice | undefined>(undefined);

  const handleGetBondedDevices = useCallback(async () => {
    try {
      const peripherals = await RNBluetoothClassic.getBondedDevices();

      if (peripherals.length < 1) {
        throw Error();
      }
      setDevices(peripherals);
    } catch (err) {
      Alert.alert(
        'Error',
        'Could not find any paired connections with your device.',
      );
      console.log('handleGetBondedDevices error:', err);
    }
  }, []);

  const handleConnectToDevice = useCallback(
    async (id: string) => {
      try {
        if (deviceConnected) {
          await deviceConnected.disconnect();
          setDeviceConnected(undefined);
        }

        const device = await RNBluetoothClassic.connectToDevice(id, {
          connectorType: 'rfcomm',
          delimiter: '\n',
          charset: Platform.OS === 'ios' ? 1536 : 'utf-8',
        });

        props.bluetooth(device)
        setDeviceConnected(device);
      } catch (err) {
        Alert.alert('Error', `Unable to connect to device "${id}".`);

        console.log('handleConnectToDevice error:', err);
      }
    },
    [deviceConnected],
  );

  useEffect(() => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(async (isConnected) => {
        if (!isConnected) {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
        }
      });
    }
  }, []);

  useEffect(() => {
    const listener = RNBluetoothClassic.onDeviceDisconnected(() => {
      setDeviceConnected(undefined);
    });
    return () => listener.remove();
  }, []);

  useEffect(() => {
    if (deviceConnected) {
      const listener = deviceConnected.onDataReceived((item) => {
        Alert.alert(`${item.device.name} data received`, item.data);
      });
      return () => listener.remove();
    }
  }, [deviceConnected]);

  return (
    <View>
      <Text>React Native Bluetooth Classic</Text>

      <Button title="Get Bonded Devices" onPress={handleGetBondedDevices} />

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                handleConnectToDevice(item.id);
              }}
              activeOpacity={0.7}
              style={{
                padding: 20,
                marginVertical: 10,
                backgroundColor:
                  deviceConnected && item.id === deviceConnected.id
                    ? 'green'
                    : 'white',
              }}
            >
              <Text
                style={{
                  color:
                    deviceConnected && item.id === deviceConnected.id
                      ? 'white'
                      : 'black',
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Ble;
