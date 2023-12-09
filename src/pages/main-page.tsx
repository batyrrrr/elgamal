import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
interface Crypted {
  a: number
  b: number
}
interface initialVals {
  p: string
  g: string
  x: string
  message: string
}

export const MainPage = () => {
  const [generatedX, setGeneratedX] = useState<number | null>(null);
  const [cryptedObj, setCryptedObj] = useState<Crypted[]>([]);
  const [randomK, setRandomK] = useState<number>(0);
  const [charMessage, setCharMessage] = useState('');
  const [encrypHandled, setEncrypHandled] = useState(false);
  const [charValues, setCharValues] = useState<initialVals>();

  const formik = useFormik({
    initialValues: {
      p: '',
      g: '',
      x: '',
      message: '',
    },
    validationSchema: Yup.object({
      p: Yup.number()
        .typeError('Неверный ввод для p. Пожалуйста введите правильное число.')
        .positive('Поле должно содержать положительное число')
        .integer('Поле должно содержать только числа')
        .required('Поле обязательно'),
      // .test(
      //   'is-prime',
      //   'p must be a prime number',
      //   (value) => isPrime(value)
      // ),
      g: Yup.number()
        .typeError('Неверный ввод для g. Пожалуйста введите правильное число.')
        .positive('Поле должно содержать положительное число')
        .integer('Поле должно содержать только числа')
        .required('Поле обязательно')
        // .test(
        //   'is-valid-g',
        //   'число g должно быть меньше числа p',
        //   (value, { parent }) => isPositiveInteger(value) && value > 1 && value < parent.p
        // )
        .test('is-primitive', 'Число должно быть примитивным корнем корнем по модулю p', (value, { parent }) => isPrimitiveRoot(value, parent.p)),
      x: Yup.number()
        .typeError('Неверный ввод для x. Пожалуйста введите правильное число.')
        .positive('Поле должно содержать положительное число')
        .integer('Поле должно содержать только числа')
        .required('Поле обязательно'),
      message: Yup.string().required('Поле обязательно')
        .matches(/^[a-zA-Z]+$/, 'Используйте латинские буквы'),
    }),
    onSubmit: (values) => {
      if (charValues !== values) {
        const k = getRandomInt(2, +values.p - 2)
        setCharMessage(formik.values.message)
        setRandomK(k)
        const numericalValues = [];

        for (let i = 0; i < formik.values.message.length; i++) {
          const char = formik.values.message[i].toUpperCase();
          const numericalValue = alphabet.indexOf(char) + 1; // 1-based index
          const a = Math.pow(+formik.values.g, randomK) % +formik.values.p;
          const y = Math.pow(+formik.values.g, +formik.values.x) % +formik.values.p;
          const b = (numericalValue * Math.pow(y, randomK)) % +formik.values.p;
          console.log(a + ' a');
          console.log(b + ' b');
          if (cryptedObj.length === 0) {
            setCryptedObj(prev => [...prev, { a, b }]);
          } else {
            toast.error('Сначала сбросьте предыдущие значения')
          }
        }

      }

    },
  });

  console.log(charValues)
  function EncryptHandle() {
    if (cryptedObj.length === 0) toast.error('У вас нет шифрованного сообщения')
    setEncrypHandled(true)
    for (let i = 0; i < cryptedObj.length; i++) {
      const charObj = cryptedObj[i]
      let M = charObj.b * (Math.pow(charObj.a, -randomK))
      console.log(M)
    }
  }

  // Функция для проверки является ли число простым
  const isPrime = (num: number) => {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) return false;
    }
    return num > 1;
  };

  // Функция для проверки положительного целого числа
  const isPositiveInteger = (num: number) => {
    return Number.isInteger(num) && num > 0;
  };

  function isPrimitiveRoot(g: number, p: number) {
    if (g <= 1 || g >= p) {
      return false; // Шаг 1  
    }

    for (let k = 1; k <= p - 2; k++) {
      if (modularExponentiation(g, k, p) === 1) {
        return false; // Шаг 2
      }
    }

    return true;
  }

  // Вспомогательная функция для вычисления a^b mod p
  function modularExponentiation(a: number, b: number, p: number) {
    let result = 1;
    a = a % p;
    while (b > 0) {
      if (b % 2 === 1) {
        result = (result * a) % p;
      }
      b = Math.floor(b / 2);
      a = (a * a) % p;
    }
    return result;
  }


  const generateX = () => {
    if (!formik.values.p) toast.error('Сначала введите значение для p');
    const p = parseInt(formik.values.p, 10);
    if (!Number.isNaN(p) && isPositiveInteger(p)) {
      let xCandidate = getRandomInt(2, p - 2);
      while (gcd(xCandidate, p - 1) !== 1) {
        xCandidate = getRandomInt(2, p - 2);
      }
      setGeneratedX(xCandidate);
      formik.setFieldValue('x', xCandidate.toString());
    }
  };

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };
  function TrashHandle() {
    if (cryptedObj.length === 0) toast.error('Не могу найти введенные данные')
    setCryptedObj([])
    setCharMessage('')
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '500px', rowGap: 2 }}>

          <TextField
            id="p"
            name="p"
            label="p (prime number)"
            inputProps={{ maxLength: 3 }}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.p}
            error={formik.touched.p && Boolean(formik.errors.p)}
            helperText={formik.touched.p && formik.errors.p}
          />

          <TextField
            id="g"
            name="g"
            label="g (generator)"
            inputProps={{ maxLength: 3 }}

            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.g}
            error={formik.touched.g && Boolean(formik.errors.g)}
            helperText={formik.touched.g && formik.errors.g}
          />
          <TextField
            id="x"
            name="x"
            label="x (private key)"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            inputProps={{ readOnly: true }}
            focused={false}
            value={formik.values.x}
            error={formik.touched.x && Boolean(formik.errors.x)}
            helperText={formik.touched.x && formik.errors.x}
          />
          <Button onClick={generateX} variant='outlined'>Сгенерировать x</Button>

          <TextField
            id="message"
            name="message"
            label="Message"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />

          <Button type="submit" variant="contained" color="primary">
            Зашифровать
          </Button>
          <Button onClick={EncryptHandle} color='secondary' variant='outlined'>Дешифровать</Button>
          <Button onClick={TrashHandle} color='error' variant='outlined'>Сброс</Button>

          {encrypHandled && <Typography>Начальное сообщение - {charMessage}</Typography>}

          {charMessage && <Typography fontWeight={700}>Шифротекст текста - {charMessage}</Typography>}

          {cryptedObj?.map((cr, i) => (
            <Typography key={i}>{cr.a} - {cr.b}</Typography>
          ))}
        </Box>
        <ToastContainer />
      </form>
    </>
  );
};

{/* <Typography>
Если у вас сложности при выборе числа g, то вот вам инструкция.Примитивный корень по модулю pp должен удовлетворять условию:

gkmod  p≠1gkmodp=1

для всех 1≤k≤p−21≤k≤p−2. При g=8g=8 в вашем примере:

81mod  17=881mod17=8
82mod  17=1382mod17=13
83mod  17=1683mod17=16
84mod  17=284mod17=2
85mod  17=485mod17=4
86mod  17=1586mod17=15
87mod  17=987mod17=9
88mod  17=188mod17=1

Здесь 88mod  17=188mod17=1, что означает, что g=8g=8 не является примитивным корнем по модулю 1717.
</Typography> */}