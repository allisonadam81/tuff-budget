import { InputEvent } from '../../types';

export const numHandler = function (setter: React.Dispatch<React.SetStateAction<string | number>>) {
  return (e: InputEvent) => setter(Number(e.target.value.replace(/\D/g, '')));
};

export const changeHandler = function (setter: React.Dispatch<React.SetStateAction<string>>) {
  return (e: InputEvent) => setter(e.target.value);
}

export const checkHandler = function (setter: React.Dispatch<React.SetStateAction<boolean>>) {
  return (e: InputEvent) => setter(e.target.checked);
}