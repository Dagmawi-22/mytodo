
import { Text, StyleSheet } from "react-native";

const Header = () => {
    return (
        <Text style={styles.header}>tOdOs</Text>
    )
}


const styles = StyleSheet.create({
    header: {
      fontSize: 30,
      fontStyle: "italic",
      textAlign:"center",
      paddingVertical: 30
    },
    });

    export default Header;