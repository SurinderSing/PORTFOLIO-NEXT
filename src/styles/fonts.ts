import { Raleway, Poppins, Pacifico } from 'next/font/google';

export const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

export const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const pacifico = Pacifico({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
});
