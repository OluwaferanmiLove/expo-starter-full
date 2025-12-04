import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

function Camera({}, ref: ForwardedRef<CameraView>,) {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  
  const toggleFacing = () => {
    setFacing(facing === 'front' ? 'back' : 'front');
  };
  


  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return null;
  }

  return (
    <View className="flex-1 justify-center">
      <CameraView ref={ref} className="flex-1" facing={'front'} />
    </View>
  );
}

export default forwardRef(Camera);
