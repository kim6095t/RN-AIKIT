import React,{useState} from "react";
import Ble from "./src/pages/Ble";
import Web from "./src/pages/Web";

const App=()=>{
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

export default App;