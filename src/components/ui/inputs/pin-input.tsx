import { View } from 'react-native';
import { BaseText } from '@/components/ui';
import React, { Fragment, Ref, useImperativeHandle } from 'react';
import {
  CodeField,
  CodeFieldProps,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import cx from 'classnames';

export interface PinInputMethod {
  focus: VoidFunction;
}

const CELL_COUNT = 6;

interface PinInputProps extends Partial<CodeFieldProps> {
  value: string;
  setValue: (value: string) => void;
  InputComponent?: any;
}

const PinInput = React.forwardRef(({ value, setValue, ...props }: PinInputProps, ref: Ref<PinInputMethod>) => {
  const inputRef = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [_, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus(),
    }),
    [],
  );

  return (
    <View className={'mt-20'}>
      <CodeField
        ref={inputRef}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        InputComponent={props?.InputComponent}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              className={cx(
                'border w-[45px] h-[52px] rounded-[10px] items-center justify-center',
                { 'border-primary-main': isFocused },
                { 'border-grey-border': !isFocused },
              )}>
              <BaseText
                fontSize={24}
                lineHeight={36}
                weight={'light'}
                classes={'text-secondary'}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol ? '•' : isFocused ? <Cursor cursorSymbol="|" /> : null}
              </BaseText>
            </View>
            {index === 2 && <View className="h-1 w-10 bg-grey-muted self-center" />}
          </Fragment>
        )}
        {...props}
      />
    </View>
  );
});

export default PinInput;
