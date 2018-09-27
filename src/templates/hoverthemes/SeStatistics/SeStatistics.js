import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query} from "react-apollo";
import {Mutation} from "react-apollo";
import {USER_STATISTIC} from 'Graphql/UserStatisticQuery';
import {CHANGE_STSTISTIC} from 'Graphql/ChangeStatisticMutation';
import {
    Skills,
    SeSelected
} from 'templates/hoverthemes';
import {
    Edit
} from 'dadComponents';
import {
    Input
} from 'components';

class SeStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            count: '',
            closeModal: true,
            closeModalEdit: true,
        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onOpenModalEdit = this.onOpenModalEdit.bind(this);
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
            count: ''
        })
    }

    onOpenModalEdit(data) {
        this.setState({
            closeModalEdit: true,
            title: data.title,
            count: data.count,
        })
    }

    onClickEdit(e, data, change_statistic, id) {
        e.preventDefault();

        change_statistic({
            variables: {
                id: id,
                title: this.state.title,
                count: this.state.count,
            }

        }).then((data) => {
            this.setState({
                closeModal: false,
                closeModalEdit: false
            });
            console.log('data', data)
        }).catch((res) => {
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
                name: 'count',
                label: 'تعداد',
                value: this.state.count
            }
        ]
        {
            console.log('this.state.title USER_STATISTIC', this.state.title)
        }
        return (
            <Query query={USER_STATISTIC}>
                {
                    ({loading, error, data}) => {
                        if (loading) {
                            return (<div>
                                {/*loading*/}
                            </div>)
                        } else if (data) {
                            return <Mutation mutation={CHANGE_STSTISTIC}>
                                {(change_statistic, {dataM}) => (
                                    <form>
                                        {console.log('dataM', data)}
                                        <SeSelected
                                            plusIcon
                                            switchIcon
                                            seClass={'statistic'}
                                            modalChildren={
                                                <Edit
                                                    title={'افزودن'}
                                                    labelBtn={'افزودن'}
                                                    inputData={inputData}
                                                    onChange={this.onChangeTitle}
                                                    onClickEdit={(e) => this.onClickEdit(e, dataM, change_statistic)}
                                                />
                                            }
                                            closeModal={this.state.closeModal}
                                            onOpenModal={this.onOpenModal}
                                        >
                                            <div
                                                className={'container seDocument'}
                                            >
                                                <h2 className="title">پرونده ها</h2>
                                                <div className='Skills row'>
                                                    {
                                                        data.user_statistic.map((item, index) => {
                                                            return <div
                                                                key={index}
                                                                className={'col-md-2 col-sm-4 col-xs-6'}
                                                            >
                                                                <Skills
                                                                    modalChildren={
                                                                        <Edit
                                                                            title={'ویرایش'}
                                                                            labelBtn={'ویرایش'}
                                                                            inputData={inputData}
                                                                            onChange={this.onChangeTitle}
                                                                            onClickEdit={(e) => this.onClickEdit(e, data, change_statistic, item.id)}
                                                                        />
                                                                    }
                                                                    title={item.title}
                                                                    count={item.count}
                                                                    id={item.id}
                                                                    closeModal={this.state.closeModalEdit}
                                                                    onOpenModal={() => this.onOpenModalEdit(item)}
                                                                    badge
                                                                />
                                                            </div>

                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </SeSelected>
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

SeStatistics.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    style: PropTypes.object
};

export default SeStatistics;
