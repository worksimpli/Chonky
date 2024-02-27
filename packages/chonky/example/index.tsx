// import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FullFileBrowser, ChonkyActions } from '../src';

const data = [
    {
        id: '0',
        name: 'Root',
        isDir: true,
        focused: true,
    },
    {
      id: '1',
      name: 'Administration',
      isDir: true,
      focused: false,
      files: [
          {
              id: '11',
              name: 'Performance',
              isDir: true,
              focused: true,
              files: [
                  {
                      id: '111',
                      name: 'Quaterly Reports',
                      isDir: true,
                      focused: true,
                      files: [
                          {
                              id: '1111',
                              name: '2020-qty-report1.pdf',
                              focused: true,
                          },
                          {
                              id: '1112',
                              name: '2020-qty-report2.pdf',
                              focused: true,
                          },
                      ],
                  },
              ],
          },
      ],
  },
  { id: '2', name: 'Closure', isDir: true, focused: true, },
  { id: '3', name: 'Formation', isDir: true, focused: true, },
  { id: '4', name: 'Closure', isDir: true, focused: true, },
  { id: '5', name: 'Formation', isDir: true, focused: false, },
  { id: '6', name: 'Closure', isDir: true, focused: true, },
  { id: '7', name: 'Formation', isDir: true, focused: true, },
  { id: '8', name: 'Closure', isDir: true,focused: true, },
  { id: '9', name: 'Formation', isDir: true,focused: true, },
  { id: '10', name: 'Closure', isDir: true, focused: true, },
  { id: '11', name: 'Formation', isDir: true, focused: true, },
  { id: '12', name: 'Closure', isDir: true, focused: true, },
  { id: '13', name: 'Formation', isDir: true, focused: true, },
  { id: '14', name: 'Closure', isDir: true, focused: false },
  { id: '15', name: 'Formation', isDir: true, focused: false, },
  { id: '16', name: 'Closure', isDir: true, focused: true, },
  { id: '17', name: 'Formation ', isDir: true, focused: true, },
];
const onDoubleClickHandler = (e) => {

};
const App = () => {
    return (
        <div style={{ height: 400 }}>
            <FullFileBrowser
                files={data}
                defaultFileViewActionId={ChonkyActions.EnableListView.id}
                fileListStyle={{ height: 70, width: 182, gridHeight: 150 }}
                activeStar={<div>active Start</div>}
                deactivateStar={<div>deactivate Start</div>}
                tags={<div>Good</div>}
                esignStatus={<div>eSign</div>}
                sharedOrPrivate={{sharedText: "", privateText: ""}}
                listHeader={{name:"",location:"",modified:"",sharing:""}}
                moreToolAction={<div>moreToolAction</div>}
                onFileDoubleClickHandler={<div>onFileDoubleClickHandler</div>}
            />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
