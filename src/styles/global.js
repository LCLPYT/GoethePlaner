import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1
    },
      title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "bold",
        color: '#14213D',
        flex: 1,
        paddingVertical: 3,
        paddingTop: 4,
    },
    titlebar: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 10,
        shadowRadius: 2,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        elevation: 5,
        shadowOffset: { width: 0, height: 3 },

        flexDirection: 'row', alignItems:'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
  },
  button: {
    borderRadius: 15,
    padding: 20,
    margin: 10,
    width: 270,
    height: 50,
    marginBottom:0,
    backgroundColor: '#b2b2b2',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
