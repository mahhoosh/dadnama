import React from 'react';

/*function Transition(props) {
    return <Slide direction="up" {...props} />
}*/

class ImgDialog extends React.Component {
    state = {
        open: false,
    }

    handleClickOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() {
        const {classes} = this.props
        return (
            <div
                /*fullScreen
                open={!!this.props.img}
                onClose={this.props.onClose}
                TransitionComponent={Transition}*/
            >
                <div className={'appBar'}>
                    <div>
                        {/*<div
                            color="inherit"
                            onClick={this.props.onClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </div>*/}
                        <div
                            className={'flex'}
                        >
                            Cropped image
                        </div>
                    </div>
                </div>
                <div className={'imgContainer'}>
                    <img
                        src={this.props.img}
                        alt="Cropped"
                        className={'img'}
                    />
                </div>
            </div>
        )
    }
}

export default ImgDialog;