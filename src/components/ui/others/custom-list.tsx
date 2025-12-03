import { styled } from 'nativewind';
import { FlatList, FlatListProps, View, ViewProps } from 'react-native';
import EmptyState from '../empty-states/empty-state';
import Animated from 'react-native-reanimated';

interface CustomListProps extends Partial<FlatListProps<T>> {
  data?: T[];
  onPressListItem: (item: T) => void;
  renderDetails: React.FC<{ item: T }>;
  keyExtractor: (item: T) => string;
}

const CustomList = <T,>({ data, keyExtractor, renderDetails: RenderDetailsComponent, ...props }: CustomListProps) => {
  const renderItem = ({ item }: { item: T }) => <RenderDetailsComponent item={item} />;
  return (
    <Animated.FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      className="flex-1 px-20"
      contentContainerStyle={{ flexGrow: 1 }}
      ItemSeparatorComponent={() => <View className="border-b border-b-grey-border my-15" />}
      {...props}
    />
  );
};

export default styled(CustomList);
