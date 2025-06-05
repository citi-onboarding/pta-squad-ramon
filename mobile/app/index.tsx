import { Image, View, Text } from "react-native";
import { logotipo } from "../src/assets/icons/index";

const App: React.FC = () => (
  <>
    <View className="flex-1 justify-normal bg-white px-12 pt-28">
      <img src="../src/assets/icons/tela-mobile" alt="foto" />
      <Text className="text-[24px] font-extrabold text-[#000000] py-2 font-" style={{ fontFamily: '"Source Code Pro", monospace' }}>
        Sua agenda
      </Text>
      <Text className="text-[12px] font-sans text-[#000000]">
        Veja aqui todos os seus pacientes agendados para hoje.
      </Text>
    </View>

    <View className="absolute bottom-0 w-full h-[75px] bg-[#50E678] rounded-t-3xl"> </View>
  </>
);

export default App;
