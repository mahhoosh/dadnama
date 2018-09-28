import React, {Fragment} from 'react'
import Cropper from 'react-easy-crop'
import ImgDialog from './ImgDialog'
import getCroppedImg from './cropImage'
import img from 'assets/images/hero.png';
//import img from '../public/img.jpeg'
import './cropper.css'
import {
    Button
} from 'components';

import PropTypes from "prop-types";

class CropperEasy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSrc: this.props.src,
            crop: {
                x: 0, // x/y are the coordinates of the top/left corner of the cropped area
                y: 0,
                width: 400, // width of the cropped area
                height: 507, // height of the cropped area
            },
            zoom: 1,
            aspect: 3 / 4,
            croppedAreaPixels: null,
            croppedImage: null,
        };
        this.onCropChange = this.onCropChange.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
        this.onZoomChange = this.onZoomChange.bind(this);
        this.showCroppedImage = this.showCroppedImage.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    onCropChange = crop => {
        this.setState({crop})
    }

    onCropComplete = async (croppedArea, croppedAreaPixels) => {
        console.log('croppedArea, croppedAreaPixels', croppedArea, croppedAreaPixels)
        this.setState({croppedAreaPixels});
        const croppedImage = await getCroppedImg(this.state.imageSrc, this.state.croppedAreaPixels)
        this.props.onCropComplete && this.props.onCropComplete(croppedImage)
    }

    onZoomChange = zoom => {
        this.setState({zoom})
    }

    showCroppedImage = async () => {
        const croppedImage = await getCroppedImg(this.state.imageSrc, this.state.croppedAreaPixels)
        console.log(croppedImage)
        this.setState({croppedImage})
    }
    /*
        handleClose = () => {
            this.setState({croppedImage: null})
        }*/

    onFileChange = async e => {
        if (e.target.files && e.target.files.length > 0) {
            const imageDataUrl = await readFile(e.target.files[0])
            this.setState({
                imageSrc: imageDataUrl,
                crop: {x: 0, y: 0},
                zoom: 1,
            })
        }
    }


    render() {
        const {} = this.props
        const area = {
            x: 0, // x/y are the coordinates of the top/left corner of the cropped area
            y: 0,
            width: 400, // width of the cropped area
            height: 507, // height of the cropped area
        }

        return (
            <div className="cropperEasy">

                <input className={'chooseFile'} type="file" onChange={this.onFileChange}/>
                {
                    this.state.imageSrc && <Fragment>
                        <div className="crop-container">
                            <Cropper
                                image={this.state.imageSrc}
                                crop={this.state.crop}
                                zoom={this.state.zoom}
                                aspect={this.state.aspect}
                                cropperAreaPixels={area}
                                onCropChange={this.onCropChange}
                                onCropComplete={this.onCropComplete}
                                onZoomChange={this.onZoomChange}
                            />
                        </div>
                    </Fragment>
                }

                {/*<div className="controls">
                    <Button
                        primary
                        label={'Show Img'}
                        onClick={this.showCroppedImage}
                        className={'cropButton'}/>

                </div>*/}
                {/*  <ImgDialog img={this.state.croppedImage} onClose={this.handleClose}/>
              */} {/*<img
                    src={`${this.state.croppedImage}`}
                    onClose={this.handleClose}
                />*/}
            </div>
        )
    }
}

function readFile(file) {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.addEventListener(
            'load',
            () => resolve(reader.result),
            false
        )
        reader.readAsDataURL(file)
    })
}

CropperEasy.propTypes = {
    onCropComplete: PropTypes.func,
    src: PropTypes.string
};

export default CropperEasy;

