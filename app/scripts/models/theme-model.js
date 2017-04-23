const Backbone = require('backbone');
const SettingsStore = require('../comp/settings-store');

const ThemeModel = Backbone.Model.extend({
    defaults: {
        colorMain: '#282C34',
        mediumColor: '#ABB2BF',
        textColor: '#D7DAE0',
        actionColor: '#528BFF',
        errorColor: '#C34034',

        mutePercent: 30,
        lightBorderPercent: 10,
        modalOpacity: .9,
        colorLightnessShift: 0
    },

    initialize: function() {
        this.listenTo(this, 'change', this.save);
    },

    load: function() {
        return SettingsStore.load('theming').then(data => {
            if (data) {
                this.upgrade(data);
                this.set(data, {silent: true});
            }
        });
    },

    save: function() {
        SettingsStore.save('theming', this.attributes);
    }
});

ThemeModel.instance = new ThemeModel();

module.exports = ThemeModel;
