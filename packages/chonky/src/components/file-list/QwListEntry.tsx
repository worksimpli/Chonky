import React, { useContext, useMemo } from 'react';

import { DndEntryState, FileEntryProps } from '../../types/file-list.types';
import { useLocalizedFileEntryStrings } from '../../util/i18n';
import { ChonkyIconContext } from '../../util/icon-helper';
import { c, makeLocalChonkyStyles } from '../../util/styles';
import { TextPlaceholder } from '../external/TextPlaceholder';
import {
    useDndIcon,
    useFileEntryHtmlProps,
    useFileEntryState,
} from './FileEntry-hooks';
import { FileEntryName } from './FileEntryName';
import { FileEntryState, useCommonEntryStyles } from './GridEntryPreview';
import dotsInFiles from "../../util/dotsInFiles";

interface StyleState {
    entryState: FileEntryState;
    dndState: DndEntryState;
}

export const QwListEntry: React.FC<FileEntryProps> = React.memo(
    ({ file, selected, focused, dndState, activeStar, deactivateStar, tags, sharedOrPrivate, moreToolAction, esignStatus, onFileDoubleClickHandler, conversionInProgress, conversionFailed, conversionCompleted, translateInProgress, translationFailed, multipleSelect, domainName, qwModifiedText }) => {
        const entryState: FileEntryState = useFileEntryState(file, selected, focused);
        const dndIconName = useDndIcon(dndState);
        const fileTags = file?.tags?.split(",").filter((d: string) => Boolean(d));
        const esignCurrentStatus = file?.envelope;
        const { fileModDateString, fileSizeString } = useLocalizedFileEntryStrings(
            file
        );
        const styleState = useMemo<StyleState>(
            () => ({
                entryState,
                dndState,
            }),
            [dndState, entryState]
        );
        const classes = useStyles(styleState);
        const commonClasses = useCommonEntryStyles(entryState);
        const ChonkyIcon = useContext(ChonkyIconContext);
        const fileEntryHtmlProps = useFileEntryHtmlProps(file);
        const DomainEnum = domainName;
        const qwModifiedTextDate = qwModifiedText;
        return (
            <>
                {!file?.isDir ? <>
                    <span onDoubleClick={onFileDoubleClickHandler?.dblRowobj} data-chonky-file-id={file?.id ? file.id : ''} className='qw-conky-container'>
                        <div className={`${classes.listFileEntry} ${file?.isChecked ? 'is-checked' : ''}`} {...fileEntryHtmlProps}>

                            <div className={commonClasses.focusIndicator}></div>
                            <div className={c([commonClasses.selectionIndicator, classes.listFileEntrySelection])}></div>

                            {/* File Entry Icon */}
                            <div className={classes.listFileEntryIcon + " qw-listIcon"} data-chonky-file-id={file?.id ? file.id : ''}>
                                <ChonkyIcon
                                    icon={dndIconName ?? entryState.icon}
                                    spin={dndIconName ? false : entryState.iconSpin}
                                    fixedWidth={true}
                                    file={file}
                                />
                            </div>
                            <div className="wrap-content">
                                {/* File Entry Property (Moved above Name) */}
                                <div className={classes.listFileEntryProperty + " qw-property"} data-chonky-file-id={file?.id ? file.id : ''}>
                                    {file ? (
                                        <span>
                                            {qwModifiedText} {fileModDateString ?? <span>—</span>}
                                        </span>
                                    ) : (
                                        <TextPlaceholder minLength={5} maxLength={15} />
                                    )}
                                </div>
                                <div className="name-star-container">
                                    {/* File Entry Star (Moved after Icon) */}
                                    <div className={classes.listFileEntryStar + " qw-starred"} data-chonky-file-id={file?.id ? file.id : ''}>
                                        {!file?.isDir ? (
                                            <>
                                                <div className={file?.id ? file.id : ''} data-row-id={file?.id ? file.id : ''} data-chonky-file-id={file?.id ? file.id : ''}>
                                                    {file?.isStarred ? activeStar : deactivateStar}
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                    {/* File Entry Name */}
                                    <div className={classes.listFileEntryName + " qw-filename"} data-chonky-file-id={file?.id ? file.id : ''}>
                                        <FileEntryName
                                            file={file}
                                            tags={tags}
                                            esignStatus={esignStatus}
                                            conversionInProgress={conversionInProgress}
                                            conversionFailed={conversionFailed}
                                            conversionCompleted={conversionCompleted}
                                            translateInProgress={translateInProgress}
                                            translationFailed={translationFailed}
                                            multipleSelect={multipleSelect}
                                            domainName={domainName}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="qw-tagiconlist">
                                {fileTags?.length ? (
                                    <div className="chonky-tags" data-chonky-file-id={file?.id ? file.id : ''}>
                                        {fileTags?.map((tag: string, index: number) => (
                                            <span className={'tags-' + index.toString() + '-' + tag} key={index.toString() + tag} data-chonky-file-id={file?.id ? file.id : ''}>{tag}</span>
                                        ))}
                                    </div>)
                                    : null}
                                {esignCurrentStatus != "" ? (<div className="chonky-esign-status" data-chonky-file-id={file?.id ? file.id : ''}>
                                    {esignCurrentStatus}
                                </div>) : null}
                                {file?.isConversionInProgress && conversionInProgress}
                                {file?.isConversionFailed && conversionFailed}
                                {file?.isConversionCompleted && conversionCompleted}
                                {file?.isTranslateInProgress && translateInProgress}
                                {file?.isTranslationFailed && translationFailed}

                            </div>



                            {/* Search Results */}
                            {file?.isSearchResults && file?.folderPath ? (
                                <div className={classes.listFileSearch} data-chonky-file-id={file?.id ? file.id : ''}>
                                    {dotsInFiles(file?.folderPath)}
                                    <span className="list-file-search-tooltip" data-chonky-file-id={file?.id ? file.id : ''}>{file?.folderPath}</span>
                                </div>
                            ) : null}

                            {/* File Size */}
                            <div className={classes.listFileSizeProperty} data-chonky-file-id={file?.id ? file.id : ''}>
                                {file ? (
                                    fileSizeString ?? <span>—</span>
                                ) : (
                                    <TextPlaceholder minLength={10} maxLength={20} />
                                )}
                            </div>

                            {/* File Sharing Status */}
                            <div className={classes.listFileShared} data-chonky-file-id={file?.id ? file.id : ''}>
                                {file?.isShared ? sharedOrPrivate?.sharedText : sharedOrPrivate?.privateText}
                            </div>

                            {moreToolAction}
                        </div>
                    </span>

                </>
                    :
                    <>
                        <div className={`${classes.listFileEntry} ${file?.isChecked ? 'is-checked' : ''}`} {...fileEntryHtmlProps}
                        >
                            <div className={commonClasses.focusIndicator}></div>
                            <div
                                className={c([
                                    commonClasses.selectionIndicator,
                                    classes.listFileEntrySelection,
                                ])}
                            ></div>

                            <div className={classes.listFileEntryStar}>
                                {!file?.isDir ? (
                                    <>
                                        <div className={file?.id ? file.id : ''} data-row-id={file?.id ? file.id : ''}>
                                            {file?.isStarred ? activeStar : deactivateStar}
                                        </div>
                                    </>
                                ) : null
                                }
                            </div>

                            <div className={classes.listFileEntryIcon}>
                                <ChonkyIcon
                                    icon={dndIconName ?? entryState.icon}
                                    spin={dndIconName ? false : entryState.iconSpin}
                                    fixedWidth={true}
                                    file={file}
                                />
                            </div>
                            <div
                                className={classes.listFileEntryName}
                            // title={file ? file.name : undefined}
                            >
                                <FileEntryName file={file} tags={tags} esignStatus={esignStatus} conversionInProgress={conversionInProgress} conversionFailed={conversionFailed} conversionCompleted={conversionCompleted} translateInProgress={translateInProgress} translationFailed={translationFailed} multipleSelect={multipleSelect} domainName={domainName} />
                            </div>
                            {file?.isSearchResults && file?.folderPath ? (
                                <div className={classes.listFileSearch}>
                                    {dotsInFiles(file?.folderPath)}
                                    <span className="list-file-search-tooltip">{file?.folderPath}</span>
                                </div>
                            ) : null}
                            <div className={classes.listFileEntryProperty}>
                                {file ? (
                                    fileModDateString ?? <span>—</span>
                                ) : (
                                    <TextPlaceholder minLength={5} maxLength={15} />
                                )}
                            </div>
                            <div className={classes.listFileSizeProperty}>
                                {file ? (
                                    fileSizeString ?? <span>—</span>
                                ) : (
                                    <TextPlaceholder minLength={10} maxLength={20} />
                                )}
                            </div>
                            <div className={classes.listFileShared}>
                                {/* {file?.isShared ? 'Shared': 'Private'} */}
                                {file?.isShared ? sharedOrPrivate?.sharedText : sharedOrPrivate?.privateText}
                            </div>
                            {moreToolAction}
                        </div></>}
            </>

        );
    }
);

const useStyles = makeLocalChonkyStyles(theme => ({
    listFileEntry: {
        boxShadow: `inset ${theme.palette.divider} 0 -1px 0`,
        fontSize: theme.listFileEntry.fontSize,
        color: ({ dndState }: StyleState) =>
            dndState.dndIsOver
                ? dndState.dndCanDrop
                    ? theme.dnd.canDropColor
                    : theme.dnd.cannotDropColor
                : 'inherit',
        alignItems: 'center',
        position: 'relative',
        display: 'flex',
        height: '100%',
    },
    listFileEntrySelection: {
        opacity: 0.6,
    },
    listFileEntryStar: {},
    listFileShared: {
        fontSize: theme.listFileEntry.propertyFontSize,
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: '0 1 120px',
        padding: [2, 8],
        zIndex: 20,
    },
    listFileEntryIcon: {
        color: ({ entryState, dndState }: StyleState) =>
            dndState.dndIsOver
                ? dndState.dndCanDrop
                    ? theme.dnd.canDropColor
                    : theme.dnd.cannotDropColor
                : entryState.color,
        fontSize: theme.listFileEntry.iconFontSize,
        boxSizing: 'border-box',
        padding: [2, 4],
        zIndex: 20,
    },
    listFileSearch: {
        fontSize: theme.listFileEntry.propertyFontSize,
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: '0 1 200px',
        padding: [2, 8],
        zIndex: 20,
    },
    listFileEntryName: {
        textOverflow: 'ellipsis',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: '1 1 300px',
        paddingLeft: 8,
        zIndex: 20,
    },
    listFileEntryProperty: {
        fontSize: theme.listFileEntry.propertyFontSize,
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: '0 1 150px',
        padding: [2, 8],
        zIndex: 20,
    },
    listFileSizeProperty: {
        fontSize: theme.listFileEntry.propertyFontSize,
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: '0 1 150px',
        padding: [2, 8],
        zIndex: 20,
    },
}));
