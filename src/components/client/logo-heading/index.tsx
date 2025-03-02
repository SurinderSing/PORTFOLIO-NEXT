import Link from 'next/link';
import React from 'react';
import styles from './styles.module.css';
import parse from 'html-react-parser';

interface LogoHeadingProps {
  title: string;
  href: string;
}

const LogoHeading: React.FC<LogoHeadingProps> = ({ title, href }) => {
  return (
    <Link href={href}>
      <div className={styles.logoHeading}>{parse(title || '')}</div>
    </Link>
  );
};

export default LogoHeading;
