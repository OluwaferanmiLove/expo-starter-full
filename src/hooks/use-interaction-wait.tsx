import { useEffect, useState } from 'react';
import { InteractionManager } from 'react-native';

function useInteractionWait() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setReady(true);
    });

    return () => task.cancel();
  }, []);
  return {ready}
}

export default useInteractionWait