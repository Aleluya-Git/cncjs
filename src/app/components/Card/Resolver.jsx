import React from 'react';
import { CardContext } from './context';

function Resolver({ children }) {
  return (
    <CardContext.Consumer>
      {value => {
        if (!value) {
          return (
            <CardContext.Provider>
              {value => (
                <CardContext.Consumer>
                  {value => children(value)}
                </CardContext.Consumer>
              )}
            </CardContext.Provider>
          );
        }

        return children(value);
      }}
    </CardContext.Consumer>
  );
}

export default Resolver;
