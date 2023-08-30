/* eslint-env browser */

import React from 'react';
import { createRoot } from 'react-dom/client';

import Layout from '../layout/Layout';

const root = createRoot(document.getElementById('app'));
root.render(<Layout />);
