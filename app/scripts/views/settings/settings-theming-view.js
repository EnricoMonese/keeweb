const Backbone = require('backbone');

const SettingsThemeView = Backbone.View.extend({
    template: require('templates/settings/settings-theming.hbs'),

    render: function() {
        this.renderTemplate({});
    }
});

module.exports = SettingsThemeView;
