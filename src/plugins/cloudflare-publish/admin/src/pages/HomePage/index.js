import React, { memo, useState, useEffect } from "react";
import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import UploadIcon from '@strapi/icons/Upload';
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
  const [ ready, setReady ] = useState(false);
  const [ publishStatus, setPublishStatus ] = useState('');
  const [ busy, setBusy ] = useState(false);
  const [ publishData, setPublishData ] = useState(null);
  const [ errors, setErrors ] = useState([]);

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
        setErrors(previousState => {
          return [...previousState, 'Unable to Load Last Published State'];
        })
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
    try {
      const resp = await axiosInstance(`/${pluginId}/publish`)
    } catch(e) {
      setErrors(previousState => {
        return [...previousState, 'Unable to Publish'];
      })
    }
  };

  const handleClick = () => {
    const ok = confirm(
      formatMessage({ id: `${pluginId}.home.prompt.confirm` })
    );
    if (ok) triggerPublish();
  };

  const closeAlert = (index) => {
    setErrors(errs => errs.filter((e, i) => i !== index));
  }

  return (
    <Box background="neutral100"> 
      {errors.map((err, i) => (<Alert 
          key={`${i}alerts`} 
          closeLabel="Close alert" 
          onClose={() => closeAlert(i)} title="Error" variant="danger">
          {err}
        </Alert>
      ))
      }
    
      <BaseHeaderLayout 
        title={formatMessage({ id: `${pluginId}.home.title` })} 
        subtitle={formatMessage({ id: `${pluginId}.home.description` })} 
        as="h2" />
      <ContentLayout>
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
        {ready ? (
          busy ? (
            <Flex justifyContent="center">
              <div>
                <Typography fontWeight="bold" fontSize="md">
                  {formatMessage({ id: `${pluginId}.home.current.status` })} 
                  <span style={{
                    marginLeft: '2px',
                    color: '#e2a01d'}}>
                    {publishStatus}
                  </span>
                </Typography>
                <Loader>{formatMessage({ id: `${pluginId}.home.busy` })}</Loader>
                <Typography>{formatMessage({ id: `${pluginId}.home.busy` })}</Typography>
              </div>
            </Flex>
          ) : (
            <>
              {publishData && <Published {...publishData}/>}
            </>
          )
        ) : (
          <Flex justifyContent="center">
            <Loader>{formatMessage({ id: `${pluginId}.home.notready` })}</Loader>
          </Flex>
        )}
      </ContentLayout>
    </Box>
  );
};

export default memo(HomePage);
