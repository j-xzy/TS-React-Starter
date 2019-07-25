import { App } from '@/app';
import '@/config';
import '@/lib/ajax';
import '@/store/createStore';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
);
