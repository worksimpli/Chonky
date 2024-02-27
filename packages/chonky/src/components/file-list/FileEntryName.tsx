/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React from 'react';
import { Nullable } from 'tsdef';

import { FileData } from '../../types/file.types';
import { makeLocalChonkyStyles } from '../../util/styles';
import { useFileNameComponent, useModifierIconComponents } from './FileEntry-hooks';

export interface FileEntryNameProps {
    file: Nullable<FileData>;
    className?: string;
    tags?: React.ReactElement<any, any>;
    esignStatus?: React.ReactElement<any, any>;
    
}

export const FileEntryName: React.FC<FileEntryNameProps> = React.memo(({ file, className }) => {
    const modifierIconComponents = useModifierIconComponents(file);
    const fileNameComponent = useFileNameComponent(file);
    const fileTags = file?.tags?.split(",").filter((d:string) => Boolean(d));
    const esignStatus = file?.envelope;

    const classes = useStyles();
    return (
        // <span className={className} title={file ? file.name : undefined}>
             <span className={className} data-chonky-file-id={file?.id ? file.id: ''}>
            {modifierIconComponents.length > 0 && (
                <span className={classes.modifierIcons} data-chonky-file-id={file?.id ? file.id: ''}>{modifierIconComponents}</span>
            )}
            {fileNameComponent}
            {fileTags?.length ? (
                <div className="chonky-tags" data-chonky-file-id={file?.id ? file.id: ''}>
                    {fileTags?.map((tag:string, index: number) => (
                        <span className={'tags-'+ index.toString()+ '-' + tag} key={index.toString()+tag} data-chonky-file-id={file?.id ? file.id: ''}>{tag}</span>
                    ))}
                </div>)
             : null}
             {esignStatus != "" ? (  <div className="chonky-esign-status" data-chonky-file-id={file?.id ? file.id: ''}>
             {esignStatus}
                </div>) : null}
              
        </span>
    );
});
FileEntryName.displayName = 'FileEntryName';

const useStyles = makeLocalChonkyStyles(theme => ({
    modifierIcons: {
        color: theme.palette.text.hint,
        position: 'relative',
        fontSize: '0.775em',
        paddingRight: 5,
    },
}));
