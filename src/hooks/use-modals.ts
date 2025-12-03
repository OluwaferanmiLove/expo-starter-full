import { useState, useRef } from 'react';

type ModalKeys = string;

export type ModalsState<T extends ModalKeys> = {
  [key in T]: boolean;
};

type UseModalsResult<T extends ModalKeys> = {
  modals: ModalsState<T>;
  toggleModal: (key: T | T[], value?: boolean) => void;
  switchModals: (key1: T, key2: T, timeOut?: number) => void;
  toggleRef: React.MutableRefObject<(key: T, value?: boolean) => void>;
};

function useModals<T extends ModalKeys>(keys: T[]): UseModalsResult<T> {
  const initialModalsState: ModalsState<T> = keys.reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as ModalsState<T>);
  const [modals, setModals] = useState<ModalsState<T>>(initialModalsState);

  const switchModals = (key1: T, key2: T, timeOut = 700) => {
    if (key1 === key2) {
      return;
    }
    const key1IsOpen = modals[key1];

    toggleModal(key1IsOpen ? key1 : key2, false);
    setTimeout(() => {
      toggleModal(key1IsOpen ? key2 : key1, true);
    }, timeOut);
  };

  const toggleModal = (key: T | T[], value?: boolean) => {
    setModals(prevModals => {
      // normalize to array (so we can handle one or many keys)
      const keysToUpdate = Array.isArray(key) ? key : [key];

      const newState = { ...prevModals };

      keysToUpdate.forEach(k => {
        newState[k] = value !== undefined ? value : !prevModals[k];
      });

      return newState;
    });
  };

  const toggleRef = useRef(toggleModal);

  return { modals, toggleModal, switchModals, toggleRef };
}

export default useModals;
