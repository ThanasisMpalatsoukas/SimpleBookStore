import React, { Component } from 'react'

class Rating extends Component {
    constructor() {
        super();
    }

    render() {

        let singleStar = { backgroundImage : 'url(http://127.0.0.1:8000/storage/star.png)' }

        return(
            <div className="single-review-overall">
                    
                    <div className="mean-rating">
                        <p><span>{this.props.rating.mean}</span><br />Average rating</p>
                    </div>
                    <div className="content-table">
                        <table>
                            <tr>
                                <td className="light-fade">5</td>
                                <td><div className="image single-star" style={singleStar}></div></td>
                                <td><div className="background-loading"><div className="inner-loading green" style={{width: this.props.rating.percentageForEach[4]+'%' }}></div></div></td>
                                <td className="light-fade">{this.props.rating.amountForEach[4]}</td>
                                <td className="light-fade">({this.props.rating.percentageForEach[4]}%)</td>
                            </tr>
                            <tr>
                                <td className="light-fade">4</td>
                                <td><div className="image single-star" style={singleStar}></div></td>
                                <td><div className="background-loading"><div className="inner-loading green light-fade" style={{width:this.props.rating.percentageForEach[3]+'%'}}></div></div></td>
                                <td className="light-fade">{this.props.rating.amountForEach[3]}</td>
                                <td className="light-fade">({this.props.rating.percentageForEach[3]}%)</td>
                            </tr>
                            <tr>
                                <td className="light-fade">3</td>
                                <td><div className="image single-star" style={singleStar}></div></td>
                                <td><div className="background-loading"><div className="inner-loading yellow" style={{width:this.props.rating.percentageForEach[2]+'%'}}></div></div></td>
                                <td className="light-fade">{this.props.rating.amountForEach[2]}</td>
                                <td className="light-fade">({this.props.rating.percentageForEach[2]}%)</td>
                            </tr>
                            <tr>
                                <td className="light-fade">2</td>
                                <td><div className="image single-star" style={singleStar}></div></td>
                                <td><div className="background-loading"><div className="inner-loading orange" style={{width:this.props.rating.percentageForEach[1]+'%'}}></div></div></td>
                                <td className="light-fade">{this.props.rating.amountForEach[1]}</td>
                                <td className="light-fade">({this.props.rating.percentageForEach[1]}%)</td>
                            </tr>
                            <tr>
                                <td className="light-fade">1</td>
                                <td><div className="image single-star" style={singleStar}></div></td>
                                <td><div className="background-loading"><div className="inner-loading red" style={{width:this.props.rating.percentageForEach[0]+'%'}}></div></div></td>
                                <td className="light-fade">{this.props.rating.amountForEach[0]}</td>
                                <td className="light-fade">({this.props.rating.percentageForEach[0]}%)</td>
                            </tr>
                        </table>
                    </div>
                    <div className="mean-rating">
                        <p><span>{this.props.rating.total}</span><br />Total ratings</p>
                    </div>
                </div>
        )
    }
}

export default Rating;