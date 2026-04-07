// import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FullFileBrowser, ChonkyActions, setChonkyDefaults } from '../src';
import { ChonkyIconFA } from '../../chonky-icon-fontawesome/src';
import { fileMap as fileMapExt } from '../src/extensions';

setChonkyDefaults({ iconComponent: ChonkyIconFA });

// Flat file map: each entry has childrenIds (for folders) and parentId
const baseFileMap: Record<string, any> = {
    '0': { id: '0', name: 'Root', isDir: true, childrenIds: ['1', '2', '3', '4'], childrenCount: 4 },
    '1': { id: '1', name: 'Administration', isDir: true, parentId: '0', childrenIds: ['11a'], childrenCount: 1 },
    '11a': { id: '11a', name: 'Performance', isDir: true, parentId: '1', childrenIds: ['111'], childrenCount: 1 },
    '111': { id: '111', name: 'Quaterly Reports', isDir: true, parentId: '11a', childrenIds: ['1111', '1112'], childrenCount: 2 },
    '1111': { id: '1111', name: '2020-qty-report1.pdf', parentId: '111' },
    '1112': { id: '1112', name: '2020-qty-report2.pdf', parentId: '111' },
    '2': { id: '2', name: 'Closure', isDir: true, parentId: '0', childrenIds: [], childrenCount: 0 },
    '3': { id: '3', name: 'Formation', isDir: true, parentId: '0', childrenIds: [], childrenCount: 0 },
    '4': { id: '4', name: 'Closure', isDir: false, parentId: '0', },
};
const rowClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
console.log("row click handler", e);
}
const App = () => {
    const { data, fileActionHandler } = fileMapExt.useFileMap({ baseFileMap, initialFolderId: '0' });

    return (
        <div style={{ height: 400 }}>
            <FullFileBrowser
                files={data.files}
                folderChain={data.folderChain}
                onFileAction={fileActionHandler}
                defaultFileViewActionId={ChonkyActions.EnableListView.id}
                fileListStyle={{ height: 70, width: 182, gridHeight: 150 }}
                activeStar={<div>active Start</div>}
                deactivateStar={<div>deactivate Start</div>}
                tags={<div>Good</div>}
                esignStatus={<div>eSign</div>}
                sharedOrPrivate={{sharedText: "", privateText: ""}}
                listHeader={{name:"",location:"",modified:"",sharing:""}}
                moreToolAction={<button
                  onClick={(e) => rowClickHandler(e)}
                  className="more-actions absolute ltr:right-1 rtl:left-1 p-1.5 z-20 lg:z-50  bg-gray-50 dark:bg-gray-400 text-gray-500 dark:text-gray-700 rounded-full"
                >
                 thrre 
                </button>}
                shareAction={<button
                  onClick={(e) => { e.stopPropagation(); console.log('share clicked'); }}
                  className="share-action"
                >
                  Share
                </button>}
                linkAction={<button
                  onClick={(e) => { e.stopPropagation(); console.log('link clicked'); }}
                  className="link-action"
                >
                  🔗
                </button>}
                onFileDoubleClickHandler={<div>onFileDoubleClickHandler</div>}
                nothingToShowLabel="loading or please wait..."
                conversionInProgress={<div></div>}
                conversionFailed={<div></div>}
                conversionCompleted={<div></div>}
                translateInProgress={<div></div>}
                translationFailed={<div></div>}
                domainName={<div>domainName</div>}
                qwModifiedText={<div>qwModifiedText</div>}
                listContainerClass=""
                totalItemsColumn={"Total Items"}
            />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
