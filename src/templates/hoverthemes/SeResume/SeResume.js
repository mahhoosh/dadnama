import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query} from "react-apollo";
import {Mutation} from "react-apollo";
import {USER_COURT_CASES} from 'Graphql/UserCourtCasesQuery';
import {CHANGE_COURT_CASES} from 'Graphql/ChangeCourtCasesMutation';
import momentJ from 'moment'
import moment from 'moment-jalaali';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Utils from 'utils/Utils';

import {
    Timeline,
    SeSelected
} from 'templates/hoverthemes';
import {
    Edit
} from 'dadComponents';
import {
    Input,
    Spinners
} from 'components';

class SeResume extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            reference: '',
            started_at: moment(),
            started_atDate: moment(),
            stopped_at: moment(),
            closeModal: true,
            closeModalEdit: true,
            spinner: false
        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onOpenModalEdit = this.onOpenModalEdit.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeStopDate = this.handleChangeStopDate.bind(this);
        this.started_atDate = moment();
    }

    handleChangeStartDate(date) {
        this.started_atDate = date;
    }

    handleChangeStopDate(date) {
        this.stop_atDate = date;
    }

    onChangeTitle(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onOpenModal() {
        //--افزودن--
        let _this = this;
        this.setState({
            closeModal: true,
            title: '',
            reference: '',
            started_at: moment().format('jYYYY/jM/jD'),
            stopped_at: moment().format('jYYYY/jM/jD'),
        })
    }

    onOpenModalEdit(data) {
        //----ویرایش--
        this.setState({
            closeModalEdit: true,
            title: data.title,
            reference: data.reference,
            started_at: data.started_at,
            stopped_at: data.stopped_at
        })
    }

    onClickEdit(e, data, Change_court_cases, id) {
        e.preventDefault();
        debugger
        this.setState({
            spinner: true
        })

        Change_court_cases({
            variables: {
                id: id,
                title: this.state.title,
                reference: this.state.reference,
                started_at: this.started_atDate,
                stopped_at: this.stop_atDate
            }

        }).then((data) => {
            toast.success("تغییرات شما با موفقیت اعمال شد");
            this.setState({
                spinner: false,
                closeModal: false,
                closeModalEdit: false
            });
            console.log('data', data)
        }).catch((res) => {
            this.setState({
                spinner: false
            });
            toast.error(Utils.gqlHandelError(res));
            console.log('res', res)
        });
    }

    render() {
        const {} = this.props;
        let inputData = [
            {
                id: 1,
                name: 'title',
                label: 'عنوان',
                value: this.state.title
            },
            {
                id: 2,
                name: 'reference',
                label: 'منابع',
                value: this.state.reference
            }
        ];
        let datePickerData = [
            {
                id: 1,
                name: 'started_at',
                label: 'تاریخ شروع',
                value: moment(`${this.state.started_at}`, 'jYYYY/jMM/jDD')
            }
            ,
            {
                id: 2,
                name: 'stopped_at',
                label: 'تاریخ پایان',
                value: moment(`${this.state.stopped_at}`, 'jYYYY/jMM/jDD')
            }
        ]

        return (
            <Query query={USER_COURT_CASES}>
                {
                    ({loading, error, data}) => {
                        if (loading) {
                            return (<div>
                                {/*loading*/}
                            </div>)
                        } else if (data) {
                            return <Mutation mutation={CHANGE_COURT_CASES}>
                                {(Change_court_cases, {dataM}) => (
                                    <form>
                                        <SeSelected
                                            plusIcon
                                            switchIcon
                                            seClass={'court_cases'}
                                            modalChildren={
                                                <Edit
                                                    labelBtn={'افزودن'}
                                                    title={'افزودن'}
                                                    inputData={inputData}
                                                    datePickerData={datePickerData}
                                                    onChange={this.onChangeTitle}
                                                    handleChangeStartDate={this.handleChangeStartDate}
                                                    handleChangeStopDate={this.handleChangeStopDate}
                                                    onClickEdit={(e) => this.onClickEdit(e, dataM, Change_court_cases)}
                                                />
                                            }
                                            closeModal={this.state.closeModal}
                                            onOpenModal={this.onOpenModal}
                                        >
                                            <div
                                                className={'container'}
                                            >
                                                <h2 className="title">سوابق کاری</h2>
                                                <div className='timeline'>
                                                    {
                                                        data.user_court_cases.map((item, index) => {
                                                            return <Timeline
                                                                key={index}
                                                                modalChildren={
                                                                    <Edit
                                                                        labelBtn={'ویرایش'}
                                                                        title={'ویرایش'}
                                                                        inputData={inputData}
                                                                        datePickerData={datePickerData}
                                                                        onChange={this.onChangeTitle}
                                                                        onClickEdit={(e) => this.onClickEdit(e, data, Change_court_cases, item.id)}
                                                                        handleChangeStartDate={this.handleChangeStartDate}
                                                                        handleChangeStopDate={this.handleChangeStopDate}
                                                                    />
                                                                }
                                                                title={item.title}
                                                                startedAt={item.started_at}
                                                                stoppedAt={item.stopped_at}
                                                                id={item.id}
                                                                seClass={'court_cases'}
                                                                closeModal={this.state.closeModalEdit}
                                                                onOpenModal={() => this.onOpenModalEdit(item)}
                                                            />
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </SeSelected>

                                        <Spinners
                                            loading={this.state.spinner}
                                        />

                                        <ToastContainer/>

                                    </form>
                                )}
                            </Mutation>
                        }
                        else {
                            console.log('error', error);
                        }
                    }}
            </Query>
        )
    }
}

SeResume.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    style: PropTypes.object
};

export default SeResume;
