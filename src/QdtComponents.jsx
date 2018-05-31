import React from 'react';
import ReactDOM from 'react-dom';
import qApp from './qApp';
import qDoc from './qDoc';
import utility from './utilities/';
import settings from './picasso/settings';
import QdtFilter from './components/QdtFilter';
import QdtTable from './components/QdtTable';
import QdtViz from './components/QdtViz';
import QdtSelectionToolbar from './components/QdtSelectionToolbar';
import QdtKpi from './components/QdtKpi';
import QdtButton from './components/QdtButton';
import QdtPicasso from './components/QdtPicasso';
import QdtSearch from './components/QdtSearch';
import QdtCurrentSelections from './components/QdtCurrentSelections';

const components = {
  QdtFilter,
  QdtTable,
  QdtViz,
  QdtSelectionToolbar,
  QdtKpi,
  QdtButton,
  QdtPicasso,
  QdtSearch,
  QdtCurrentSelections,
};

const QdtComponents = class {
  static picasso = {
    settings,
  };

  constructor(config = {}, connections = { vizApi: true, engineApi: true }) {
    this.myConfig = config;
    this.myConfig.identity = utility.uid(16);
    this.qAppPromise = connections.vizApi ? qApp(this.myConfig) : null;
    this.qDocPromise = connections.engineApi ? qDoc(this.myConfig) : null;
    this.connections = connections;
  }

  close() {
    console.log('QdtComponents.close called.', this.node);
    this.node.close();
  }

  render = async (type, props, element) =>
    new Promise((resolve, reject) => {
      try {
        const { qAppPromise, qDocPromise } = this;
        const Component = components[type];
        console.log('QdtComponents.render called');
        ReactDOM.render(
          <Component
            {...props}
            qAppPromise={qAppPromise}
            qDocPromise={qDocPromise}
            ref={(node) => {
              this.node = node;
              return resolve(this.node);
            }}
          />,
          element,
        );
      } catch (error) {
        reject(error);
      }
    });
};

export default QdtComponents;
