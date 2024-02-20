import { createRoot } from 'react-dom/client';
import { DebuggingCasketContext_Provider } from '../libs/DesignCasketContext';
import DesignCasketApp from '../components/DesignCasketApp';

((w, $) => {
  'use strict';

  $(() => {
    const root = createRoot(document.getElementById('DESIGN_CASKET_ROOT'));
    if(!root) return;

    root.render(<DebuggingCasketContext_Provider>
        <DesignCasketApp />
      </DebuggingCasketContext_Provider>);
  })
})(window, jQuery) 