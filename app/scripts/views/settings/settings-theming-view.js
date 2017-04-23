const Backbone = require('backbone');
const ThemeModel = require('../../models/theme-model');
const FeatureDetector = require('../../util/feature-detector');
const Locale = require('../../util/locale');
const ThemingManager = require('../../comp/theming-manager');

const SettingsThemeView = Backbone.View.extend({
    template: require('templates/settings/settings-theming.hbs'),

    events: {
        'change .settings__general-theme': 'changeTheme',
        'change .settings__general-font-size': 'changeFontSize',
        'change .settings__general-colorful-icons': 'changeColorfulIcons',
        'change .settings__general-titlebar-style': 'changeTitlebarStyle',
        'change .settings__general-table-view': 'changeTableView',
        'click .settings_main-color-set-btn': 'setMainColor'
    },

    render: function() {
        this.renderTemplate({
            themes: _.mapObject(ThemingManager.allThemes, theme => Locale[theme]),
            activeTheme: ThemeModel.instance.get('theme'),
            fontSize: ThemeModel.instance.get('fontSize'),
            colorfulIcons: ThemeModel.instance.get('colorfulIcons'),
            supportsTitleBarStyles: FeatureDetector.supportsTitleBarStyles(),
            titlebarStyle: ThemeModel.instance.get('titlebarStyle'),
            canSetTableView: !FeatureDetector.isMobile,
            tableView: ThemeModel.instance.get('tableView')
        });
    },

    changeTheme: function(e) {
        const theme = e.target.value;
        ThemeModel.instance.set('theme', theme);
    },

    changeFontSize: function(e) {
        const fontSize = +e.target.value;
        ThemeModel.instance.set('fontSize', fontSize);
    },

    changeColorfulIcons: function(e) {
        const colorfulIcons = e.target.checked || false;
        ThemeModel.instance.set('colorfulIcons', colorfulIcons);
        Backbone.trigger('refresh');
    },

    changeTitlebarStyle: function(e) {
        const titlebarStyle = e.target.value;
        ThemeModel.instance.set('titlebarStyle', titlebarStyle);
    },

    changeTableView: function(e) {
        const tableView = e.target.checked || false;
        ThemeModel.instance.set('tableView', tableView);
        Backbone.trigger('refresh');
    },

    setMainColor: function(e) {
        const colorTextBox = this.$el.find('#settings__theming-main-color');
        const colorText = colorTextBox.val().trim();
        if (!colorText) {
            return;
        }
        ThemingManager.changeCss('.app', 'background-color', colorText);
    }

});

module.exports = SettingsThemeView;
