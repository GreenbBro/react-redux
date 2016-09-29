import React, {PropTypes, Component} from 'react'

export default class Page extends Component {

    onYearButtonClick(e){
        this.props.getPhotos(+e.target.innerText)
    }

    render() {
        const {year, photos, fetching} = this.props
        return <div>
                <button onClick={::this.onYearButtonClick}>2016</button>
                <button onClick={::this.onYearButtonClick}>2015</button>
                <button onClick={::this.onYearButtonClick}>2014</button>
                <h3>year is {year}</h3>
                {
                    fetching?
                        <p>Загрузка</p>
                    :
                    <p>You have {photos.length} photos!</p>
                }
            </div>
    }
}

Page.propTypes = {
    year: PropTypes.number,
    photos: PropTypes.array.isRequired,
    getPhotos: PropTypes.func.isRequired
}