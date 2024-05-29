import React, { useEffect, useState } from 'react'
import axios from 'axios'

import playButton from '../assets/playButton.svg'

const Content = ({ searchValue }) => {
	const [data, setData] = useState({})
	const [isFetching, setIsFetching] = useState(true)
	let buttonRendered = false

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`)
				setData(response.data)
				setIsFetching(false)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [searchValue])

	const playAudio = (url) => {
		const audio = new Audio(url)
		audio.play()
	}

	return (
		<div className='content-container'>
			{!isFetching && (
				<>
					<div className='top'>
						<div className='left'>
							<div className='search-word'>{data[0].word}</div>
							<div className='phonetic'>{data[0].phonetic}</div>
						</div>
						{data[0].phonetics.map((phonetic) => {
							if (!buttonRendered && phonetic.audio) {
								buttonRendered = true
								return (
									<>
										<button
											key={phonetic.text}
											onClick={() => playAudio(phonetic.audio)}
											className='button-phonetic'
										>
											<img
												src={playButton}
												alt='play'
											/>
										</button>
									</>
								)
							}
						})}
					</div>
					{data[0].meanings.map((meaning) => (
						<ul key={meaning.partOfSpeech}>
							<div>
								<span className='speech-part'>{meaning.partOfSpeech}</span>
								<div className='meaning-title'>Meaning</div>
							</div>
							{meaning.definitions.map((definition) => (
								<>
									<li key={definition.definition}>{definition.definition}</li>
									{definition.example ? <p className='example'>{` "${definition.example}"`}</p> : null}
								</>
							))}
							{meaning.synonyms.length > 0 && (
								<div className='syn-ant-div'>
									<span className='syn-ant'>Synonyms</span>
									<span className='syn-ant-value'>{meaning.synonyms.join(', ')}</span>
								</div>
							)}
							{meaning.antonyms.length > 0 && (
								<div className='syn-ant-div'>
									<span className='syn-ant'>Antonyms:</span>
									<span className='syn-ant-value'>{meaning.antonyms.join(', ')}</span>
								</div>
							)}
						</ul>
					))}
				</>
			)}
		</div>
	)
}

export default Content
