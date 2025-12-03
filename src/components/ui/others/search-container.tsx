import { Category2, More } from 'iconsax-react-native/src';
import { useRef } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import Pressable from '../base/pressable';
import SelectDropdown, { DropDownItem, DropDownMethods } from '../inputs/select-dropdown';

import { wp } from '@/assets/utils/js';
import { Search } from '@/components/ui/icons';
import Input from '@/components/ui/inputs/input';
import colors from '@/theme/colors';

interface SearchContainerProps {
  headerStyle: { height?: number; marginTop?: number; paddingHorizontal?: number; paddingVertical?: number };
  inputStyle: { opacity: number };
  color: SEARCH_BG_VARIANT;
  onPressSearch?: VoidFunction;
  actions?: DropDownItem[];
  placeholder: string;
}

export enum SEARCH_BG_VARIANT {
  YELLOW,
  RED,
  GREEN,
  ORANGE,
  DEFAULT,
}

const SearchContainer = ({
  headerStyle,
  inputStyle,
  color = SEARCH_BG_VARIANT.DEFAULT,
  placeholder = 'Search',
  actions,
  onPressSearch,
}: SearchContainerProps) => {
  const colorVariants = {
    [SEARCH_BG_VARIANT.GREEN]: colors.accentGreen.pastel2,
    [SEARCH_BG_VARIANT.ORANGE]: colors.accentOrange.pastel,
    [SEARCH_BG_VARIANT.RED]: colors.accentRed.pastel,
    [SEARCH_BG_VARIANT.YELLOW]: colors.accentYellow.pastel,
    [SEARCH_BG_VARIANT.DEFAULT]: colors.grey.mutedLight,
  };

  const dropDownRef = useRef<DropDownMethods>(null);

  const handleOnPressAction = (v: string) => {
    const vIndex = actions.findIndex(d => d.value === v);
    if (vIndex !== -1) {
      const actionDelay = actions[vIndex]?.actionDelay;

      setTimeout(() => {
        actions[vIndex].onPress?.();
      }, actionDelay ?? 100);
    }
  };

  return (
    <>
      <Animated.View
        // className={'absolute w-full z-50'}
        style={[headerStyle, { backgroundColor: colorVariants[color] }]}>
        <Animated.View style={[inputStyle, { gap: wp(10) }]} className="flex-row">
          <Pressable onPress={onPressSearch} className="flex-1">
            <Input
              containerClasses="bg-white"
              greyOutOnDisabled={false}
              onPress={onPressSearch}
              editable={false}
              placeholder={placeholder}
              rightAccessory={<Search primaryColor={colors?.black.muted} size={wp(18)} />}
              hasBorder={false}
            />
          </Pressable>
          {Boolean(actions) && (
            <Pressable
              className="bg-white items-center justify-center px-15 rounded-12"
              onPress={() => dropDownRef.current.open()}>
              <More color={colors.black.muted} variant="Linear" size={wp(20)} />
            </Pressable>
          )}
        </Animated.View>
      </Animated.View>
      <SelectDropdown
        showAnchor={false}
        showRadio={false}
        ref={dropDownRef}
        selectedItem=""
        onPressItem={handleOnPressAction}
        items={actions ?? []}
        containerClasses="mb-15"
        label="More Actions"
        genItemKeysFun={value => value.label}
        // showButton
        showLabel
      />
    </>
  );
};

export default SearchContainer;
