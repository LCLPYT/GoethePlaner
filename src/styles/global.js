import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1
    },
      title: {
        textAlign: 'center',
        fontSize: 25,
        color: '#14213D',
        flex: 1
    },
    titlebar: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 10,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        elevation: 10,
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
    width: 350,
    marginBottom:0,
    backgroundColor: '#b2b2b2',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
