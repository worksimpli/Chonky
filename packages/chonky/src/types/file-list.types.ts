import { Nullable } from 'tsdef';
import { ElementType, UIEvent, CSSProperties } from 'react';
import { FileData } from './file.types';
import { AnyFunction } from 'tsdef';

export interface DndEntryState {
    dndIsDragging?: boolean;
    dndIsOver?: boolean;
    dndCanDrop?: boolean;
}

export interface FileEntryProps {
    file: Nullable<FileData>;
    selected: boolean;
    focused: boolean;
    dndState: DndEntryState;
    activeStar?: React.ReactElement<any, any>;
    deactivateStar?: React.ReactElement<any, any>;
    tags?: React.ReactElement<any, any>;
    sharedOrPrivate?: {
        sharedText: string;
        privateText: string;
    };
    listContainerClass?:string;
    listHeader?: {
        name: string;
        location: string;
        modified:string;
        sharing:string;
    };
    moreToolAction?: React.ReactElement<any, any>;
    esignStatus?: React.ReactElement<any, any>;
    onFileDoubleClickHandler?:{
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
    totalItemsColumn?: string;
}
