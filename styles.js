import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'blue',
    flex: 1,
    alignItems: 'center',
    padding: 32
  },
  card: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 32,
    color: 'blue',
    fontWeight: 'bold',
    marginTop: 48,
    marginBottom: 54,
    alignSelf: 'center'
  },
  subtitle: {
    color: 'gray'
  },
  edittext: {
    marginStart: 4
  },
  inputView: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignItems: 'center'
  },
  icon: {
    width: 18,
    height: 18
  },
  textEnd: {
    alignSelf: 'flex-end',
    fontSize: 12,
    paddingVertical: 2
  },
  button: {
    borderRadius: 16,
    backgroundColor: 'blue',
    padding: 6,
    alignItems: 'center',
    marginTop: 16
  },
  buttonDisabled: {
    borderRadius: 16,
    backgroundColor: 'blue',
    padding: 6,
    alignItems: 'center',
    marginTop: 16,
    opacity: 0.5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  bottomView: {
    flexDirection: 'row',
    marginTop: 18,
    justifyContent: 'center'
  },
  linkText: {
    color: 'blue',
    fontWeight: 'bold',
    marginStart: 4,
    borderBottomColor: 'blue',
    borderBottomWidth: 1
  }
});

export default styles;