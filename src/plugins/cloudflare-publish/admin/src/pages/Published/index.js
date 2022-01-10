import React from "react";
import { useIntl } from 'react-intl';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { Link } from '@strapi/design-system/Link';
import ExternalLink from '@strapi/icons/ExternalLink';
import pluginId from "../../pluginId";

const Published = ({
    shortId,
    siteUrl,
    previewURl,
    deploymentTime
}) => {
    const { formatMessage } = useIntl();
    return (
        <div style={{
            backgroundColor: "rgb(255 252 252)",
            borderRadius: "2px",
            boxShadow: "0 2px 4px #e3e9f3",
            borderLeft: "4px solid green",
            padding: '16px'
            }}>
   
            <Flex justifyContent='space-between' alignItems="center">
                <Typography fontWeight="bold" fontSize="lg">
                    {formatMessage({ id: `${pluginId}.home.current.deploy` })}
                </Typography>
                <Typography fontWeight="bold">
                    <Link href={siteUrl} endIcon={<ExternalLink />}>
                        {formatMessage({ id: `${pluginId}.home.publish.visit` })}
                    </Link>
                </Typography>
            </Flex>
            
            <Box paddingTop={1} >
                <Typography>
                    {formatMessage({ id: `${pluginId}.home.publish.code` })} - {shortId}
                </Typography>
            </Box>
            <Box paddingTop={1}  paddingBottom={1} >
                <Typography>
                    {formatMessage({ id: `${pluginId}.home.publish.on` })} <time 
                        dateTime={deploymentTime.raw}>
                        <strong>{deploymentTime.date}</strong> {formatMessage({ id: `${pluginId}.home.publish.at` })} <strong>{deploymentTime.time}</strong>
                    </time>
                </Typography>
            </Box>
            <Typography fontWeight="bold">
                {formatMessage({ id: `${pluginId}.home.publish.preview` }) }
                <Link href={previewURl} endIcon={<ExternalLink />}>  
                    {previewURl}
                </Link>
            </Typography>
        </div> 
  );
}

export default Published;