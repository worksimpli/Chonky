/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React from 'react';

import { FileBrowserHandle, FileBrowserProps } from '../../types/file-browser.types';
import { FileList } from '../file-list/FileList';
import { FileBrowser } from './FileBrowser';
import { FileContextMenu } from './FileContextMenu';
import { FileNavbar } from './FileNavbar';
import { FileToolbar } from './FileToolbar';

export const FullFileBrowser = React.memo(
    React.forwardRef<FileBrowserHandle, FileBrowserProps>((props, ref) => {
        const { onScroll, fileListStyle, activeStar = <></>, deactivateStar = <></>, tags = <></>,esignStatus = <></>, sharedOrPrivate = {sharedText: "", privateText: ""},listHeader = {name:"",location:"",modified:"",sharing:""},moreToolAction=<></>,onFileDoubleClickHandler,nothingToShowLabel,conversionInProgress=<></>,conversionFailed=<></>,conversionCompleted=<></>,translateInProgress=<></>,translationFailed=<></>, multipleSelect=<></>,domainName} = props;
        return (
            <FileBrowser ref={ref} {...props}>
                <FileNavbar />
                <FileToolbar />
                <FileList
                    onScroll={onScroll}
                    fileListStyle={fileListStyle}
                    activeStar={activeStar}
                    deactivateStar={deactivateStar}
                    tags={tags}
                    esignStatus={esignStatus}
                    sharedOrPrivate={sharedOrPrivate}
                    listHeader={listHeader}
                    moreToolAction={moreToolAction}
                    onFileDoubleClickHandler={onFileDoubleClickHandler}
                    nothingToShowLabel={nothingToShowLabel}
                    conversionInProgress={conversionInProgress}
                    conversionFailed={conversionFailed}
                    conversionCompleted={conversionCompleted}
                    translateInProgress={translateInProgress}
                    translationFailed={translationFailed}
                    multipleSelect={multipleSelect}
                    domainName={domainName}
                />
                <FileContextMenu />
            </FileBrowser>
        );
    })
);
FullFileBrowser.displayName = 'FullFileBrowser';
