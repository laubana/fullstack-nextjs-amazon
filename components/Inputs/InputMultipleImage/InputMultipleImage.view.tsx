"use client";

import { useState } from "react";
import { FaImages } from "react-icons/fa6";
import ImageUploading, {
  ErrorsType,
  ImageListType,
} from "react-images-uploading";

import styles from "./InputMultipleImage.module.css";
import { InputMultipleImageProps } from "./InputMultipleImage.props";

import Text from "@/components/Text";

export default (props: InputMultipleImageProps) => {
  const { label, images, setImages, error, size = "medium" } = props;

  const [inputValues, setInputValues] = useState<ImageListType>(
    images ? images : []
  );

  const handleChange = (values: ImageListType) => {
    setInputValues(values);
    setImages(values);
  };

  const handleError = (error: ErrorsType) => {
    if (error?.maxNumber) {
    }

    if (error?.acceptType) {
    }

    if (error?.maxFileSize) {
    }
  };

  return (
    <div className={styles.container}>
      {label && (
        <div>
          <Text size={size}>{label}</Text>
        </div>
      )}
      <div className={styles["input-container"]}>
        <ImageUploading
          value={inputValues}
          maxFileSize={10485760}
          onChange={handleChange}
          onError={handleError}
          dataURLKey="dataURL"
          acceptType={["jpg", "png"]}
          multiple
        >
          {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
            <>
              {inputValues.length === 0 ? (
                <button
                  className={styles.input}
                  onClick={onImageUpload}
                  {...dragProps}
                  style={{ aspectRatio: 2, gridColumn: "1 / -1" }}
                >
                  <FaImages size={48} color="grey" />
                </button>
              ) : (
                <button
                  className={styles.input}
                  onClick={onImageUpload}
                  {...dragProps}
                  style={{ aspectRatio: 1 }}
                >
                  <FaImages size={48} color="grey" />
                </button>
              )}
              {imageList.map((image, index) => (
                <button
                  className={styles.item}
                  onClick={() => onImageRemove(index)}
                  key={index}
                >
                  <img className={styles.image} src={image.dataURL} />
                </button>
              ))}
            </>
          )}
        </ImageUploading>
      </div>
      {error && (
        <div>
          <Text color="red" size={size}>
            {error}
          </Text>
        </div>
      )}
    </div>
  );
};
