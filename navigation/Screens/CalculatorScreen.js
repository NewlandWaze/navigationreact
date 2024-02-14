import {StyleSheet,View, Text , TouchableOpacity, Vibration,Alert} from 'react-native';
import {useState} from 'react';
import { Entypo } from '@expo/vector-icons';


export default function CalculatorScreen({ navigation }) {
    const [darkMode, setDarkMode] = useState(false);
    const [currentNumber, setCurrentNumber] = useState('');
    const [lastNumber, setLastNumber] = useState('');
  
    const buttons = ['C', 'DEL', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '=']
  
    function calculator() {
      
      let lastArr = currentNumber[currentNumber.length-1];
      
      if(lastArr === '/' || lastArr === '*' || lastArr === '-' || lastArr === '+' || lastArr === '.') {
        setCurrentNumber(currentNumber)
        return
      }
      else {
        let result = eval(currentNumber).toString();
        setCurrentNumber(result)
        return
      }
    }
  
    function handleInput(buttonPressed) {
        Vibration.vibrate(35); // Vibrate for every input
      
        switch(buttonPressed) {
          case '+':
          case '-':
          case '*':
          case '/':
            // Handle operators separately
            setCurrentNumber(currentNumber + buttonPressed);
            break;
          case 'DEL':
            // Remove last character from currentNumber
            setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
            break;
          case 'C':
            // Clear all numbers
            setLastNumber('');
            setCurrentNumber('');
            break;
          case '=':
            if (currentNumber === '') {
              Alert.alert('Warning', 'Please enter a valid expression before pressing equal (=) sign.');
              return;
            }
            Vibration.vibrate(35);
            setLastNumber(currentNumber + '=');
            calculator();
            break;
          default:
            // For numeric inputs and '.'
            setCurrentNumber(currentNumber + buttonPressed);
            break;
        }
      }
  
    const styles = StyleSheet.create({
      results: {
        backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
        maxWidth: '100%',
        minHeight: '35%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      },
      resultText: {
        maxHeight: 45,
        color: '#00b9d6',
        margin: 15,
        fontSize: 35,
      },
      historyText: {
        color: darkMode ? '#B5B7BB' : '#7c7c7c',
        fontSize: 20,
        marginRight: 10,
        alignSelf: 'flex-end',
      },
      themeButton: {
        alignSelf: 'flex-start',
        bottom: '5%',
        margin: 15,
        backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      buttons: {
        width: '100%',
        height: '35%',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      button: {
        borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '24%',
        minHeight: '54%',
        flex: 2,
      },
      textButton: {
        color: darkMode ? '#b5b7bb' : '#7c7c7c',
        fontSize: 28,
      }
      
    })
    return (
        <View>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo name={darkMode ? 'light-up' : 'moon'} size={24} color={darkMode ? 'white' : 'black'} onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)}/>
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '=' || button === '/' || button === '*' || button === '-' || button === '+' ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: '#00b9d6'} ]} onPress={() => handleInput(button)}>
            <Text style={[styles.textButton, {color: 'white', fontSize: 28} ]}>{button}</Text>
          </TouchableOpacity>
          :
          button === 0 ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '36%'} ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          :
          button === '.' || button === 'DEL' ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: button === '.' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '37%'} ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          :
          button === 'C' ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '36%'} ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed' } ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
      </View>
    );
    
    
}