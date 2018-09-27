import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NotFound extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {

        return (
            <div>
                <section className='container'>
                    <div className="not_found_page">
                        <div className="_contentBox">
                            <span className="title_404">404</span>
                            <h1>صفحه مورد نظر یافت نشد.</h1>
                            <p className="_text"><Link
                                to={'/'}>بازگشت به صفحه اصلی</Link></p>

                        </div>

                    </div>
                </section>

            </div>

        )
    }
}

export default NotFound;

