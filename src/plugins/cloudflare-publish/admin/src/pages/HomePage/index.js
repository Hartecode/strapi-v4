import React, { memo, useState, useEffect } from "react";
import { Box } from '@strapi/design-system/Box';
import UploadIcon from '@strapi/icons/UploadIcon';
import { Divider } from '@strapi/design-system/Divider';
import { Button } from '@strapi/design-system/Button';
import { BaseHeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Loader } from '@strapi/design-system/Loader';
import { Typography } from '@strapi/design-system/Typography';
import { useIntl } from 'react-intl';
import Published from '../Published';
import axiosInstance from '../../utils/axiosInstance';
import { Alert } from '@strapi/design-system/Alert';

import pluginId from "../../pluginId";

const POLL_INTERVAL = 10000;

const HomePage = () => {
  const { formatMessage } = useIntl();
  const [ready, setReady] = useState(false);
  const [publishStatus, setPublishStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [publishData, setPublishData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timeout;
    const checkBusy = async () => {
      try {
        const resp = await axiosInstance.get(`/${pluginId}/check`);
        const {
          busy,
          numberOfDeploys,
          status,
          deploy
        } = resp.data;

        setPublishStatus(status);
        setBusy(numberOfDeploys > 0 && busy);
        setReady(true);
        setPublishData(deploy);

        if (!busy) {
          setPublishData(deploy);
        } else {
          setPublishData(null);
        }

        timeout = setTimeout(checkBusy, POLL_INTERVAL);
      } catch(e) {
        const error = e.json();
        console.log(error, e.error);
        setError('Server Error');
        setPublishStatus('failed');
        setBusy(false);
        clearTimeout(timeout);
      }

    };

    checkBusy();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const triggerPublish = async () => {
    setBusy(true);
    setPublishData(null)
    const resp = await axiosInstance(`/${pluginId}/publish`)
  };

  const handleClick = () => {
    const ok = confirm(
      formatMessage({ id: `${pluginId}.home.prompt.confirm` })
    );
    if (ok) triggerPublish();
  };

  return (
    <Box background="neutral100"> 
      {error && (
        <Alert closeLabel="Close alert" 
          onClose={() => setError(null)} title="Title" variant="danger">
          {error}
        </Alert>
      )}
    
      <BaseHeaderLayout 
        title={formatMessage({ id: `${pluginId}.home.title` })} 
        subtitle={formatMessage({ id: `${pluginId}.home.description` })} 
        as="h2" />
      <ContentLayout>
        {ready ? (
          busy ? (
            <>
              <Typography fontWeight="bold" fontSize="md">
                {formatMessage({ id: `${pluginId}.home.current.status` })} 
                <span style={{color: '#e2a01d'}}>
                  {publishStatus}
                </span>
              </Typography>
              <Loader />
              <Typography>{formatMessage({ id: `${pluginId}.home.busy` })}</Typography>
            </>
          ) : (
            <>
              <Box paddingBottom={4}>
                <Typography>{formatMessage({ id: `${pluginId}.home.prompt` })}</Typography>
              </Box>
              <Button
                color="primary"
                startIcon={<UploadIcon />}
                onClick={handleClick}
              >
                {formatMessage({ id: `${pluginId}.home.button.publish` })}
              </Button>
              <Box paddingBottom={4} paddingTop={4}>
                <Divider />
              </Box>
              {publishData && <Published {...publishData}/>}

            </>
          )
        ) : (
          <>
            <Loader>Loading content...</Loader>
            <Typography>
                {formatMessage({ id: `${pluginId}.home.notready` })}
            </Typography>
          </>
        )}
      </ContentLayout>
    </Box>
  );
};

export default memo(HomePage);
