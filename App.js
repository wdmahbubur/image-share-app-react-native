import { Image, StyleSheet, Text, TouchableOpacity, View, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import logo from './assets/logo.png';
import { cloneElement, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import * as Sharing from 'expo-sharing';
import * as ImageManipulator from "expo-image-manipulator";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const OpenImagePickerAsync = async()=>{
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if(pickerResult.cancelled===true){
      return;
    }
    setSelectedImage({localUri:pickerResult.uri});
  }

  const OpenShareDialogAsync = async()=>{
    if(Platform.OS==='web'){
      return Alert.alert("Image Share", "Uh oh, sharing isn't available on your platform", [
        {text:"Ok"}
      ])
    }
    const imageTmp = await ImageManipulator.manipulateAsync(selectedImage.localUri);
    await Sharing.shareAsync(imageTmp.uri);
  }

  const RemoveSelectedPhoto = ()=>{
    return setSelectedImage(null);
  }

  if(selectedImage!==null){
    return(
      <>
      <View style={styles.sharePageContainer}>
        <Image source={{uri:selectedImage.localUri}} style={styles.thumbnail}/>
        <View style={styles.flexbox}>
          <TouchableOpacity
            onPress={OpenShareDialogAsync}
            style={styles.btnShare}
          >
            <Text style={styles.btnText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={RemoveSelectedPhoto}
            style={styles.btnRemove}
          >
            <Text style={styles.btnText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text style={{marginBottom: 4}}>Developed by Mahbubur Rahman</Text>
      </View>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      {/* <Image source={{
        uri: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}} 
         style={styles.logo}/> */}
      
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <TouchableOpacity
        // onPress={()=>Alert.alert("ImageShare",'Pick a photo from your gallary',[{text: 'Close'}])}
        onPress={OpenImagePickerAsync}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Pick a photo</Text>
      </TouchableOpacity>
      <StatusBar style="dark"/>

      <View style={{position: 'absolute', bottom: 4}}>
        <Text>Developed by Mahbubur Rahman</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: 350,
    height: 159,
    marginBottom: 10
  },
  instructions:{
    color: '#888', 
    fontSize: 18, 
    textAlign: 'center',
    marginHorizontal: 15
  },
  btn:{
    marginTop: 12,
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  btnText:{
    fontSize: 18,
    color: '#fff'
  },
  sharePageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  thumbnail:{
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginHorizontal: 15,
  },
  flexbox:{
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20
  },
  btnShare:{
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5
  },
  btnRemove:{
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5
  },
});
