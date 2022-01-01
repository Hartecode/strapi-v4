import React, { useEffect } from 'react';
import { prefixFileUrlWithBackendUrl, useLibrary } from '@strapi/helper-plugin';

const imgSizes = [
  { size: 'xsmall', bp: 400 },
  { size: 'small', bp: 768 },
  { size: 'medium', bp: 1023 },
  { size: 'large', bp: 1440 },
]

const srcSet = (format) => {
  return imgSizes.reduce((acc, cur) => {
    return format[cur.size] ? `${acc}${acc ? ', ' :''}${
      prefixFileUrlWithBackendUrl(format[cur.size].url)} ${cur.bp}` : '';
  }, '')
}


export default function MediaLib({ isOpen, onClose, onChange, value, name }) {
  const { components } = useLibrary();
  const MediaLibDialog = components['media-library'];

  function handleSelectAssets(filesArray) {
    const formattedImgs = filesArray.map((file) => {
      // if not a image then return empty string
      if (!file.mime.includes('image')) return '';
      // return a responsive image with native lazy load
      return `<img src="${prefixFileUrlWithBackendUrl(file.url)}" 
        srcset="${srcSet(file.formats)}" 
        alt="${file.alternativeText || file.name}" loading="lazy" />`;
    }).join('');

    const newValue = value ? `${value}${formattedImgs}` : formattedImgs;
    onChange({ target: { name, value: newValue } });
    onClose();
  }

  // This is a hack to modify the media dialog's z-index
  useEffect(() => {
    if (!isOpen) return;
    let timer;
    async function waitForModal() {
      return new Promise((r) => {
        timer = setTimeout(() => {
          const modalRoot = document
            .getElementById('asset-dialog-title')
            ?.closest('div[data-react-portal="true"]').firstChild;
          if (modalRoot) {
            r(modalRoot);
          } else {
            return waitForModal();
          }
        }, 10);
      });
    }
    waitForModal().then((modalRoot) => {
      modalRoot.style.zIndex = '10';
    });
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  return isOpen ? (
    <MediaLibDialog onClose={onClose} onSelectAssets={handleSelectAssets} />
  ) : null;
}