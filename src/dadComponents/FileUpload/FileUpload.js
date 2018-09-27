import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadStatus: false
        }
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    handleUploadImage(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('photo', this.uploadInput.files[0]);
        const instance = axios.create({
            baseURL: 'http://api.dadnama.ir',
            headers: {'Apikey': 'از لوکال استورج میخونی'}
        });
        instance.post('upload/image/actor', data)
            .then(function (response) {
                //اینجا بررسی میکنی ارور داره یا نه
            })
            .catch(function (error) {
                //در صورت نبودن اینترنت یا اشتباه بودن ادرس
            });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleUpload}>
                    <div className="form-group">
                        <input className="form-control" ref={(ref) => {
                            this.uploadInput = ref;
                        }} type="file"/>
                    </div>

                    <div className="form-group">
                        <input className="form-control" ref={(ref) => {
                            this.fileName = ref;
                        }} type="text" placeholder="Optional name for the file"/>
                    </div>

                    <button className="btn btn-success" type>Upload</button>

                </form>
            </div>
        )

    }
}

FileUpload.propTypes = {
    //onChange: PropTypes.func
};

export default FileUpload;
