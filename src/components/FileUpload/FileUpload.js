import React from 'react';
//import './asset/css/style.css';
import PropTypes from 'prop-types';
//import RhButton from '../../RhComponents/RhButton/RhButton'
//import RhTextInput from '../../RhComponents/RhInput/js/RhTextInput'
import {
    Input,
    Button
} from 'components';

class FileUpload extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            active: false,
            target: false,
            hover: false,
            file: '',
            imagePreviewUrl: '',
            name: '',
            size: ''
        };
        this.handleImageChange = this.handleImageChange.bind(this);
        this.dropLeave = this.dropLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.dropTarget = this.dropTarget.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        var self = this;

        window.addEventListener('dragover', self.dropTarget);
        window.addEventListener('dragleave', self.dropLeave);
        window.addEventListener('drop', self.handleDrop);
    }

    componentWillUnmount() {
        var self = this;

        window.removeEventListener('dragover', self.dropTarget);
        window.removeEventListener('dragleave', self.dropLeave);
        window.removeEventListener('drop', self.handleDrop);
    }

    dropTarget(e) {
        var self = this;
        if (!self.state.active) {
            self.setState({
                target: true
            });
        }
    }

    dropLeave(e) {
        var self = this;

        if (e.screenX === 0 && e.screenY === 0) { // Checks for if the leave event is when leaving the window
            self.setState({
                target: false
            });
        }
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();

        var self = this;
        var uploadObj = {
            target: e.nativeEvent.dataTransfer
        };

        self.setState({
            target: false,
            hover: false
        });

        self.handleImageChange(uploadObj);
    }

    handleDragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
        var self = this;

        if (!self.state.active) {
            self.setState({
                hover: true
            });
        }
    }

    handleDragLeave(e) {
        var self = this;

        self.setState({
            hover: false
        });
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleChange(e) {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };
        reader.readAsDataURL(file);
    }

    handleImageChange(e) {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                name: file.name,
                size: file.size
            });
        };
        setTimeout(function () {
            this.props.returnFile(this.state.file, this.state.imagePreviewUrl)
        }.bind(this), 100);
        reader.readAsDataURL(file);
    }

    render() {
        const {deleteImage} = this.props;
        return (

            <div className="dropzone dz-message upload">
        <span>
              {
                  (deleteImage && this.state.imagePreviewUrl.length > 0) &&
                  <Button
                      style={{display: 'block'}}
                      bType='Danger'
                      onClick={() => {
                          this.setState({
                              imagePreviewUrl: '',
                              name: '',
                              size: '',
                              file: ''
                          });
                          this.props.returnFile('')
                      }}
                      label={'حذف تصویر'}
                  />
              }

            <Input type="file"
                   label={this.props.title}
                   errorText={this.props.errorText}
                   important={this.props.important}
                   name="upload"
                   ref="upload"
                   onDrop={this.handleDrop}
                   onDragEnter={this.handleDragEnter}
                   onDragOver={this.handleDragOver}
                   onDragLeave={this.handleDragLeave}
                   onChange={this.handleImageChange}/>
        </span>


               {/* {this.state.imagePreviewUrl.length > 0 &&
                <img className='img-fluid imgUpload' src={this.state.imagePreviewUrl} alt=""/>}
*/}
                {this.state.name.length > 0 && <span>
         <label> نام  :</label> {this.state.name}
        </span>}

                {this.state.size > 0 && <span>
          <label>سایز  :</label> {this.state.size}
        </span>}


            </div>


        );
    }
}

FileUpload.propTypes = {
    returnFile: PropTypes.func,
    title: PropTypes.string,
    errorText: PropTypes.string,
    important: PropTypes.bool
};
export default FileUpload;