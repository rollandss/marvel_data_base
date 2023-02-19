import './charInfo.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useMarvelService from '../../services/MarvelService'

import Spinner from '../spinner/spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'

const CharInfo = (props) => {
  const [char, setChar] = useState(null)

  const { loading, error, getCharacter, clearError } = useMarvelService()

  useEffect(() => {
    const updateChar = () => {
      const { charId } = props
      if (!charId) {
        return
      }

      clearError()
      getCharacter(charId).then(onCharLoaded)
    }
    updateChar() // eslint-disable-next-line
  }, [props.charId])

  const onCharLoaded = (char) => {
    setChar(char)
  }

  const skeleton = char || loading || error ? null : <Skeleton />
  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading ? <Spinner /> : null
  const content = !(loading || error || !char) ? <View char={char} /> : null

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  )
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There is no comics this character'}
        {
          // eslint-disable-next-line
          comics.map((item, i) => {
            if (i > 9)
              return (
                <Link
                  to={`/comics/${item.resourceURI.split('comics/')[1]}`}
                  key={item.resourceURI.split('comics/')[1]}
                  className="char__comics-item"
                >
                  {item.name}
                </Link>
              )
          })
        }
      </ul>
    </>
  )
}

export default CharInfo
