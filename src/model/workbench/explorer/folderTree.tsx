import * as React from 'react';
import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { ITreeNodeItem, FileType, FileTypes } from 'mo/components/tree';
import { IMenuItem } from 'mo/components/menu';
import { randomId } from 'mo/common/utils';

export enum FolderTreeEvent {
    onClick = 'folderTree.onClick',
    onSelectFile = 'folderTree.onSelectFile',
}

export interface IFolderInputEvent {
    onFocus: () => void;
    setValue: (value: string) => void;
}

export interface IFolderTreeSubItem {
    data?: ITreeNodeItem[];
    contextMenu?: IMenuItem[];
    folderPanelContextMenu?: IMenuItem[];
    current?: ITreeNodeItem | null;
}
export interface IFolderTree {
    folderTree?: IFolderTreeSubItem;
}

export const NEW_FILE_COMMAND_ID = 'explorer.newFile';
export const NEW_FOLDER_COMMAND_ID = 'explorer.newFolder';
export const RENAME_COMMAND_ID = 'explorer.rename';
export const REMOVE_COMMAND_ID = 'explorer.remove';
export const DELETE_COMMAND_ID = 'explorer.delete';
export const OPEN_TO_SIDE_COMMAND_ID = 'explorer.openToSide';
export const ADD_ROOT_FOLDER_COMMAND_ID = 'addRootFolder';
export const FIND_IN_WORKSPACE_ID = 'filesExplorer.findInWorkspace';
export const DOWNLOAD_COMMAND_ID = 'explorer.download';

export const COMMON_CONTEXT_MENU = [
    {
        id: RENAME_COMMAND_ID,
        name: 'Rename',
    },
    {
        id: DELETE_COMMAND_ID,
        name: 'Delete',
    },
];
export const BASE_CONTEXT_MENU = [
    {
        id: NEW_FILE_COMMAND_ID,
        name: 'New File',
    },
    {
        id: NEW_FOLDER_COMMAND_ID,
        name: 'New Folder',
    },
];

export const ROOT_FOLDER_CONTEXT_MENU = [
    {
        id: REMOVE_COMMAND_ID,
        name: 'Remove Folder',
    },
];
export const FILE_CONTEXT_MENU = [
    {
        id: OPEN_TO_SIDE_COMMAND_ID,
        name: 'Open to the Side',
    },
];
// Sample folder panel area ContextMenu
export const FOLDER_PANEL_CONTEXT_MENU = [
    {
        id: ADD_ROOT_FOLDER_COMMAND_ID,
        name: 'Add Folder to Workspace...',
    },
    {
        id: FIND_IN_WORKSPACE_ID,
        name: 'Find in Workspace...',
    },
    {
        id: DOWNLOAD_COMMAND_ID,
        name: 'Download...',
    },
];

export class TreeNodeModel implements ITreeNodeItem {
    id?: number;
    name?: string;
    location?: string;
    fileType?: FileType;
    children?: ITreeNodeItem[];
    icon?: string | React.ReactNode;
    isEditable?: boolean;
    content?: string;

    constructor(props: ITreeNodeItem = {}) {
        const {
            id,
            name = '',
            location = '',
            fileType = FileTypes.file as FileType,
            children = [],
            icon = '',
            isEditable = false,
            content = '',
        } = props;
        this.fileType = fileType;
        this.isEditable = isEditable;
        this.name = name;
        this.id = id || randomId();
        this.location = location;
        this.children = children;
        this.icon = icon;
        this.content = content;
    }
}

const builtInFolderTree = {
    contextMenu: COMMON_CONTEXT_MENU,
    current: null,
    folderPanelContextMenu: FOLDER_PANEL_CONTEXT_MENU,
    data: [],
};

@injectable()
export class IFolderTreeModel implements IFolderTree {
    public folderTree: IFolderTreeSubItem;

    constructor(folderTree: IFolderTreeSubItem = builtInFolderTree) {
        this.folderTree = folderTree;
    }
}