import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

const OtpInputComponent = ({ setPinReady, code, setCode, maxlength }) => {
  const codeDigitsArray = new Array(maxlength).fill(0)
  const textinputRef = useRef(null)
  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false)

  const handlePress = () => {
    setInputContainerIsFocused(true);
    textinputRef?.current?.focus();
  }
  const handleOnBlur = () => {
    setInputContainerIsFocused(false);
  }

  useEffect(() => {
    setPinReady(code.length === maxlength);
    return () => setPinReady(false)
  }, [code])

  const toCodeDigitInput = (_value, index) => {
    const emptInputChar = " ";
    const digit = code[index] || emptInputChar;
    // formating
    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxlength - 1;
    const isCodeFull = code.length === maxlength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull)
    return (
      <View style={styles.optInput} key={index}>
        <Text style={styles.optInputText}>{digit}</Text>
      </View>
    )
  }


  return (
    <View style={styles.inputSection}>
      <TouchableOpacity style={styles.otpInputContainer} onPress={handlePress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </TouchableOpacity>
      <TextInput
        style={styles.hidenTextInput}
        ref={textinputRef}
        onBlur={handleOnBlur}
        value={code}
        onChangeText={setCode}
        keyboardType='number-pad'
        returnKeyType='done'
        textContentType='oneTimeCode'
        maxLength={maxlength}
      />
    </View>
  )
}

export default OtpInputComponent

const styles = StyleSheet.create({
  inputSection: { justifyContent: 'center', alignItems: 'center', marginVertical: 10 },
  // hidenTextInput: { width: '100%', borderColor: 'green', borderWidth: 2, borderRadius: 5, marginTop: 15, padding: 12 },
  hidenTextInput: { position: 'absolute', width: 1, height: 1, opacity: 0 },
  otpInputContainer: { width: '70%', flexDirection: 'row', justifyContent: 'space-between' },
  optInput: { borderColor: '#60d3A4', minWidth: '15%', borderWidth: 2, borderRadius: 5, padding: 12 },
  optInputText: { fontSize: 22, fontWeight: 'bold' },
  otpInputFocused: { borderColor: '#60d3A4', minWidth: '15%', borderWidth: 2, borderRadius: 5, padding: 12, backgroundColor: 'grey' },
})