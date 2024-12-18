import { loader } from 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

export const lazysizesForShadowDom = (shadowRoot, rootElement) => {
  // Inisialisasi lazysizes untuk elemen gambar di Shadow DOM
  const lazyImages = shadowRoot.querySelectorAll('.lazyload');
  lazyImages.forEach((img) => loader.unveil(img));

  if (rootElement !== null) {
    const imageTargets = shadowRoot.querySelectorAll('.lazyload');
    imageTargets.forEach((image) => {
      image.addEventListener('lazyloaded', () => {
        const skeleton = image.closest(rootElement)?.querySelector('.skeleton');
        if (skeleton) {
          skeleton.classList.add('hidden');
          setTimeout(() => skeleton.remove(), 300);
        }
      });
    });
  }
};
