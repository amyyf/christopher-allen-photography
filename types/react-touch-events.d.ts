declare module 'react-touch-events' {
  import * as React from 'react';

  type ReactTouchEventsProps = {
    children: JSX.Element;
    onSwipe: (
      event: React.SyntheticEvent,
      direction: 'left' | 'right' | 'top' | 'bottom',
    ) => Promise<boolean> | undefined;
  };
  const component: React.FC<ReactTouchEventsProps>;

  export default component;
}
