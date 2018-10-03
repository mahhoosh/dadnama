import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query} from "react-apollo";
import {Mutation} from "react-apollo";
import {USER_EDUCATIONALES} from 'Graphql/EducationalesQuery';
import {CITY} from 'Graphql/CityQuery';
import {CHANGE_EDUCATIONALES} from 'Graphql/ChangeEducationalesMutation';
import moment from 'moment-jalaali';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Utils from 'utils/Utils';

import {
    Timeline,
    SeSelected
} from 'templates/trimatrixlab';
import {
    Edit
} from 'dadComponents';
import {
    Input,
    Spinners
} from 'components';

class SeEducationales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueTitle: '',
            title: '',
            city_id: '',
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
        this.onChangeValue = this.onChangeValue.bind(this);
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

    onChangeValue(selected) {
        this.setState({
            city_id: selected.id
        });
    }

    onChangeTitle(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onOpenModal() {
        this.setState({
            closeModal: true,
            title: '',
            city_id: '',
            started_at: '1395/7/2',
            stopped_at: '1395/7/2',
        });
    }

    onOpenModalEdit(data) {
        this.setState({
            closeModalEdit: true,
            title: data.title,
            city_id: data.id,
            started_at: data.started_at,
            stopped_at: data.stopped_at,
        });
    }

    onClickEdit(e, data, change_educationales, id) {
        console.log('========SeEducationales Edit====', data)
        e.preventDefault();

        this.setState({
            spinner: true
        });

        change_educationales({
            variables: {
                id: id,
                title: this.state.title,
                city_id: this.state.city_id,
                started_at: this.started_atDate,
                stopped_at: this.stop_atDate
            }

        }).then((data) => {
            toast.success("تغییرات شما با موفقیت اعمال شد");
            this.setState({
                closeModal: false,
                closeModalEdit: false,
                spinner: false
            });
            console.log('data', data)
        }).catch((err) => {
            this.setState({
                spinner: false
            });
            toast.error(Utils.gqlHandelError(err));
            console.log('err', err)
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
        console.log('========SeEducationales this.state.valueTitle====', this.state.valueTitle)
        return (
            <Query query={USER_EDUCATIONALES}>
                {
                    ({loading: loadingOne, data: {user_educationales}}) => (

                        <Query query={CITY}>
                            {({loading: loadingTwo, data: {city}}) => {
                                if (loadingOne || loadingTwo) {
                                    return (<div>
                                        {/*<Spinner/>*/}
                                    </div>)
                                } else if (user_educationales) {
                                    console.log('user_educationales--', user_educationales)
                                    return <Mutation mutation={CHANGE_EDUCATIONALES}>
                                        {(change_educationales, {dataM}) => (
                                            <form>
                                                <SeSelected
                                                    plusIcon
                                                    checked={true}
                                                    switchIcon
                                                    seClass={'educationales'}
                                                    modalChildren={
                                                        <Edit
                                                            dropDownList
                                                            onChangeValue={this.onChangeValue}
                                                            list={city}
                                                            title={'افزودن'}
                                                            labelBtn={'افزودن'}
                                                            inputData={inputData}
                                                            datePickerData={datePickerData}
                                                            handleChangeStartDate={this.handleChangeStartDate}
                                                            handleChangeStopDate={this.handleChangeStopDate}
                                                            onChange={this.onChangeTitle}
                                                            onClickEdit={(e) => this.onClickEdit(e, dataM, change_educationales)}
                                                        />
                                                    }
                                                    closeModal={this.state.closeModal}
                                                    onOpenModal={this.onOpenModal}
                                                    open={true}
                                                >
                                                    <div
                                                        className={'container'}
                                                    >
                                                        <h2 className="title">سوابق تحصیلی</h2>
                                                        <div className='timeline-trimatrixlab'>
                                                            {
                                                                user_educationales.map((item, index) => {
                                                                    return <Timeline
                                                                        key={index}
                                                                        modalChildren={
                                                                            <Edit
                                                                                dropDownList
                                                                                list={city}
                                                                                onChangeValue={this.onChangeValue}
                                                                                labelBtn={'ویرایش'}
                                                                                title={'ویرایش'}
                                                                                inputData={inputData}
                                                                                datePickerData={datePickerData}
                                                                                onChange={this.onChangeTitle}
                                                                                onClickEdit={(e) => this.onClickEdit(e, user_educationales, change_educationales, item.id)}
                                                                                handleChangeStartDate={this.handleChangeStartDate}
                                                                                handleChangeStopDate={this.handleChangeStopDate}
                                                                            />
                                                                        }
                                                                        title={item.title}
                                                                        //reference={item.city.title}
                                                                        reference={'شیراز'}
                                                                        startedAt={item.started_at}
                                                                        stoppedAt={item.stopped_at}
                                                                        id={item.id}
                                                                        seClass={'educationales'}
                                                                        closeModal={this.state.closeModalEdit}
                                                                        onOpenModal={() => this.onOpenModalEdit(item)}
                                                                    />
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </SeSelected>

                                                <ToastContainer/>

                                                <Spinners
                                                    loading={this.state.spinner}
                                                />

                                            </form>
                                        )}
                                    </Mutation>
                                }
                                else {
                                    //console.log('error', error);
                                }
                            }}
                        </Query>
                    )
                }
            </Query>
        )
    }
}


SeEducationales.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    style: PropTypes.object
};

export default SeEducationales;
