import React, {Component} from 'react';
import ReactCrop, {makeAspectCrop} from 'react-image-crop';
import sample from 'assets/images/it-bg01.jpg';
import 'react-image-crop/dist/ReactCrop.css';
import {
    Button,
    FileUpload
} from 'components';

class crop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showImageCropper: false,
            selectedImageURL: sample,
            crop: {
                x: 0,
                y: 0,
                // aspect: 16 / 9,
            },
            selectedFile: null,
            croppedImage: '',
            returnDataUrl: []
        };
    }

    onCropComplete = (crop, pixels) => {

    }

    onCropChange = (crop) => {
        this.setState({crop});
    }

    onImageLoaded = (image) => {
        this.setState({
            crop: makeAspectCrop({
                x: 0,
                y: 0,
                aspect: 10 / 4,
                width: 50,
            }, image.naturalWidth / image.naturalHeight),
            image,
        });
    }

    handleCancel = () => {
        this.setState({showImageCropper: false});
    }

    handleCropClose = () => {
        let {crop} = this.state;

        // console.log("selectedFile", selectedFile);
        // console.log("crop",crop);

        const croppedImg = this.getCroppedImg(this.refImageCrop, crop);
        this.setState({showImageCropper: false, croppedImage: croppedImg})
    }

    getCroppedImg(srcImage, pixelCrop) {
        /* the parameters: - the image element - the new width - the new height - the x point we start taking pixels - the y point we start taking pixels - the ratio */
        // Set up canvas for thumbnail
        // console.log(imgObj);
        // let img = new Image();
        // img.src = this.state.selectedImageURL;
        // let tempCanvas = document.createElement('canvas');
        // let tnCanvas = tempCanvas;
        // tnCanvas.width = newWidth;
        // tnCanvas.height = newHeight;
        // tnCanvas.getContext('2d').drawImage(img, startX, startY, newWidth, newHeight);
        // return tnCanvas;

        let img = new Image();
        img.src = this.state.selectedImageURL;
        const targetX = srcImage.width * pixelCrop.x / 100;
        const targetY = srcImage.height * pixelCrop.y / 100;
        const targetWidth = srcImage.width * pixelCrop.width / 100;
        const targetHeight = srcImage.height * pixelCrop.height / 100;

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            img,
            targetX,
            targetY,
            targetWidth,
            targetHeight,
            0,
            0,
            targetWidth,
            targetHeight
        );

        return canvas.toDataURL('image/png');
    }

    handleOpen = () => {
        this.setState({showImageCropper: true});
    }

    render() {
        console.log('========returnDataUrl 3', this.state.selectedImageURL)
        return (
            <div>
                <div className="cropImgWrapper">
                    <ReactCrop
                        src={this.state.selectedImageURL}
                        crop={this.state.crop}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                    />
                    <img src={this.state.selectedImageURL} style={{display: "none"}} ref={(img) => {
                        this.refImageCrop = img
                    }} alt=""/>
                    <img className={'croppedImage'} src={this.state.croppedImage} alt=""/>
                    <div>
                        <FileUpload
                            title="انتخاب عکس"
                            returnFile={(dataUrl) => {
                                this.setState({
                                    returnDataUrl: dataUrl,
                                    selectedImageURL: `assets/images/${dataUrl.name}`
                                })
                            }}
                            deleteImage
                        />

                    </div>
                    <Button
                        label="Crop"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.handleCropClose}
                    />,
                </div>
            </div>
        );
    }
}

export default crop;