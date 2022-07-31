import { useEffect, useState } from 'react';

export default function useRightClickMenu() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (e) => {
    if (e.target.classList[0] && e.target.classList[0].startsWith('timecardRow_date')) {
      // setX(e.target.getBoundingClientRect().left);
      // setY(e.target.getBoundingClientRect().bottom);
      setShowMenu(true);
    }
    showMenu && setShowMenu(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return { x, y, showMenu };
}
