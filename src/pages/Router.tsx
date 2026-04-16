import { type FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './browserRouter';

export const Router: FC = () => {
  return <RouterProvider router={browserRouter()} />;
};
