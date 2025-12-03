import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}

    // Add this type definition
    interface NavigationProp<ParamList = RootStackParamList, RouteName extends keyof ParamList = keyof ParamList>
      extends StackNavigationProp<ParamList, RouteName> {}
  }
}
