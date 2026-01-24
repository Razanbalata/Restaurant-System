import { Header } from '@/widgets/header/Header';
import React from 'react';

function layout({children}) {
  return (
    <html lang="en">
        <body>
            <Header />
            {children}
        </body>
    </html>
  );
}

export default layout;
