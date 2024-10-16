import Calculator from '../../models/Calculator';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { number1, number2 } = req.body;

    // Tworzymy nową instancję kalkulatora
    const calculator = new Calculator(number1, number2);
    
    // Obliczamy wynik
    const result = calculator.add();
    
    // Zwracamy wynik do klienta
    res.status(200).json({ result });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
