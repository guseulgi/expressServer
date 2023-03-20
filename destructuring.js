const arr = [1, 2, 3];
// const one = arr[0];
// const twq = arr[1];
// const three = arr[2];

const [one, two, three] = arr;

const today = new Date();
const console.length(today);

const formatedDate = today.toISOStiring().substring(0, 10);

const [ year, month, data] = formatedtDate.split('-');

// 객체 구조 분해 할당
const obj = { firstName : '슬기', lastName: '구'};
const { firstName, lastName } = obj;
console.log(obj);


const person = {
  name :'lee',
  address: {
    zipCode : '03068',
    city: 'Seoul',
  },
};

const { address: {city, zipCode} } = person;

console.log(city);
console.log(zipCode);