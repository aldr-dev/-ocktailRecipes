import {Parameter} from '../types';

const parseParameters = (parameters: string) => {
  try {
    return JSON.parse(parameters) as Parameter[];
  } catch (error) {
    return [];
  }
};

export default parseParameters;