
//Import React and Hook we needed
import React, { useState } from 'react';

//Import all required component
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/loader';

const LoginScreen = props => {

    let [loading, setLoading] = useState(false);

     
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const handleSubmitPress =  (userName, password) => {

    
        if ( data.username.length == 0 || data.password.length == 0 ) {
            alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }
        
        setLoading(true);
        var dataToSend = { user_email: userName, user_password: password };
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('http://192.168.1.10/test/login.php', {
            // fetch('https://aboutreact.herokuapp.com/login.php', {
            method: 'POST',
            body: formBody,
            headers: {
                //Header Defination
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        }).then(response => response.json())
            .then(responseJson => {
                //Hide Loader
                setLoading(false);
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.status == 1) {
                    AsyncStorage.setItem('user_id', responseJson.data.user_id);
                    console.log(responseJson.data.user_id);
                    props.navigation.navigate('DrawerNavigationRoutes');
                } else {
                    setErrortext('Please check your email id or password');
                    console.log('Please check your email id or password');
                }
            })
            .catch(error => {
                //Hide Loader
                setLoading(false);
                console.error("E: "+error);
            });
    };

    const textInputChange = (val) => {
        if( val.trim().length >= 2 ) {
            
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });

        }
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const handleValidUser = (val) => {
        // console.log("user "+ val )
        if( val.trim().length >= 2 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 6 ) {
           
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
           
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    return (
        <View style={styles.mainBody}>
            
            {/* <Image
                style={{width: '100%',height:'100%', position: 'absolute'}}
                source={require('../Image/fondo.png')}
                resizeMode="stretch"
            /> */}
            
            <Loader loading={loading} />
            <ScrollView keyboardShouldPersistTaps="handled">
                <View >
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../Image/aboutreact.png')}
                                style={styles.logo}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(val) => textInputChange(val)}
                                onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                                // underlineColorAndroid="#FFFFFF"
                                placeholder="Usuario" //dummy@abc.com
                                selectionColor={'black'}
                                placeholderTextColor="#21303E"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                blurOnSubmit={false}
                            />
                             <Animatable.View
                                animation="bounceIn"
                                style={ {position: 'absolute', left: 255, top : 10} }

                            >
                                <FontAwesome 
                                    name="user"
                                    color="white"
                                    size={20}
                                    
                                />
                            </Animatable.View>
                        </View>
                        {data.isValidUser ? null : (
                            <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorTextStyle}>{'Usuario no reconocible'}</Text>
                            </Animatable.View>
                        )}
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                // onChangeText={UserPassword => setUserPassword(UserPassword)}
                                onChangeText={(val) => handlePasswordChange(val)}
                                // underlineColorAndroid="#FFFFFF"
                                placeholder="Password" //12345
                                placeholderTextColor="#21303E"
                                keyboardType="default"
                                selectionColor={'black'}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                // secureTextEntry={true}
                                autoCapitalize="none"
                                secureTextEntry={data.secureTextEntry ? true : false}
                            />
                            <TouchableOpacity
                                onPress={updateSecureTextEntry}
                                style={ {position: 'absolute', left: 255, top : 10} }
                            >
                                {data.secureTextEntry ? 
                                <Feather 
                                    name="eye-off"
                                    color="white"
                                    size={20}
                                />
                                :
                                <Feather 
                                    name="eye"
                                    color="white"
                                    size={20}
                                />
                                }
                            </TouchableOpacity>
                        </View>
                        {data.isValidPassword ? null : (
                            <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorTextStyle}>{'Password minimo 6 caracteres'}</Text>
                            </Animatable.View>
                        )}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => handleSubmitPress(data.username, data.password )}>
                            <Text style={styles.buttonTextStyle}>Iniciar</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.registerTextStyle}
                            onPress={() => props.navigation.navigate('RegisterScreen')}>
                            No tienes cuenta? Registrar
            </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default LoginScreen;


const {height} = Dimensions.get("screen");
const height_logo = height * 0.35;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#307ecc',
    },
    logo: {
        width: height_logo,
        height: height_logo,
        resizeMode: 'contain',
        // margin: 30,
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 15,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',        
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'white',
        // backgroundColor: ''
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});