import React,{useState} from "react";
import Ble from "./Ble";
import Web from "./Web";

const SelectBleAndWeb=()=>{
  const [bluetoothDevice, setBluetoothDevice]=useState(null)
  
  const SetBluetooth=(data)=>{
    setBluetoothDevice(data)
  }

  return(
    <>
      {
        bluetoothDevice==null?
          <Ble bluetooth={SetBluetooth}/>
          :<Web bluetooth={bluetoothDevice}/>
      }
    </>      
  )
}

export default SelectBleAndWeb;