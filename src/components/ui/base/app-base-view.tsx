import { Text, View } from 'react-native';

interface AppBaseViewProps {
  children: JSX.Element 
}

const AppBaseView = ({children}: AppBaseViewProps) => {
  return (
    <View className="flex-1 bg-white">
      {children}
    </View>
  );
};

export default AppBaseView;
