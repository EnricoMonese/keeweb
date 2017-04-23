const ChangeCssUtil = {

    init () {
        const style = document.createElement('style');
        document.head.appendChild(style);
        this.stylesheet = style.sheet;
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

module.exports = ChangeCssUtil;
