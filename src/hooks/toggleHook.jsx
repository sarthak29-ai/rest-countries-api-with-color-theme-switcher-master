import React, { useCallback, useEffect, useId, useState } from 'react';




export function useToggle(id = null,isFirst = true, initialValue = false, doValue= false) {
  const localId = useId().replace(/:/g, "");
  const marker = `data-safe-${id? id : localId}`;
  const disableMarker = `data-disable-${id? id : localId}`;
  
  
  const [isOpen, setIsOpen] = useState( initialValue);


  

  // 3. Unified Toggle Dispatcher
  const toggle = useCallback((val) => {
    const next = typeof val === 'boolean' ? val : !isOpen;
    
    setIsOpen(next);
  }, [id, isOpen]);

  // 4. Click-Outside & ESC Logic
  useEffect(() => {
    const disabled = document.querySelectorAll(`[${disableMarker}]`);
    if (isOpen === doValue || !isFirst) return;
    
    const handleEvents = (e) => {
      if (e.key === "Escape") toggle(doValue);
      
      
      if (!e.target.closest(`[${marker}]`)) {
        toggle(doValue);
      }
    };
    
    disabled.forEach(el =>  el.setAttribute('inert', ''))
    
    document.addEventListener("click", handleEvents);
    document.addEventListener("keydown", handleEvents);
    return () => {
      disabled.forEach(el => el.removeAttribute('inert'))
      document.removeEventListener("click", handleEvents);
      document.removeEventListener("keydown", handleEvents);
    };
  }, [isOpen, toggle, marker]);

  return {
    isOpen,
    setIsOpen: toggle,
    // Spread on the summary and any safe content
    safeProps: { [marker]: "true" },
    // Spread on the <details> tag
    containerProps: { 
      
      onClick: (e) =>{
        e.preventDefault();
        e.stopPropagation();
        toggle(!isOpen)},
      [marker]: "true" // The container itself should be safe
    },
    // Only used if an ID is provided to disable other components
    disableProps: {
      [disableMarker]: "true"
    }
  };
}
