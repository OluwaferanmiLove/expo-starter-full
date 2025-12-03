import cx from 'classnames';
import { ReactNode, Ref, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Dimensions, Keyboard } from 'react-native';
import useLayoutHeight from 'src/hooks/use-layout-height';

import Input, { InputProps } from './input';
import BaseText, { BaseTextProps } from '../base/base-text';
import Pressable from '../base/pressable';
import { ButtonProps } from '../buttons/button';
import Radio from '../buttons/radio';
import ListItemCard from '../cards/list-item-card';
import SectionEmptyState, { SectionEmptyStateProps } from '../empty-states/section-empty-state';
import { ChevronDown, Search } from '../icons';
import BottomModal, { BottomModalProps } from '../modals/bottom-modal';

import { hp, wp } from '@/assets/utils/js';
import colors from '@/theme/colors';
import Row from '../row';
import { BottomSheetFlashList, BottomSheetView } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from 'node_modules/@shopify/flash-list/dist';
import SelectDropdownSkeletonLoader from './select-dropdown-skeleton-loader';

export interface DropDownMethods {
  selectItem: (value: string) => void;
  close: VoidFunction;
  open: VoidFunction;
}

export interface DropDownItem {
  value: string;
  subTitle?: string;
  onPress?: VoidFunction;
  actionDelay?: number;
  label: string;
  inputLabel?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  bottomElement?: ReactNode;
}

export interface DropDownProps extends Partial<InputProps> {
  items: DropDownItem[];
  label?: string;
  headerComponent?: ReactNode;
  listAddOns?: ReactNode;
  selectedItem?: string;
  titleClasses?: string;
  titleProps?: BaseTextProps;
  descriptionProps?: BaseTextProps;
  modalProps?: Partial<BottomModalProps>;
  showAnchor?: boolean;
  showButton?: boolean;
  isMultiSelect?: boolean;
  isLoading?: boolean;
  customIcon?: ReactNode;
  selectedItems?: string[];
  buttons?: ButtonProps[];
  closeAfterSelection?: boolean;
  onPressItem?: (value: string) => void;
  displayText?: string;
  showLabel?: boolean;
  genItemKeysFun?: (value: DropDownItem, index?: number) => string;
  disabled?: boolean;
  scrollToSelected?: boolean;
  showRadio?: boolean;
  sectionEmptyStateProps?: SectionEmptyStateProps;
  hasSearch?: boolean;
  disableMultiSelectionDisplay?: boolean;
  searchLabel?: string;
}

let screenWidth = Dimensions.get('window').width;

