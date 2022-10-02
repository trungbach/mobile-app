import React from 'react';
import {View,Text,KeyboardAvoidingView,StyleSheet} from 'react-native'
import ShippingFormEdit from '../components/shipping/ShippingFormEdit';
function EditShipingScreen({route}) {
  const {shippingItem} = route?.params;
  return (
    <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>{route?.params?.title}</Text>
        <ShippingFormEdit shippingItem={shippingItem} />
    </KeyboardAvoidingView>
  );
}

export default EditShipingScreen;
const styles = StyleSheet.create({
  container:{
    paddingTop:100,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'white',
    flex:1
  },
  title:{
    fontSize:24,
    color:'#223263',
    fontWeight:'bold',
    marginBottom:20
  }
})