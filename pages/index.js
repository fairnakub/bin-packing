import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { packer } from 'guillotine-packer';
import { Box, Typography } from '@mui/material';

export default function Home() {
  const result = packer({
    binHeight: 30,
    binWidth: 30,
    items: [
      {
        name: 'test2',
        width: 20,
        height: 20,
      },
      {
        name: 'test',
        width: 20,
        height: 20,
      },
    ],
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>คำนวณการจัดส่ง</title>
      </Head>

      <Box>
        <Typography>asd</Typography>
      </Box>
    </div>
  );
}