const SelectDropdown = forwardRef((props: DropDownProps, ref?: Ref<DropDownMethods>) => {
  const {
    label,
    showAnchor = true,
    showRadio = true,
    headerComponent,
    listAddOns,
    isLoading,
    titleProps,
    descriptionProps,
    onPressItem,
    modalProps,
    selectedItem,
    showButton = false,
    isMultiSelect,
    customIcon,
    selectedItems,
    buttons,
    closeAfterSelection = true,
    items,
    displayText,
    showLabel,
    genItemKeysFun,
    disabled = false,
    scrollToSelected,
    sectionEmptyStateProps,
    hasSearch,
    disableMultiSelectionDisplay = false,
    searchLabel,
    ...rest
  } = props;
  const [dataSourceCords, setDataSourceCords] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [itemsCache, setItemsCache] = useState<DropDownItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (items?.length > 30 && !loaded) {
      setItemsCache(items.slice(0, 30));
    } else {
      setItemsCache(items);
    }
  }, [items, loaded]);

  useEffect(() => {
    if (show) {
      //avoid keyboard from showing up when the dropdown is opened
      Keyboard.dismiss();
    }

    if (selectedItem && scrollToSelected && show) {
      const findI = items.findIndex(d => d.value === selectedItem);
      setTimeout(() => {
        scrollHandler(findI);
      }, 300);
    }

    if (!show) {
      setSearch('');
    }
  }, [show]);

  useEffect(() => {
    if (hasSearch) {
      const results = [...items].filter(
        ({ label, value, subTitle }) =>
          label?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase()) ||
          value?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase()) ||
          subTitle?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase()),
      );

      setItemsCache(results);
      return;
    }

    setItemsCache(loaded ? items : (items?.slice(0, 30) ?? []));
  }, [search, items, loaded, hasSearch]);

  const scrollHandler = (index: number) => {
    if (dataSourceCords.length > index) {
      scrollRef?.current?.scrollTo({ x: 0, y: dataSourceCords[index - 1], animated: true });
    }
  };

  const closeModal = () => {
    setLoaded(false);
    setShow(false);
  };

  const handleSelectItem = (items: string) => {
    onPressItem?.(items);
    if (closeAfterSelection) {
      setShow(false);
    }
  };

  const isActive = useCallback(
    (value: string) => {
      if (isMultiSelect) {
        const active = selectedItems?.includes(value);
        return active;
      }

      return value === selectedItem;
    },
    [selectedItem, selectedItems, isMultiSelect],
  );

  useImperativeHandle(ref, () => ({
    open: () => setShow(true),
    close: closeModal,
    selectItem: (value: string) => {
      handleSelectItem(value);
    },
  }));

  const { bottom } = useSafeAreaInsets();

  const RightAccessory = useCallback(
    () => (
      <View className="p-3 my-12 bg-grey-bgOne rounded-full">
        {customIcon ? customIcon : <ChevronDown size={wp(16)} strokeWidth={2} currentColor={colors.grey.muted} />}
      </View>
    ),
    [customIcon],
  );

  const CustomDropdownElement = () => {
    return (
      <>
        {isMultiSelect && selectedItems?.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Row style={{ gap: wp(10) }}>
              {selectedItems?.map(i => (
                <View key={i} className="rounded-4 bg-grey-bgOne p-4 px-8">
                  <BaseText classes="text-black-secondary">{items?.find(({ value }) => value === i)?.label}</BaseText>
                </View>
              ))}
            </Row>
          </ScrollView>
        ) : undefined}
      </>
    );
  };

  const validItem = selectedItem && items?.find(item => item.value === selectedItem);

  return (
    <View>
      {showAnchor && (
        <Pressable onPress={() => setShow(true)} disabled={disabled}>
          <Input
            editable={false}
            selectDisabled={disabled}
            isDropdown
            type="select"
            value={
              selectedItems?.length > 0 && disableMultiSelectionDisplay === false
                ? ' '
                : displayText || (selectedItem && (validItem?.inputLabel ?? validItem?.label))
            }
            dropDownCustomElement={isMultiSelect && selectedItems?.length > 0 && disableMultiSelectionDisplay === false ? <CustomDropdownElement /> : undefined}
            onPressIn={disabled ? undefined : () => setShow(true)}
            label={label}
            rightAccessory={<RightAccessory />}
            {...rest}
            containerClasses={`py-0 ${rest.containerClasses}`}
            useBottomSheetInput
          />
        </Pressable>
      )}
      <BottomModal
        showButton={showButton}
        buttons={buttons}
        isVisible={show}
        // enableDynamicSizing
        // enableSnapPoints={false}
        enablePanningGesture={false}
        useChildrenAsDirectChild
        // customSnapPoints={[78]}
        customSnapPoints={items?.length > 10 ? [90] : items?.length < 5 ? [50] : [70]}
        // size={items?.length > 10 ? 'lg' : items?.length < 5 ? 'midi' : 'md'}
        closeModal={closeModal}
        title={showLabel ? label : ''}
        {...modalProps}>
        <BottomSheetView
          style={{
            flex: 1,
            position: 'relative',
            ...(!isLoading && listAddOns && showButton && buttons
              ? { paddingBottom: hp(100) }
              : { paddingBottom: hp(25) }),
          }}>
          {hasSearch ? (
            <View className="mx-20 pb-5">
              <Input
                containerClasses="mt-10"
                label={searchLabel ?? 'Search Items'}
                leftPadding={wp(35)}
                useBottomSheetInput
                leftAccessory={<Search size={wp(16)} primaryColor={colors?.black.muted} />}
                value={search}
                onChangeText={t => setSearch(t)}
              />
            </View>
          ) : (
            <View className="mx-20 pb-5">{headerComponent}</View>
          )}
          {isLoading && (
            // <View className="py-20">
            //   <ActivityIndicator size="small" color={colors.primary.main} />
            // </View>
            <SelectDropdownSkeletonLoader
              itemCount={10}
              showDescription={items?.some(item => item?.subTitle)}
              showLeftElement={items?.some(item => item?.leftElement)}
              showRightElement={showRadio}
            />
          )}
          {!isLoading && (
            <BottomSheetView style={{ paddingHorizontal: wp(20), flex: 1 }}>
              {Boolean(sectionEmptyStateProps !== undefined) && items.length < 1 && (
                <SectionEmptyState {...sectionEmptyStateProps} />
              )}
              <BottomSheetFlashList
                onLoad={() => setLoaded(true)}
                data={itemsCache}
                extraData={selectedItem || selectedItems}
                estimatedItemSize={50}
                showsVerticalScrollIndicator={false}
                renderItem={({ index, item: value }) => (
                  <ListItemCard
                    key={genItemKeysFun ? genItemKeysFun(value, index) : value.value}
                    onLayout={e => {
                      const layout = e.nativeEvent.layout;
                      dataSourceCords[index] = layout.y;
                      setDataSourceCords(dataSourceCords);
                    }}
                    showBorder={index !== items.length - 1}
                    title={value.label}
                    descriptionProps={descriptionProps}
                    descriptionClasses="mt-5"
                    description={value?.subTitle ? value.subTitle : undefined}
                    titleProps={{ weight: 'medium', ...titleProps }}
                    titleClasses={cx({
                      'text-black-secondary': !isActive(value.value),
                      'text-black-muted': isActive(value.value)! && isMultiSelect,
                    })}
                    onPress={() => {
                      value?.onPress?.();
                      handleSelectItem(value.value);
                    }}
                    // disabled={disabled ? disabled : isMultiSelect ? selectedItems?.includes(value?.value ?? '') : false}
                    // disabled={isMultiSelect ? isActive(value.value)! : false}
                    leftElement={value?.leftElement}
                    bottomElement={value?.bottomElement}
                    rightElement={
                      value?.rightElement ? (
                        value?.rightElement
                      ) : showRadio ? (
                        <Radio active={isActive(value.value)!} />
                      ) : undefined
                    }
                  />
                )}
                ListEmptyComponent={
                  <View className="flex items-center w-full bg-grey-bgOne py-15 mt-15">
                    <BaseText classes="text-black-placeholder" fontSize={13}>
                      No options to show
                    </BaseText>
                  </View>
                }
              />
              {listAddOns && <View className="h-[70]"></View>}
            </BottomSheetView>
          )}
          {!isLoading && listAddOns ? (
            <View
              className="absolute px-20 rounded-[20px] border-t border-t-grey-border bg-white"
              style={{
                width: screenWidth,
                ...(!showButton && !buttons
                  ? { bottom: bottom + 5, borderBottomColor: colors.grey.border, borderBottomWidth: 1 }
                  : { bottom: hp(90) }),
              }}>
              {listAddOns}
            </View>
          ) : null}
          {/* <View className='h-80' /> */}
        </BottomSheetView>
      </BottomModal>
    </View>
  );
});

export default SelectDropdown;
