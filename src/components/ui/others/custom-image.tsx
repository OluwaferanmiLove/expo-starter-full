import { styled } from 'nativewind';
import { ActivityIndicator, View, ViewProps } from 'react-native';
import { Image, ImageProps } from 'expo-image';
import classNames from 'classnames';
import colors from 'src/theme/colors';
import { useState } from 'react';

interface CustomImageProps extends Partial<ViewProps> {
  imageProps: ImageProps;
  transparentBg?: boolean;
  cache?: boolean;
  showLoader?: boolean;
}

const CustomImage = ({
  imageProps,
  className,
  cache = false,
  showLoader = false,
  transparentBg = true,
  ...props
}: CustomImageProps) => {
  const fallBackImage =
    'https://res.cloudinary.com/catlog/image/upload/w_200,h_200,c_fill/v1754788351/product-placeholder.jpg';
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <View
      className={classNames('overflow-hidden', className, { 'bg-grey-extraLight': transparentBg === false })}
      {...props}>
      <Image
        className="w-full h-full"
        cachePolicy={cache ? 'memory-disk' : undefined}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={e => {
          setIsError(true);
        }}
        onLoad={e => {
          setIsError(false);
        }}
        {...imageProps}
        source={imageProps.source ?? imageProps.source.uri ?? fallBackImage}
      />
      {loading && showLoader && (
        <View className="absolute h-full w-full items-center justify-center">
          <ActivityIndicator size={'small'} color={colors.primary.main} />
        </View>
      )}
    </View>
  );
};

export default CustomImage;
