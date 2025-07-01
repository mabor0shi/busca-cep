import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";

export default function App() {
  const [CEP, setCEP] = useState("");
  const [Campo, setCampo] = useState("");
  const [Bairro, setBairro] = useState("");
  const [Cidade, setCidade] = useState("");
  const [Logradouro, setLogradouro] = useState("");
  const [informacoes, setInformacoes] = useState(false);

  async function buscarCEP(CEP) {
    const CEPLinpo = CEP.replace(/\D/g, "");
    if (CEPLinpo === '') {
      alert("coloque o CEP");
      return;
    }
    if (CEPLinpo.length !== 8) {
      alert("CEP errado, digite 8 digitos")
      return;
    }
    try {
      const resposta = await fetch(
        `https://viacep.com.br/ws/${CEPLinpo}/json/`
      );
      const json = await resposta.json();
      if (json.erro) {
        throw new Error("Este CEP não existe");
      }
      setBairro(json.bairro);
      setLogradouro(json.logradouro);
      setCEP(json.cep);
      setCidade(json.localidade);
      setInformacoes(true);

    } catch (error) {
      alert("CEP não existe")
      console.error("Erro ao consultar API")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.caixa}>
        <View style={styles.cabeçario}>
          <Entypo name="location-pin" size={32} color={"black"} />
          <Text style={styles.titulo}>Buscar cep</Text>
        </View>

        <Text style={styles.subtitulo}>Digete o cep para encontrar o endereço</Text>

        <Text style={styles.label}>CEP</Text>

        <View style={styles.formulario}>
          <TextInput
            value={Campo}
            onChangeText={(texto) => setCampo(texto)}
            style={styles.campo}
            placebolder="000000001" />
          <TouchableOpacity onPress={() => buscarCEP(Campo)}
            style={styles.botao}>
            <Entypo name="magnifying-glass" size={24} color={"#fff"} />
          </TouchableOpacity>

        </View>
        {informacoes && (
          <View style={styles.endereco}>
            <Text style={styles.tituloCep}>Endereço encontrado</Text>
            <View style={styles.informacao}>
              <View>
                <Text style={styles.tituloinfo}>CEP:</Text>
                <Text style={styles.enderecoinfo}>{CEP}</Text>
              </View>
              <View>
                <Text style={styles.tituloinfo}>Logradouro:</Text>
                <Text style={styles.enderecoinfo}>{Logradouro}</Text>
              </View>
              <View>
                <Text style={styles.tituloinfo}>Bairro:</Text>
                <Text style={styles.enderecoinfo}>{Bairro}</Text>
              </View>
              <View>
                <Text style={styles.tituloinfo}>Cidade:</Text>
                <Text style={styles.enderecoinfo}>{Cidade}</Text>
              </View>
            </View>
          </View>
        )}
        <Text style={styles.criador}>Feito por: Cristiano</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(201, 201, 201)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  caixa: {
    borderWidth: 1,
    bordercolor: 'rgb(84, 84, 84)',
    borderRadius: 4,
    padding: 12,
    backgroundColor: 'rgb(211, 221, 228)'
  },
  cabeçario: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4
  },
  titulo: {
    fontalign: 'center',
    fontSize: 32,
    fontWeight: 'bold'
  },
  formulario: {
    flexDirection: 'row',
    margintop: 4
  },
  campo: {
    flex: 1,
    borderWidth: 1,
    bordercolor: 'rgb(56, 52, 52)',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    padding: 8
  },
  botao: {
    backgroundColor: 'rgb(79, 77, 77)',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'left',
    margintop: 15,
    paddingTop: 12
  },
  endereco: {
    margintop: 10,
    borderRadius: 4,
    borderWidth: 1,
    bordercolor: 'rgb(79, 77, 77)',
    paddding: 12,
  },
  tituloinfo: {
    color: 'rgb(79, 77, 77)',
    fontsize: 10,
    fontWeight: '300',
    marginVertical: 6
  },
  enderecoinfo: {
    color: 'rgb(54, 53, 53)',
    fontsize: 13,
    fontWeight: 'bold'
  },
  criador: {
    color: 'rgba(112, 112, 112, 0.5)',
    fontWeight: '400',
    textAlign: 'end'
  }
}
);