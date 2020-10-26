import Component from '@ember/component';
import { next } from '@ember/runloop';

export default Component.extend({
  tagName: 'a',
  offset: -65,

  click() {
    next(() => {
      let element = document.querySelector(this.element.hash);
      let position = element.offsetTop + this.offset;

      window.scroll({ top: position, behavior: 'smooth' });
    });
  }
});
