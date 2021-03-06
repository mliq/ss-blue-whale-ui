import React, { Component, PropTypes } from 'react';
import VerticalRhythm from '../../repeater/VerticalRhythm/VerticalRhythm';

/**
 * @class PageTitle
 * @extends React/Component
 */
export default class PageTitle extends Component {
    render() {
        return (
            <VerticalRhythm increment={ 1 }>
                <div className="pageTitle">
                    <h1 className="hdg hdg_1">{ this.props.title }</h1>
                </div>
            </VerticalRhythm>
        );
    }
}

/**
 * @property displayName
 * @type {String}
 * @static
 */
PageTitle.displayName = 'PageTitle';

/**
 * @property propTypes
 * @type {String}
 * @static
 */
PageTitle.propTypes = {
    /**
     * @property title
     * @type {String}
     * @required
     */
    title: PropTypes.string.isRequired
};
