const Logger = require('../util/logger');

const logger = new Logger('theming-manager');

const ThemingManager = {
  init () {
      const style = document.createElement('style');
      document.head.appendChild(style);
      this.stylesheet = style.sheet;
  },

  apply: function () {
    //loop throug theme json and call changeCss for the entries
  },

  changeCss: function (selector, property, value) {
      try {
          this.stylesheet.insertRule(selector + ' {' + property + ':' + value + '}', this.stylesheet.cssRules.length);
      } catch (err) {
          try {
              this.stylesheet.addRule(selector, property + ':' + value); // (pre IE9)
          } catch (err) {
              // console.log("Couldn't add style");
              // this.lc = new Logger('theming-css');
              // this.lc.info('Couldn\'t add style');
          }
      }
  }
};

module.exports = ThemingManager;
