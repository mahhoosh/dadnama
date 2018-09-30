import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import {EditorState} from 'draft-js';
//import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import moment from 'moment-jalaali';
import 'components/ReactPersianDatepicker/styles/basic.css';
import DatePicker from 'components/ReactPersianDatepicker/DatePicker/DatePicker';

import {
    Input,
    Button,
    DropDownList,
    FileUpload,
    CropperEasy,
    TextAria
} from 'components';

import profileImg from 'assets/images/hero.png';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //editorState: EditorState.createEmpty(),
            returnDataUrl: [],
            startDate: moment(),
            stopDate: moment()
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeStopDate = this.handleChangeStopDate.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.datePickerData !== nextProps.datePickerData) {
            nextProps.datePickerData.map((data, index) => {
                if (data.name === 'started_at') {
                    this.setState({
                        startDate: data.value
                    });
                } else if (data.name === 'stopped_at') {
                    this.setState({
                        stopDate: data.value
                    });
                }

            })
        }
    }

    componentDidMount() {
        this.props.datePickerData && this.props.datePickerData.map((data, index) => {
            if (data.name === 'started_at') {
                this.setState({
                    startDate: data.value
                });
            } else if (data.name === 'stopped_at') {
                this.setState({
                    stopDate: data.value
                });
            }

        })
    }

    handleChangeStartDate(date) {
        this.setState({
            startDate: date
        });
        this.props.handleChangeStartDate && this.props.handleChangeStartDate(date);
    }

    handleChangeStopDate(date) {
        this.setState({
            stopDate: date
        });
        this.props.handleChangeStopDate && this.props.handleChangeStopDate(date);
    }

    onChangeValue(selected) {
        this.props.onChangeValue && this.props.onChangeValue(selected);
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState: editorState
        });
    };

    onCropComplete(croppedAreaPixels) {
        let dataFile = new FormData();
        dataFile.append('file', croppedAreaPixels);
        this.props.onCropComplete && this.props.onCropComplete(croppedAreaPixels, dataFile);
        console.log('croppedArea, croppedAreaPixels=Edit=====', croppedAreaPixels, dataFile)
    }

    render() {

        const {
            onChange,
            onClickEdit,
            labelBtn,
            name,
            inputChild,
            inputData,
            TextAriaData,
            datePickerData,
            list,
            dropDownList,
            title,
            fileUpload,
            cropper,
            srcImgCrp
        } = this.props;

        console.log('========returnDataUrl', this.state.returnDataUrl)
        console.log('========returnDataUrl2', `assets/images/${this.state.returnDataUrl.name}`)
        return (
            <div className='am-edit'>
                <div>
                    <h4 className="topbarTitle">{title}</h4>
                    <div
                        className={'inputWrapper'}
                    >
                        {
                            inputData && inputData.map((data, index) => {
                                return <Input
                                    key={index}
                                    value={data.value}
                                    label={data.label}
                                    name={data.name}
                                    onChange={onChange}
                                />
                            })
                        }
                    </div>
                    <div
                        className={'textAriaWrapper'}
                    >
                        {
                            TextAriaData && TextAriaData.map((data, index) => {
                                return <TextAria
                                    key={index}
                                    value={data.value}
                                    label={data.label}
                                    name={data.name}
                                    onChange={onChange}
                                />
                            })
                        }
                    </div>
                    {
                        datePickerData && datePickerData.map((data, index) => {
                            return <div
                                className={'dateWrapper'}
                            >
                                {data.name === 'started_at' ?
                                    <DatePicker
                                        key={index}
                                        inputFormat="jYYYY/jM/jD"
                                        value={this.state.startDate}
                                        onChange={this.handleChangeStartDate}
                                        name={data.name}
                                    />
                                    :
                                    <DatePicker
                                        key={index}
                                        inputFormat="jYYYY/jM/jD"
                                        value={this.state.stopDate}
                                        onChange={this.handleChangeStopDate}
                                        name={data.name}
                                    />
                                }
                            </div>
                        })
                    }
                    {
                        dropDownList && <div>
                            <DropDownList
                                onChangeValue={this.onChangeValue}
                                list={list}
                                defaultSelected={1}
                            />
                        </div>
                    }
                    {/* <Editor
                        editorState={this.state.editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                    />*/}
                </div>
                {/*{
                    fileUpload && <div>
                        <FileUpload
                            title="انتخاب عکس"
                            returnFile={(dataUrl) => {
                                this.setState({
                                    returnDataUrl: dataUrl
                                })
                            }}
                            deleteImage
                        />

                    </div>
                }*/}
                {
                    cropper && <div
                        className={'cropperWrapper'}
                    >
                        <CropperEasy
                            src={srcImgCrp}
                            onCropComplete={this.onCropComplete}
                        />

                    </div>
                }
                <div
                    className={'btnRapper'}
                >
                    <Button
                        label={labelBtn}
                        primary
                        icon={'paper-plane'}
                        onClick={onClickEdit}
                    />
                </div>
            </div>
        )
    }
}

Edit.propTypes = {
    onChange: PropTypes.func,
    onClickEdit: PropTypes.func,
    onChangeValue: PropTypes.func,
    label: PropTypes.string,
    labelBtn: PropTypes.string,
    title: PropTypes.string,
    srcImgCrp: PropTypes.string,
    name: PropTypes.string,
    inputChild: PropTypes.node,
    inputData: PropTypes.object,
    TextAriaData: PropTypes.object,
    datePickerData: PropTypes.object,
    list: PropTypes.array,
    dropDownList: PropTypes.bool,
    cropper: PropTypes.bool,
    fileUpload: PropTypes.bool,
    date: PropTypes.oneOfType([
        PropTypes.instanceOf(moment),
        PropTypes.instanceOf(Date)
    ]),
    handleChangeStartDate: PropTypes.func,
    handleChangeStopDate: PropTypes.func,
    onCropComplete: PropTypes.func
};

Edit.defaultProps = {
    date: moment.now()
};

export default Edit;
