// ==UserScript==
// @name         Excalidraw Microsoft Surface Pen Eraser Support
// @namespace    https://dt.in.th/
// @version      0.1
// @description  Adds Microsoft Surface Pen Eraser support to Excalidraw
// @author       Thai Pangsakulyanont (dtinth)
// @match        https://excalidraw.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=excalidraw.com
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  let activated
  function handlePointer(e) {
    const isEraser = e.pointerType === 'pen' && e.buttons & 32
    const isPenActive = document.querySelector('[data-testid="freedraw"]')
      ?.checked
    if (!activated && isEraser && isPenActive) {
      document.querySelector('button[aria-label="Eraser"]')?.click()
      activated = true

      // Force Excalidraw to recognize this as a normal button.
      // https://github.com/excalidraw/excalidraw/blob/4a9fac2d1e5c4fac334201ef53c6f5d2b5f6f9f5/src/components/App.tsx#L2945-L2951
      Object.defineProperty(e, 'button', { value: 0 })
    }
    if (activated && !isEraser) {
      // Clicking the eraser button again will switch back to the last used tool
      // https://github.com/excalidraw/excalidraw/issues/4978
      document.querySelector('button[aria-label="Eraser"]')?.click()
      activated = false
    }
  }

  window.addEventListener('pointerdown', handlePointer, { capture: true })
  window.addEventListener('pointermove', handlePointer, { capture: true })
})()
