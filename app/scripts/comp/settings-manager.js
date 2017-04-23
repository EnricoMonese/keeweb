const Backbone = require('backbone');
const Locale = require('./../util/locale');

const SettingsManager = {
    neutralLocale: null,
    activeLocale: 'en',

    allLocales: {
        'en': 'English'
    },

    customLocales: {
    },

    setBySettings: function(settings) {
        const locale = settings.get('locale');
        try {
            if (locale) {
                this.setLocale(settings.get('locale'));
            } else {
                this.setLocale(this.getBrowserLocale());
            }
        } catch (ex) {}
    },

    setLocale(loc) {
        if (!loc || loc === this.activeLocale) {
            return;
        }
        let localeValues;
        if (loc !== 'en') {
            if (this.customLocales[loc]) {
                localeValues = this.customLocales[loc];
            } else {
                localeValues = require('../locales/' + loc + '.json');
            }
        }
        if (!this.neutralLocale) {
            this.neutralLocale = _.clone(Locale);
        }
        _.extend(Locale, this.neutralLocale, localeValues);
        this.activeLocale = loc;
        Backbone.trigger('set-locale', loc);
    },

    getBrowserLocale: function() {
        const language = navigator.languages && navigator.languages[0] || navigator.language;
        if (language && language.lastIndexOf('en', 0) === 0) {
            return 'en';
        }
        return language;
    }
};

module.exports = SettingsManager;
