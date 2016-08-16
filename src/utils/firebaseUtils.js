import {forEach} from 'lodash';


export function fbToArray(firebaseData) {
  let arr = [];
  forEach(firebaseData, (value, key) => {
    value.id = key;
    arr.push(value);
  });
  return arr;
}
