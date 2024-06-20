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

    // Initial height adjustment
    adjust();

    // Adjust height on window resize
    window.addEventListener('resize', adjust);

    // Adjust height on content load
    window.addEventListener('load', adjust);

    // Adjust height on content changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log("Mutation observed:", mutation);
        adjust();
      });
    });
    
    const content = document.querySelector(contentSelector) as HTMLElement | null;
    if (content) {
      observer.observe(content, { childList: true, subtree: true });
    }

    // Cleanup function to remove the event listeners and observer
    return () => {
      window.removeEventListener('resize', adjust);
      window.removeEventListener('load', adjust);
      observer.disconnect();
    };
  }, [sidebarSelector, contentSelector]);
};
