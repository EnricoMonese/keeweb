const Backbone = require('backbone');
const Locale = require('../../util/locale');
const PluginManager = require('../../plugins/plugin-manager');
const AppSettingsModel = require('../../models/app-settings-model');
const ThemeModel = require('../../models/theme-model');

const SettingsPluginsView = Backbone.View.extend({
    template: require('templates/settings/settings-plugins.hbs'),

    events: {
        'click .settings_plugins-install-btn': 'installClick',
        'click .settings_plugins-uninstall-btn': 'uninstallClick',
        'click .settings_plugins-update-btn': 'updateClick',
        'click .settings_plugins-use-locale-btn': 'useLocaleClick',
        'click .settings_plugins-use-theme-btn': 'useThemeClick'
    },

    initialize() {
        this.listenTo(PluginManager, 'change:installing change:uninstalling change:updating', this.render.bind(this));
    },

    render() {
        const lastInstall = PluginManager.get('lastInstall') || {};
        this.renderTemplate({
            plugins: PluginManager.get('plugins').map(plugin => ({
                id: plugin.id,
                manifest: plugin.get('manifest'),
                status: plugin.get('status'),
                installTime: Math.round(plugin.get('installTime')),
                updateError: plugin.get('updateError')
            })),
            lastInstallUrl: PluginManager.get('installing') || (lastInstall.error ? lastInstall.url : ''),
            lastInstallError: lastInstall.error,
            updating: PluginManager.get('updating')
        });
        return this;
    },

    installClick() {
        const installBtn = this.$el.find('.settings_plugins-install-btn');
        const urlTextBox = this.$el.find('#settings__plugins-install-url');
        const errorBox = this.$el.find('.settings__plugins-install-error');
        errorBox.html('');
        const url = urlTextBox.val().trim();
        if (!url) {
            return;
        }
        urlTextBox.prop('disabled', true);
        installBtn.text(Locale.setPlInstallBtnProgress + '...').prop('disabled', true);
        PluginManager.install(url)
            .then(() => {
                this.installFinished();
                urlTextBox.val('');
            })
            .catch(e => {
                this.installFinished();
                errorBox.text(e.toString());
            });
    },

    installFinished() {
        const installBtn = this.$el.find('.settings_plugins-install-btn');
        const urlTextBox = this.$el.find('#settings__plugins-install-url');
        urlTextBox.prop('disabled', false);
        installBtn.text(Locale.setPlInstallBtn).prop('disabled', false);
    },

    uninstallClick(e) {
        const pluginId = $(e.target).data('plugin');
        if (PluginManager.get('updating') === pluginId || PluginManager.get('uninstalling') === pluginId) {
            return;
        }
        PluginManager.uninstall(pluginId);
    },

    updateClick(e) {
        const pluginId = $(e.target).data('plugin');
        if (PluginManager.get('updating') === pluginId || PluginManager.get('uninstalling') === pluginId) {
            return;
        }
        PluginManager.update(pluginId);
    },

    useLocaleClick(e) {
        const locale = $(e.target).data('locale');
        AppSettingsModel.instance.set('locale', locale);
    },

    useThemeClick(e) {
        const theme = $(e.target).data('theme');
        ThemeModel.instance.set('theme', theme);
    }
});

module.exports = SettingsPluginsView;
