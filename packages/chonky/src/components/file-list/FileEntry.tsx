import React, { useState, UIEvent } from 'react';
import { useSelector } from 'react-redux';
import { Nullable } from 'tsdef';

import {
    selectFileData,
    selectIsDnDDisabled,
    selectIsFileSelected,
} from '../../redux/selectors';
import { useParamSelector } from '../../redux/store';
import { DndEntryState, FileEntryProps } from '../../types/file-list.types';
import { FileViewMode } from '../../types/file-view.types';
import { FileHelper } from '../../util/file-helper';
import { makeGlobalChonkyStyles } from '../../util/styles';
import { ClickableWrapper, ClickableWrapperProps } from '../internal/ClickableWrapper';
import { CompactEntry } from './CompactEntry';
import { DnDFileEntry } from './DnDFileEntry';
import { useFileClickHandlers } from './FileEntry-hooks';
import { GridEntry } from './GridEntry';
import { ListEntry } from './ListEntry';
import { AnyFunction } from 'tsdef';
import { QwListEntry } from './QwListEntry';
import { QwGridEntry } from './QwGridEntry';

export interface SmartFileEntryProps {
    fileId: Nullable<string>;
    displayIndex: number;
    fileViewMode: FileViewMode;
    activeStar?: React.ReactElement<any, any>;
    deactivateStar?: React.ReactElement<any, any>;
    tags?: React.ReactElement<any, any>;
    sharedOrPrivate?: {
        sharedText: string;
        privateText: string;
    };
    listContainerClass?: string;
    listHeader?: {
        name: string;
        location: string;
        modified: string;
        sharing: string;
    };
    moreToolAction?: React.ReactElement<any, any>;
    esignStatus?: React.ReactElement<any, any>;
    onFileDoubleClickHandler?: {
        dblRowobj: AnyFunction;
    };
    nothingToShowLabel: string;
    conversionInProgress?: React.ReactElement<any, any>;
    conversionFailed?: React.ReactElement<any, any>;
    conversionCompleted?: React.ReactElement<any, any>;
    translateInProgress?: React.ReactElement<any, any>;
    translationFailed?: React.ReactElement<any, any>;
    multipleSelect?: React.ReactElement<any, any>;
    domainName?: string;
    qwModifiedText?: string;
}

const disabledDndState: DndEntryState = {
    dndIsDragging: false,
    dndIsOver: false,
    dndCanDrop: false,
};

export const SmartFileEntry: React.FC<SmartFileEntryProps> = React.memo(
    ({
        fileId,
        displayIndex,
        fileViewMode,
        activeStar,
        deactivateStar,
        tags,
        listContainerClass,
        sharedOrPrivate,
        listHeader,
        moreToolAction,
        esignStatus,
        onFileDoubleClickHandler,
        nothingToShowLabel,
        conversionInProgress,
        conversionFailed,
        conversionCompleted,
        translateInProgress,
        translationFailed,
        multipleSelect,
        domainName,
        qwModifiedText,
    }) => {
        const classes = useStyles();

        // Basic properties
        const file = useParamSelector(selectFileData, fileId);
        const selected = useParamSelector(selectIsFileSelected, fileId);
        const dndDisabled = useSelector(selectIsDnDDisabled);

        // Clickable wrapper properties
        const fileClickHandlers = useFileClickHandlers(
            file,
            displayIndex,
            multipleSelect
        );
        const [focused, setFocused] = useState(false);
        const clickableWrapperProps: ClickableWrapperProps = {
            wrapperTag: 'div',
            passthroughProps: { className: classes.fileEntryClickableWrapper },
            ...(FileHelper.isClickable(file) ? fileClickHandlers : undefined),
            setFocused,
        };

        // File entry properties
        const fileEntryProps: Omit<FileEntryProps, 'dndState'> = {
            file,
            selected,
            focused,
            activeStar,
            deactivateStar,
            tags,
            sharedOrPrivate,
            listContainerClass,
            listHeader,
            moreToolAction,
            esignStatus,
            onFileDoubleClickHandler,
            nothingToShowLabel,
            conversionInProgress,
            conversionFailed,
            conversionCompleted,
            translateInProgress,
            translationFailed,
            multipleSelect,
            domainName,
            qwModifiedText,
        };

        let EntryComponent: React.FC<FileEntryProps>;

        if (fileViewMode === FileViewMode.List) {
            EntryComponent = domainName === 'quickwerx' ? QwListEntry : ListEntry;
        } else if (fileViewMode === FileViewMode.Compact) {
            EntryComponent = CompactEntry;
        } else {
            EntryComponent = domainName === 'quickwerx' ? QwGridEntry : GridEntry;
        }

        return dndDisabled ? (
            <ClickableWrapper {...clickableWrapperProps}>
                <EntryComponent {...fileEntryProps} dndState={disabledDndState} />
            </ClickableWrapper>
        ) : (
            <DnDFileEntry file={file}>
                {dndState => (
                    <ClickableWrapper {...clickableWrapperProps}>
                        <EntryComponent {...fileEntryProps} dndState={dndState} />
                    </ClickableWrapper>
                )}
            </DnDFileEntry>
        );
    }
);
SmartFileEntry.displayName = 'SmartFileEntry';

const useStyles = makeGlobalChonkyStyles(() => ({
    fileEntryClickableWrapper: {
        // We disable default browser outline because Chonky provides its own outline
        // (which doesn't compromise accessibility, hopefully)
        outline: 'none !important',
        position: 'relative',
        height: '100%',
    },
}));
