/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React, { CSSProperties, useCallback, useMemo, useRef,UIEvent } from 'react';
import { useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';

import { selectFileViewConfig, selectors } from '../../redux/selectors';
import { FileViewMode } from '../../types/file-view.types';
import { useInstanceVariable } from '../../util/hooks-helpers';
import { makeLocalChonkyStyles } from '../../util/styles';
import { SmartFileEntry } from './FileEntry';
import { AnyFunction } from 'tsdef';

export interface FileListListProps {
    width: number;
    height: number;
    fileListStyle?: CSSProperties & { gridHeight: any };
    activeStar: React.ReactElement<any, any>;
    deactivateStar: React.ReactElement<any, any>;
    tags: React.ReactElement<any, any>;
    sharedOrPrivate?: {
        sharedText: string;
        privateText: string;
    };
    listHeader?: {
        name: string;
        location: string;
        modified:string;
        sharing:string;
    };
    moreToolAction?: React.ReactElement<any, any>;
    esignStatus: React.ReactElement<any, any>;
    onFileDoubleClickHandler?:{
        dblRowobj: AnyFunction;
    };
}

export const ListContainer: React.FC<FileListListProps> = React.memo(props => {
    const { width, height, fileListStyle = { height: 0 }, activeStar, deactivateStar, tags, sharedOrPrivate,listHeader,moreToolAction,esignStatus,onFileDoubleClickHandler } = props;

    const viewConfig = useSelector(selectFileViewConfig);

    const listRef = useRef<FixedSizeList>();

    const displayFileIds = useSelector(selectors.getDisplayFileIds);
    const displayFileIdsRef = useInstanceVariable(displayFileIds);
    const getItemKey = useCallback(
        (index: number) => displayFileIdsRef.current[index] ?? `loading-file-${index}`,
        [displayFileIdsRef]
    );

    const classes = useStyles();
    const listComponent = useMemo(() => {
        // When entry size is null, we use List view
        const rowRenderer = (data: { index: number; style: CSSProperties }) => {
            return (
                <div style={{ ...data.style  }} className="row-item" id={`check-box-${data.index}`}>

                    <SmartFileEntry
                        fileId={displayFileIds[data.index] ?? null}
                        displayIndex={data.index}
                        fileViewMode={FileViewMode.List}
                        activeStar={activeStar}
                        deactivateStar={deactivateStar}
                        tags={tags}
                        sharedOrPrivate={sharedOrPrivate}
                        listHeader={listHeader}
                        moreToolAction={moreToolAction}
                        esignStatus={esignStatus}
                        onFileDoubleClickHandler={onFileDoubleClickHandler}
                    />
                </div>
            );
        };

        return (
            <FixedSizeList
                ref={listRef as any}
                className={classes.listContainer}
                itemSize={(fileListStyle.height as any) || viewConfig.entryHeight}
                height={height}
                itemCount={displayFileIds.length}
                width={width}
                itemKey={getItemKey}
            >
                {rowRenderer}
            </FixedSizeList>
        );
    }, [
        classes.listContainer,
        viewConfig.entryHeight,
        height,
        displayFileIds,
        width,
        getItemKey,
    ]);

    return listComponent;
});

const useStyles = makeLocalChonkyStyles(theme => ({
    listContainer: {
        borderTop: `solid 1px ${theme.palette.divider}`,
    },
}));
