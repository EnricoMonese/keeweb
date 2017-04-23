const Backbone = require('backbone');
const SettingsManager = require('../../comp/settings-manager');
const AppSettingsModel = require('../../models/app-settings-model');
const FeatureDetector = require('../../util/feature-detector');
const Locale = require('../../util/locale');
// const Logger = require('../../util/logger');
const ChangeCssUtil = require('../../util/change-css-util');

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
            themes: _.mapObject(SettingsManager.allThemes, theme => Locale[theme]),
            activeTheme: AppSettingsModel.instance.get('theme'),
            fontSize: AppSettingsModel.instance.get('fontSize'),
            colorfulIcons: AppSettingsModel.instance.get('colorfulIcons'),
            supportsTitleBarStyles: FeatureDetector.supportsTitleBarStyles(),
            titlebarStyle: AppSettingsModel.instance.get('titlebarStyle'),
            canSetTableView: !FeatureDetector.isMobile,
            tableView: AppSettingsModel.instance.get('tableView')
        });
        ChangeCssUtil.init();
    },

    changeTheme: function(e) {
        const theme = e.target.value;
        AppSettingsModel.instance.set('theme', theme);
    },

    changeFontSize: function(e) {
        const fontSize = +e.target.value;
        AppSettingsModel.instance.set('fontSize', fontSize);
    },

    changeColorfulIcons: function(e) {
        const colorfulIcons = e.target.checked || false;
        AppSettingsModel.instance.set('colorfulIcons', colorfulIcons);
        Backbone.trigger('refresh');
    },

    changeTitlebarStyle: function(e) {
        const titlebarStyle = e.target.value;
        AppSettingsModel.instance.set('titlebarStyle', titlebarStyle);
    },

    changeTableView: function(e) {
        const tableView = e.target.checked || false;
        AppSettingsModel.instance.set('tableView', tableView);
        Backbone.trigger('refresh');
    },

    setMainColor: function(e) {
        const colorTextBox = this.$el.find('#settings__theming-main-color');
        const colorText = colorTextBox.val().trim();
        if (!colorText) {
            return;
        }
        ChangeCssUtil.changeCss('.app', 'background-color', colorText);
    }

});

module.exports = SettingsThemeView;
