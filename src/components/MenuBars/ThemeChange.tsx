import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeChange = () => {
  const $html = document.querySelector('html');
  const THEME_LIGHT = 'emerald';
  const THEME_DARK = 'night';
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const systemPrefer = useMediaQuery({
    //사용자 설정 테마
    query: '(prefers-color-scheme: dark)'
  });
  const osTheme: string = systemPrefer ? THEME_DARK : THEME_LIGHT;
  const userTheme = localStorage.getItem('theme');

  useEffect(() => {
    const theme = userTheme || osTheme;
    setIsDarkMode(() => theme === THEME_DARK);
  }, [systemPrefer, THEME_LIGHT, THEME_DARK]);

  const handleTheme = useCallback(() => {
    setIsDarkMode((prev: boolean) => {
      localStorage.setItem('theme', prev ? THEME_LIGHT : THEME_DARK);
      $html?.setAttribute( 'data-theme', prev ? THEME_LIGHT : THEME_DARK )
      return !prev;
    });
  }, [THEME_LIGHT, THEME_DARK]);

  return (
    <label
      className="swap swap-rotate mr-3 hover:text-green-400 transition-colors"
      data-set-theme={isDarkMode ? THEME_LIGHT : THEME_DARK}
      data-act-class="ACTIVECLASS"
    >
      <input className='js-theme' type='checkbox' onClick={() => handleTheme()} checked={!isDarkMode} readOnly/>
      <FiSun className='swap-off hover:text-green-400' size={22}/>
      <FiMoon className='swap-on hover:text-green-400' size={22} />
    </label>
  );
}

export default ThemeChange;