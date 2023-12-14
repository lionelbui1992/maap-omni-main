import React, { Component } from 'react';
import '../SizeOptions/index.scss';

class SizeOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: true,
        };
    }

    defaultSize = values => {
        let sortSize = values.map(size => {
            return Number(size);
        });

        return sortSize.sort(function(start, end) {
            return start - end;
        });
    };

    handleSelected = () => {
        this.setState({
            selected: !this.state.selected,
        });
    };

    render() {
        const { values } = this.props;

        return (
            <div className="size_options">
                <div className="size_options__text heading_style__medium_regular">
                    {this.props.title}
                </div>
                <div className="size_options__wrapper">
                    {this.props.values &&
                        this.defaultSize(values).map((value, key) => {
                            return (
                                <div
                                    className="size_options__inner paragraph_style__secondary_regular"
                                    key={key}
                                >
                                    {value}
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

export default SizeOptions;
