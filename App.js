import { useState, useEffect } from 'react'; 
import { StatusBar } from 'expo-status-bar'; 
import { SafeAreaView, View, TextInput, Text, Alert, Pressable  } from 'react-native';
import { useFonts } from 'expo-font';

import Button from './components/Button.js';

import * as SplashScreen from 'expo-splash-screen'; 

import Modal from './components/Modal.js';

import style from './style.js';

SplashScreen.preventAutoHideAsync();

const SAVE_FILE_NAME = "save-data.json";



function App() {

  const [loaded, error] = useFonts({
      'Bitcount': require('./assets/fonts/Bitcount.ttf'),
    });


    //possibly useable for account creation?

    // let [nextID, setNextID] = useState(1);
    // let [listItems, setListItems] = useState([]);
    // let [selectedItem, setSelectedItem] = useState(); // New variable to track which item to delete




    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
    if (loaded || error) {
        SplashScreen.hideAsync();
    }
    }, [loaded, error]);

    
   
    

    // Modal State - might need?
    // const [modalVisible, setModalVisible] = useState(false);
    // const [modalContentKey, setModalContentKey] = useState();
    // const openModal = () => setModalVisible(true);
    // const closeModal = () => setModalVisible(false);

    const CreateMatch = (idToMatch) => {
    }

    const DeclineMatch = (idToUnmatch) => {
    }
        
       

    const APP_NAME = `DatingApp`; 
    
    return (<SafeAreaView style={style.app}>
        <StatusBar style="auto"/>
        
            <Text style={style.header} onPress={promptAppInfo}>{APP_NAME}</Text>
        
            <View style={style.buttonRow}>
        </View>

    </SafeAreaView>);
}

export default App;