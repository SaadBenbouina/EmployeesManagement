import { useEffect } from 'react';

export const useAdjustHeight = (sidebarSelector: string, contentSelector: string) => {
  useEffect(() => {
    const adjust = () => {
      const sidebar = document.querySelector(sidebarSelector) as HTMLElement | null;
      const content = document.querySelector(contentSelector) as HTMLElement | null;

      if (content && sidebar) {
        if (content.scrollHeight > sidebar.clientHeight) {
          console.log("Before adjustment - sidebar.style.height:", sidebar.style.height);
          sidebar.style.height = `${content.scrollHeight}px`;
          console.log("After adjustment - sidebar.style.height:", sidebar.style.height);
        }
      }
    };

    adjust();

    window.addEventListener('resize', adjust);

    window.addEventListener('load', adjust);

     
    return () => {
      window.removeEventListener('resize', adjust);
      window.removeEventListener('load', adjust);
    };
  }, [sidebarSelector, contentSelector]);
};
