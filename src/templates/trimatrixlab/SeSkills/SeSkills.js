import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query} from "react-apollo";
import {Mutation} from "react-apollo";
import {USER_SKILLS} from 'Graphql/UserSkillsQuery';
import {SKILLS} from 'Graphql/SkillsQuery';
import {CHANGE_USER_SKILL} from 'Graphql/ChangeUerSkillMutation';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Utils from 'utils/Utils';

import {
    Skills,
    SeSelected
} from 'templates/trimatrixlab';
import {
    Edit
} from 'dadComponents';
import {
    Input,
    Spinners
} from 'components';

class SeSkills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skill_id: 1,
            percentage: '',
            closeModal: true,
            closeModalEdit: true,
            spinner: false
        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onOpenModalEdit = this.onOpenModalEdit.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    onChangeValue(selected) {
        this.setState({
            skill_id: selected.id
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
            percentage: ''
        })
    }

    onOpenModalEdit(data) {
        this.setState({
            closeModalEdit: true,
            percentage: data.percentage,
        });
        console.log('this.state.percentage data', this.state.percentage, data)
    }


    onClickEdit(e, data, change_user_skill, id) {
        e.preventDefault();

        this.setState({
            spinner: true
        });

        change_user_skill({
            variables: {
                id: id,
                skill_id: this.state.skill_id,
                percentage: this.state.percentage,
            }

        }).then((data) => {
            this.setState({
                closeModal: false,
                closeModalEdit: false,
                spinner: false
            });
            toast.success("تغییرات شما با موفقیت اعمال شد");
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
                name: 'percentage',
                label: 'درصد',
                value: this.state.percentage
            }
        ]
        console.log('this.state.percentage', this.state.percentage)
        return (
            <Query query={USER_SKILLS}>
                {
                    ({loading: loadingOne, data: {user_skills}}) => (

                        <Query query={SKILLS}>
                            {({loading: loadingTwo, data: {skills}}) => {
                                if (loadingOne || loadingTwo) {
                                    return (<div>

                                    </div>)
                                } else if (user_skills) {
                                    console.log('NETWORKS--', user_skills)
                                    return <Mutation mutation={CHANGE_USER_SKILL}>
                                        {(change_user_skill, {dataM}) => (
                                            <form>
                                                {console.log('dataM', user_skills)}
                                                <SeSelected
                                                    plusIcon
                                                    switchIcon
                                                    seClass={'skill'}
                                                    modalChildren={
                                                        <Edit
                                                            title={'افزودن'}
                                                            labelBtn={'افزودن'}
                                                            list={skills}
                                                            inputData={inputData}
                                                            onChange={this.onChangeTitle}
                                                            onChangeValue={this.onChangeValue}
                                                            onClickEdit={(e) => this.onClickEdit(e, dataM, change_user_skill)}
                                                            dropDownList
                                                        />
                                                    }
                                                    closeModal={this.state.closeModal}
                                                    onOpenModal={this.onOpenModal}
                                                >
                                                    <div
                                                        className={'container'}
                                                    >
                                                        <h2 className="title">مهارت ها</h2>
                                                        <div className='Skills seSkills-trimatrixlab row'>
                                                            {
                                                                user_skills.map((item, index) => {
                                                                    return <div
                                                                        key={index}
                                                                        className={'col-md-4 col-sm-6 col-xs-12'}
                                                                    >
                                                                        {console.log('item user_skills', user_skills)}
                                                                        <Skills
                                                                            progressBar
                                                                            modalChildren={
                                                                                <Edit
                                                                                    list={skills}
                                                                                    title={'ویرایش'}
                                                                                    labelBtn={'ویرایش'}
                                                                                    inputData={inputData}
                                                                                    onChangeValue={this.onChangeValue}
                                                                                    onChange={this.onChangeTitle}
                                                                                    onClickEdit={(e) => this.onClickEdit(e, user_skills, change_user_skill, item.id)}
                                                                                    dropDownList
                                                                                />
                                                                            }
                                                                            percent={item.percentage}
                                                                            title={item.skill.title}
                                                                            id={item.id}
                                                                            closeModal={this.state.closeModalEdit}
                                                                            onOpenModal={() => this.onOpenModalEdit(item)}
                                                                        />
                                                                    </div>

                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </SeSelected>

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

SeSkills.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    style: PropTypes.object
};

export default SeSkills;
