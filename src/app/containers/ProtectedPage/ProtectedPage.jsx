import React, { Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import styled from 'styled-components';
import Administration from 'app/containers/Administration';
import SideNav from 'app/containers/SideNav';
import TopNav from 'app/containers/TopNav';
import Workspace from 'app/containers/Workspace';
import analytics from 'app/lib/analytics';
import {
  TOPNAV_HEIGHT,
  SIDENAV_WIDTH,
  CONTENT_FONT_SIZE,
  CONTENT_BACKGROUND_COLOR,
  CONTENT_MIN_WIDTH,
} from 'app/config/styles';

function ProtectedPage({
  location,
  history
}) {
  const accepted = ([
    '/workspace',
    '/administration',
    '/administration/general',
    '/administration/workspace',
    '/administration/machine-profiles',
    '/administration/user-accounts',
    '/administration/controller',
    '/administration/commands',
    '/administration/events',
    '/administration/about'
  ].indexOf(location.pathname) >= 0);

  if (!accepted) {
    return (
      <Redirect
        to={{
          pathname: '/workspace',
          state: {
            from: location
          }
        }}
      />
    );
  }

  analytics.pageview(location.pathname);

  return (
    <>
      <TopBar>
        <TopNav />
      </TopBar>
      <SideBar id="sidebar">
        <SideNav />
      </SideBar>
      <Main>
        <Content>
          <Workspace
            style={{
              display: (location.pathname !== '/workspace') ? 'none' : 'block'
            }}
          />
          {location.pathname.indexOf('/administration') === 0 &&
          <Administration />}
        </Content>
      </Main>
    </>
  );
}

export default compose(
  withRouter
)(ProtectedPage);

const TopBar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
`;

const SideBar = styled.aside`
    position: fixed;
    top: ${TOPNAV_HEIGHT};
    left: 0;
    bottom: 0;
    z-index: 1000;
`;

const Main = styled.div`
    position: absolute;
    top: ${TOPNAV_HEIGHT};
    left: ${SIDENAV_WIDTH};
    right: 0;
    bottom: 0;
    overflow-y: auto;
`;

const Content = styled.div`
    position: relative;
    background-color: ${CONTENT_BACKGROUND_COLOR};
    font-size: ${CONTENT_FONT_SIZE};
    min-width: ${CONTENT_MIN_WIDTH};
`;
