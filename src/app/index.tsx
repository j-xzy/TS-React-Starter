import * as React from 'react';
import './style.styl';

export function App() {
  const { hello } = window.useMappedState((s) => ({ hello: s.hello }));
  React.useEffect(() => {
    window.dispatch('getHelloFromRemote', 'foo');
  }, []);
  return (
    <div className='app'>
      {hello}
    </div>
  );
}
