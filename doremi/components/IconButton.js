import { StyleSheet,View,Pressable, Text} from "react-native";
import MaterialIcons  from "@expo/vector-icons/MaterialIcons";

export default function IconButton({onPress, name, label, size, disabled=false}){
    return(
        <View style={[{width:size}]}>
            <Pressable onPress={onPress} style={[styles.button]} disabled={disabled}>
                <MaterialIcons name={name} size={size/2} style={styles.icon}/>
                {label !== null ? <Text style={styles.iconLabel}>{label}</Text>:null}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
    },
    icon:{
        textAlign:'center',
        color:'#000', 
        marginTop: 10
    },
    iconLabel:{
        color:'#000', 
        textAlign:'center'
    },

})