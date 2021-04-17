import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import Page from '../../Page/Page';
import Header from './Header';
import Timeline from './Timeline';
import Connections from './Connections';
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}));

const GroupeView = (props) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('timeline');
  const group_id = props.match.params.id
  const groupes = useSelector(state => state.groupe.groupes)
  const [profile, setProfile] = useState(groupes?.find(i => i._id == group_id));

  const tabs = [
    { value: 'timeline', label: 'Timeline' },
    { value: 'connections', label: 'Connections' },
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };
  useEffect(() => {
    setProfile(groupes?.find(i => i._id == group_id))
  }, [group_id]);

  if (!profile) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Profile"
    >
     <Header profile={profile} />
      <Container maxWidth="lg">
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            textColor="secondary"
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box
          py={3}
          pb={6}
        >
          {currentTab === 'timeline' && <Timeline profile={profile} group_id={group_id}/>}
          {/* {currentTab === 'connections' && <Connections />} */}
        </Box>
      </Container>

    </Page>
  );
};

export default GroupeView;
