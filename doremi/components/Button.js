/* eslint-disable react/prop-types */
import { React, StyleSheet, View, Pressable, Text } from "react-native";

export default function Button({label,theme, onPress, iconName}){
    if(theme == 'primary'){
        return (
            <View style = {[styles.buttonContainer]}>
                <Pressable 
                    style={[styles.button,{backgroundColor: "#0A59F7" }]}
                    onPress={onPress}
                    >
                        {/* <MaterialIcons 
                            name={iconName}
                            size={18}
                            color="#25292e"
                        /> */}
                        <Text style={[styles.buttonLabel, {color:'#fff'}]}> {label}</Text>
                    </Pressable>
            </View>
        )
    }
    return (
        <View style = {styles.buttonContainer}>
            <Pressable 
                style={styles.button}
                onPress={onPress}
                >
                    <Text style={styles.buttonLabel}>{label}</Text>
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        minWidth: 120,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3
    },
    button:{
        borderRadius: 40,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#0000000C" 
    },
    buttonLabel:{
        color: '#0A59F7',
        fontSize: 16
    },
    buttonIcon: {
        paddingLeft: 8,
    }
})