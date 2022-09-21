import React, { createContext, useEffect, useState } from 'react'
import mqtt from 'mqtt/dist/mqtt'



const host = '15.207.222.251';
var port = 8083;
var client
 
export const ApisContext = createContext();


function Context({children}) { 
  const [conData, setConData] = useState('')
  
  const [token, setToken] = useState()
  // const [client, setClient] = useState()
  const [msg, setMsg] = useState();
  
  useEffect(() => {
    MQTTConnect();
    return () => {   
      MQTTConnect()
    }
    //eslint-disable-next-line
  },[])

  function onMessageArrived(msg, pay) {
    if(msg && pay){
      const slicedMessage =  msg.slice(26);
      setMsg(slicedMessage);
      const uni = new TextDecoder().decode(pay);
      const json = JSON.parse(uni) 
        console.log(json);
        setConData(json);
      // console.log('newwwww', msg, pay);
    }
    else{
      console.log('error is here');
    }
  }
  

  function onConnect() {
    
    console.log("Connected");
    client.subscribe("admin/cartv1/48b02d5f84a6/added_weight");
    client.subscribe("admin/cartv1/48b02d5f84a6/label");
    client.subscribe("admin/cartv1/48b02d5f84a6/removed_weight");
    client.subscribe("admin/cartv1/48b02d5f84a6/na");
    client.subscribe("admin/cartv1/48b02d5f84a6/r_label");
    client.subscribe("admin/cartv1/isstable");
    client.subscribe("admin/cartv1/notstable");
  

    //client.publish("something i published", token, 0, false);
    //set.send("admin/cartv1/token", localStorage.getItem("UserToken"), 0, false)
    }
    function onFailure() {
      alert("Connection Attempt to Host " + host + "Failed");
      setTimeout (MQTTConnect,reconnectTimeout);
    } 
    function reconnectTimeout () {
      alert('Connection Lost');
      MQTTConnect()
    }

    
    function MQTTConnect() {
      var x = Math.floor(Math.random() * 10000);
      var cname = "CartID -" + x;
      var options = {
        clientId: cname,
        reconnect : true, 
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure,
      };
      
      
      client = mqtt.connect(`mqtt://${host}:${port}/mqtt`,options);

      client.on('connect', () => {
          onConnect();
      })
      client.on('message', function ( message,payload ) {
        console.log({message, payload});
        onMessageArrived(message, payload)
      })
      client.on('disconnect' , () => {
        reconnectTimeout()
      })
      // set = new Paho.Client(host,port, 'myname');
      // console.log(set);
      // set.connect(`mqtt://${host}:${port}/mqtt`,options)
      // set.onMessageArrived = onMessageArrived;
      // set.onConnectionLost= onConnectionLost
      // console.log(client);
    }

    var val = {
        token,
        setToken,
        conData,
        setConData,
        msg,
        setMsg
    }

  return (
    <>
        <ApisContext.Provider value={val}>
            {children}
        </ApisContext.Provider>

    </>
  )
}

export default Context