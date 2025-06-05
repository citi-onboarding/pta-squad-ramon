import { View, Text } from "react-native";
import CardConsultaPet from "../src/components/cardpet";

const App: React.FC = () => (
  <View className="flex-1 justify-center items-center bg-gray-100">
    <Text className="text-xl font-barlowBold text-[#58cbfb]">
      Made with &lt; / &gt; and 🩵 by CITi
    </Text>
    <CardConsultaPet
      dataHora="2023-09-15 10:00"
      nomePet="Rex"
      nomeTutor="João"
      nomeVeterinario="Dr. Silva"
      tipoConsulta="check-up"
      especie="cachorro"
      id="1"
    />
  </View>
);

export default App;
