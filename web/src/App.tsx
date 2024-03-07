import React from 'react';
import Home from './pages/Home/HomePage';
import './global.css';
import { Theme } from '@radix-ui/themes';

const App: React.FC = () => {

  return (
    <html>
      <body className='color-body'>
        <Theme>
          <Home />
        </Theme>
      </body>
    </html>
  );
};

export default App;


