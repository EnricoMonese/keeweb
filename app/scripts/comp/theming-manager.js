const Logger = require('../util/logger');

const logger = new Logger('theming-manager');

const ThemingManager = {
    allThemes: {
        fb: 'setGenThemeFb',
        db: 'setGenThemeDb',
        sd: 'setGenThemeSd',
        sl: 'setGenThemeSl',
        wh: 'setGenThemeWh',
        te: 'setGenThemeTe',
        hc: 'setGenThemeHc'
    },

    init () {
        const style = document.createElement('style');
        document.head.appendChild(style);
        this.stylesheet = style.sheet;
        logger.info('Theming init done');
    },

    setByTheme: function(theme) {
        if (theme.get('theme')) {
            this.setTheme(theme.get('theme'));
        }
        if (theme.get('fontSize')) {
            this.setFontSize(theme.get('fontSize'));
        }
    },

    setTheme: function(theme) {
        _.forEach(document.body.classList, cls => {
            if (/^th\-/.test(cls)) {
                document.body.classList.remove(cls);
            }
        });
        document.body.classList.add(this.getThemeClass(theme));
        const metaThemeColor = document.head.querySelector('meta[name=theme-color]');
        if (metaThemeColor) {
            metaThemeColor.content = window.getComputedStyle(document.body).backgroundColor;
        }
    },

    getThemeClass: function(theme) {
        return 'th-' + theme;
    },

    setFontSize: function(fontSize) {
        document.documentElement.style.fontSize = fontSize ? (12 + fontSize * 2) + 'px' : '';
    },

    apply: function () {
      //  loop throug theme json and call changeCss for the entries
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
