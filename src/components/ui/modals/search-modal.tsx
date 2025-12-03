import { ScrollView, View } from 'react-native';
import BottomModal from './bottom-modal';
import Input from '../inputs/input';
import { Search } from '../icons';
import { wp } from 'src/assets/utils/js';
import colors from 'src/theme/colors';
import Container from '../container';
import { useState } from 'react';
import Pressable from '../base/pressable';

interface Props {
  show: boolean;
  toggle: VoidFunction;
  placeholder?: string;
  title?: string;
  onSearch?: (value: string) => void;
}
const SearchModal: React.FC<Props> = ({ show, toggle, title, placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = () => {
    onSearch?.(searchTerm);
    toggle();
  };
  return (
    <BottomModal
      title={title}
      buttons={[{ text: 'Search', onPress: handleSearch}]}
      isVisible={show}
      closeModal={toggle}>
      <View className="pb-20 px-20">
        <Input
          value={searchTerm}
          onChangeText={value => setSearchTerm(value)}
          containerClasses="bg-white"
          placeholder={placeholder ?? 'Search'}
          rightAccessory={
            <Pressable onPress={handleSearch}>
              <Search size={wp(18)} primaryColor={colors?.black.muted} />
            </Pressable>
          }
        />
      </View>
    </BottomModal>
  );
};
export default SearchModal;
