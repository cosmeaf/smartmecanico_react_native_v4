import React, { useState } from 'react'
import { StyleSheet, Text, View, Linking, TouchableOpacity, ScrollView, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Checkbox from 'expo-checkbox';
import text from '../documents/TermsOfUse';

const CustomPrivacyPolicy = ({ }) => {
  const [isChecked, setChecked] = useState(false);
  const [complianceModal, setComplianceModal] = useState(true);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Modal animationType='slide' transparent={true} visible={complianceModal}>
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.TitleTerms}>Politica de Privacidade</Text>
              <Text>{text}</Text>
              {/* CheckBox Agree */}
              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? 'green' : undefined}
                />
                <Text style={styles.paragraph}>Eu Li, Concordo e Aceito os Termos!</Text>
              </View>
              {/* Save Button */}
              <TouchableOpacity
                style={[styles.saveButtom, { backgroundColor: isChecked ? 'green' : 'grey' }]}
                disabled={!isChecked}
                onPress={() => setComplianceModal(false)}
              >
                <Text style={styles.saveButtomText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
}

export default CustomPrivacyPolicy;

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  TitleTerms: { fontSize: 22, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0, 0.6)' },
  modalView: { flex: 1, backgroundColor: '#FFF', borderRadius: 20, margin: 20, padding: 20, alignItems: 'center' },
  section: { flexDirection: 'row', alignItems: 'center' },
  paragraph: { fontSize: 15, fontWeight: 'bold' },
  checkbox: { margin: 8 },
  saveButtom: { paddingHorizontal: 100, paddingVertical: 10, borderRadius: 10, marginBottom: 20, marginTop: 40 },
  saveButtomText: { fontSize: 20, color: '#FFF' }
});