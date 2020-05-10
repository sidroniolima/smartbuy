import React, { useCallback, useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import WebCam from 'react-webcam';
import { toast } from 'react-toastify';
import { FiCamera, FiSave } from 'react-icons/fi';
import api from '~/services/api';
import {
  Container,
  PhotoCapture,
  PhotoList,
  Photo,
  Button,
  Actions,
} from './styles';

export default function PhotoManager({ productId }) {
  const [images, setImages] = useState([]);
  const webCamRef = useRef(null);

  const handleCapture = useCallback(() => {
    const newImage = webCamRef.current.getScreenshot();
    setImages([...images, newImage]);
  });

  const imagesSize = useMemo(() => {
    return images.length;
  });

  async function saveAction() {
    try {
      await api.post('/product-images', {
        images,
        productId,
      });

      toast.info(
        'Pronto, você adicionou fotos ao produto. Feche para voltar à inclusão do novo item à compra'
      );
    } catch (error) {
      console.tron.log('error', error);
    }
  }

  function deleteAction() {}

  return (
    <Container>
      <PhotoCapture>
        <WebCam
          height={360}
          width={400}
          screenshotFormat="image/jpeg"
          ref={webCamRef}
        />
        <Button type="button" onClick={handleCapture}>
          <FiCamera size={32} color="#ccc" />
        </Button>
      </PhotoCapture>

      {imagesSize > 0 && (
        <PhotoList>
          {images.map(image => (
            <Photo>
              <img src={image} alt="Imagem capturada" />
            </Photo>
          ))}
        </PhotoList>
      )}
      {imagesSize === 0 && (
        <PhotoList>
          <Photo noImage />
          <Photo noImage />
          <Photo noImage />
          <Photo noImage />
        </PhotoList>
      )}
      <Actions>
        <Button type="button" onClick={saveAction}>
          <FiSave size="32" color="#719192" />
        </Button>
      </Actions>
    </Container>
  );
}

PhotoManager.propTypes = {
  productId: PropTypes.number.isRequired,
};
