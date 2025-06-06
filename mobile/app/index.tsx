import { View, Text, ScrollView } from "react-native";

const consultasMock = [
  {
    id: 1,
    pet: "Rex",
    tutor: "João",
    horario: "09:00",
    data: "2024-06-10",
    descricao: "Vacinação anual",
  },
  {
    id: 2,
    pet: "Mia",
    tutor: "Maria",
    horario: "11:30",
    data: "2024-06-10",
    descricao: "Consulta de rotina",
  },
  {
    id: 3,
    pet: "Thor",
    tutor: "Carlos",
    horario: "14:00",
    data: "2024-06-10",
    descricao: "Retorno pós-cirurgia",
  },
  {
    id: 4,
    pet: "Luna",
    tutor: "Ana",
    horario: "16:15",
    data: "2024-06-10",
    descricao: "Exame de sangue",
  },
];

const App: React.FC = () => (
  <View className="flex-1 justify-center items-center bg-gray-100">
    <View className="border border-gray-300 shadow-lg rounded-[32px]">
      <Text className="text-2xl font-bold text-center p-4">Welcome to CITi Pet</Text>
    </View>


  </View>
  
  
);

export default App;
