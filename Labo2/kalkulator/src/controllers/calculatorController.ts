import Calculator from '../models/Calculator';
import { NextApiRequest, NextApiResponse } from 'next';

export function handleCalculation(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { number1, number2 } = req.body;

    const calculator = new Calculator(number1, number2);
    const result = calculator.add();

    res.status(200).json({ result });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}