import { createRoot } from 'react-dom/client';
import { DebuggingCasketContext_Provider } from '../libs/DesignCasketContext';
import DesignCasketApp from '../components/DesignCasketApp';

((w, $) => {
  'use strict';

  $(() => {
    const rootEl = document.getElementById('DESIGN_CASKET_ROOT');
    if(!rootEl) return;

    const root = createRoot(rootEl);
    const { design, editmode } = rootEl.dataset;

    root.render(
      <DebuggingCasketContext_Provider 
        design={ (design ? parseInt(design) : '') } 
        editmode={ parseInt(editmode) } >
        <DesignCasketApp />
      </DebuggingCasketContext_Provider>);
  })
})(window, jQuery) 