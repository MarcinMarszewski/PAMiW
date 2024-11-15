import { handleCalculation } from '../../controllers/calculatorController';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  handleCalculation(req, res);
}
