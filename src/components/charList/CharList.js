import './charList.scss'
import MarvelService from '../../services/MarvelService'
import { Component } from 'react'
import CharItem from '../app/charItem/CharItem'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/spinner'

class CharList extends Component {
  state = {
    charItems: [],
    loading: true,
    error: false,
  }
  marvelService = new MarvelService()

  componentDidMount() {
    this.updateAllChar()
  }

  componentWillUnmount() {
    clearInterval(300)
  }

  onCharItemsLoaded = (charItems) => {
    this.setState({ charItems, loading: false })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    })
  }
  updateAllChar = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharItemsLoaded)
      .catch(this.onError)
  }
  render() {
    const { onCharSelected } = this.props
    const { error, loading } = this.state

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error)
      ? this.state.charItems.map(({ thumbnail, name, id }) => (
          <CharItem
            thumbnail={thumbnail}
            name={name}
            key={id}
            id={id}
            onCharSelected={onCharSelected}
          />
        ))
      : null

    return (
      <div className="char__list">
        {spinner}
        <ul className="char__grid">
          {errorMessage}
          {content}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

export default CharList
