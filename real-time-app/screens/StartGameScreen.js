import { useState} from 'react';
import { 
    TextInput, 
    View, 
    StyleSheet, 
    Alert, 
    useWindowDimensions,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import Colors from '../constants/color';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';


function StartGameScreen({onPickNumber}) {
    const [enteredNumber, setEnteredNumber] = useState('');
    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }

    function resetInputHandler() {
        setEnteredNumber('');
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);

        // const { width, height} = useWindowDimensions();

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number', 'Number has to be a number between 1 and 99', 
            [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            );
            return;
        }

        onPickNumber(chosenNumber);
    }

    // const marginTopDistance = useWindowDimensions().height < 400 ? 30 : 100;


    return (
        <ScrollView style={styles.screen}>

            <KeyboardAvoidingView style={styles.screen} behavior='position'>
                <View style={styles.rootContaniner}> 
                    <Title>Guess My Number</Title>
                    <Card>
                        <InstructionText>
                            Enter a Number
                        </InstructionText>
                        <TextInput 
                        style={styles.numberInput} 
                        maxLength={2} 
                        keyboardType="number-pad"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={numberInputHandler}
                        value={enteredNumber}
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                                
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                                
                            </View>

                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default StartGameScreen;

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
       
    },
    rootContaniner: {
        flex: 1,
        // marginTop: deviceWidth < 380 ? 30 : 100,
        marginTop: 100,
        alignItems: 'center',
    },
    
    
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,        
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',

        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        margin: 16,
    },
    buttonContainer: {
        flex: 1,
    },


});