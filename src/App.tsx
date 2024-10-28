import { createSelector } from '@reduxjs/toolkit';
import Routing from './Routes'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {

  const SelecthemeLayout = createSelector(
    (state: any) => state.Theme,
    (state) => state.layoutTheme
  );
  const themeLayout = useSelector(SelecthemeLayout);
  const className = 'layout-3'
  const className2 = 'layout-extended'
  const className3 = 'layout-moduler'

  useEffect(() => {
    if (themeLayout === 'vertical-tab') {
      document.body.classList.add(className);
    } 
    if (themeLayout === 'extended') {
      document.body.classList.add(className2);
    } 
    if (themeLayout === 'moduler') {
      document.body.classList.add(className3);
    } 

  }, [themeLayout])

  return (
    <>
      <Routing />
    </>
  )
}

export default App
