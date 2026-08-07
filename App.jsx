import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

const styleApp = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b9dfe9',
        paddingHorizontal: 28,
    },
    title: {
        fontSize: 38,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 44,
        letterSpacing: -0.5,
    },
    input: {
        width: '100%',
        maxWidth: 960,
        height: 64,
        backgroundColor: '#000000',
        borderRadius: 12,
        color: '#ffffff',
        fontSize: 21,
        paddingHorizontal: 20,
        paddingVertical: 14,
        marginBottom: 26,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    button: {
        width: '100%',
        maxWidth: 960,
        height: 64,
        backgroundColor: '#000000',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
    },
    resultado: {
        marginTop: 24,
        fontSize: 22,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
    },
    limparButton: {
        width: '100%',
        maxWidth: 960,
        height: 64,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        borderWidth: 2,
        borderColor: '#000000',
    },
    limparButtonText: {
        color: '#000000',
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
    },
})

export default function App() {
    const [altura, setAltura] = useState('')
    const [peso, setPeso] = useState('')
    const [idade, setIdade] = useState('')
    const [imc, setImc] = useState(null)
    const [resultado, setResultado] = useState('')

    function calcularIMC() {
        const alturaNumero = Number.parseFloat(String(altura).replace(',', '.'))
        const pesoNumero = Number.parseFloat(String(peso).replace(',', '.'))
        const idadeNumero = Number.parseInt(String(idade).replace(',', '.'), 10)

        if (
            !Number.isFinite(alturaNumero) ||
            !Number.isFinite(pesoNumero) ||
            !Number.isFinite(idadeNumero) ||
            alturaNumero <= 0 ||
            pesoNumero <= 0 ||
            idadeNumero <= 0
        ) {
            setImc(null)
            setResultado('Preencha os dados corretamente.')
            return
        }

        const alturaEmMetro = alturaNumero > 3 ? alturaNumero / 100 : alturaNumero
        const valorCalculado = pesoNumero / (alturaEmMetro * alturaEmMetro)

        setImc(valorCalculado)

        if (idadeNumero > 20) {
            if (valorCalculado < 18.5) {
                setResultado('Adulto: Abaixo do peso')
            } else if (valorCalculado < 25) {
                setResultado('Adulto: Peso ideal')
            } else if (valorCalculado < 30) {
                setResultado('Adulto: Sobrepeso')
            } else if (valorCalculado < 35) {
                setResultado('Adulto: Obesidade grau I')
            } else if (valorCalculado < 40) {
                setResultado('Adulto: Obesidade grau II')
            } else {
                setResultado('Adulto: Obesidade grau III')
            }
        } else if (idadeNumero >= 2 && idadeNumero <= 19) {
            if (valorCalculado < 18.5) {
                setResultado('Criança: Abaixo do peso')
            } else if (valorCalculado < 25) {
                setResultado('Criança: Peso ideal')
            } else if (valorCalculado < 30) {
                setResultado('Criança: Sobrepeso')
            } else {
                setResultado('Criança: Obesidade')
            }
        } else {
            setResultado('Informe uma idade válida.')
        }
    }

    function limparCampos() {
        setAltura('')
        setPeso('')
        setIdade('')
        setImc(null)
        setResultado('')
    }

    return (
        <View style={styleApp.container}>
            <Text style={styleApp.title}>App pra calcular o IMC</Text>

            <TextInput
                value={altura}
                keyboardType="numeric"
                inputMode="decimal"
                style={styleApp.input}
                placeholder="Altura (m ou cm)"
                placeholderTextColor="#d9d9d9"
                onChangeText={setAltura}
            />

            <TextInput
                value={peso}
                keyboardType="numeric"
                inputMode="decimal"
                style={styleApp.input}
                placeholder="Peso (kg)"
                placeholderTextColor="#d9d9d9"
                onChangeText={setPeso}
            />

            <TextInput
                value={idade}
                keyboardType="numeric"
                inputMode="numeric"
                style={styleApp.input}
                placeholder="Idade"
                placeholderTextColor="#d9d9d9"
                onChangeText={setIdade}
            />

            <TouchableOpacity style={styleApp.button} onPress={calcularIMC}>
                <Text style={styleApp.buttonText}>Calcular IMC</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styleApp.limparButton} onPress={limparCampos}>
                <Text style={styleApp.limparButtonText}>Limpar</Text>
            </TouchableOpacity>

            {imc !== null && (
                <Text style={styleApp.resultado}>
                    Seu IMC: {imc.toFixed(2)}
                    {'\n'}
                    {resultado}
                </Text>
            )}

            {imc === null && resultado ? (
                <Text style={styleApp.resultado}>{resultado}</Text>
            ) : null}
        </View>
    )
}
