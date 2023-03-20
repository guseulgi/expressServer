const arr = [1, 2, 3, 4, 5];

console.log(arr);
console.log(...arr);

const personData = {
  name: '이름',
  age: 29,
};

const personInfo = {
  nickName: '닉네임',
  email: '이메일',
};

const person = {
  ...personData,
  ...personInfo,
};
console.log(person);

const arr1 = [1, 2, 3];
const arr2 = ['4', '5'];

const arrMerge = [...arr1, ...arr2];
console.log(arrMerge);

const obj = {
  name: '이름',
  gender: 'fm',
  nickname: '닉네임',
};

const { name, ...rest } = obj;
console.log(name, rest);

const [firstNumber, ...restNumber] = [1, 2, 3, 4, 5];
console.log(firstNumber);
console.log(restNumber);

function spread(first, ...rest) {
  console.log(first);
  console.log(rest);
}
spread(1, 2, 3, 4, 5);
