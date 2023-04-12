import { Cantarell, Nunito_Sans, Ubuntu } from 'next/font/google';

export const nunito = Nunito_Sans({ weight: '900', subsets: ['latin'] });
export const cantarell = Cantarell({ weight: '400', subsets: ['latin'] });
export const ubuntu = Ubuntu({ weight: '700', subsets: ['latin'] });

module.exports = {
  nunito,
  cantarell,
  ubuntu,
};
