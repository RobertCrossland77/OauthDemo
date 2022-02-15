import {useState} from 'react';
import lambdas from '../api/lambdas';

export default (): [(token: string) => Promise<void>, any[], string] => {
  const [results, setResults] = useState<Array<string>>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const sayHello = async (token: string) => {
    try {
      const response = await lambdas.get('/hello', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('about to have a response');
      console.log(response);

      setResults(response.data);
      setErrorMessage('');
    } catch (e) {
      setErrorMessage('Something went wrong!');
      console.dir(e);
    }
  };

  return [sayHello, results, errorMessage];
};
