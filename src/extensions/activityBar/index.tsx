import { IExtensionService, activityBarService, IActivityBarItem } from 'mo';
import { IExtension } from 'mo/model/extension';

function initActivityBar(extensionCtx: IExtensionService) {
    const globalSettings: IActivityBarItem = {
        id: 'global-settings',
        name: 'Settings',
        iconName: 'codicon-settings-gear',
        type: 'global',
        contextMenu: [
            {
                id: 'CommandPalette',
                name: 'Command Palette...',
            },
            {
                id: 'Settings',
                name: 'Settings',
            },
            {
                id: 'ColorTheme',
                name: 'Color Theme',
                onClick(e) {
                    console.log('globalSettings: colorTheme onClick:', e);
                },
            },
        ],
    };

    const globalUserAccount: IActivityBarItem = {
        id: 'global-Account',
        name: 'Account',
        iconName: 'codicon-account',
        type: 'global',
    };

    activityBarService.push(globalUserAccount);
    activityBarService.push(globalSettings);

    activityBarService.onClick((e, data) => {
        const target = e.target;
        // activityBarService.updateState({ selected: 'search' });
        console.log('activityBar onClick:', data, target);
    });

    activityBarService.onSelect((e, data) => {
        const target = e.target;
        console.log('activityBar onSelect:', data, target);
    });
}

export const ExtendActivityBar: IExtension = {
    activate: function (extensionCtx: IExtensionService) {
        initActivityBar(extensionCtx);
    },
};
