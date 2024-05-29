import React, { createContext, useState } from 'react'
import Navbar from './components/Navbar'
import Content from './components/Content'

import searchLight from './assets/searchLight.svg'
import searchDark from './assets/searchDark.svg'
import logoLight from './assets/logoLight.svg'
import logoDark from './assets/logoDark.svg'
import './styles.css'

export const darkThemeContext = createContext()
export const selectedFontContext = createContext()

const App = () => {
	const [search, setSearch] = useState('')
	const [isDark, setIsDark] = useState(false)
	const [selectedFont, setSelectedFont] = useState('sans-serif')
	const [tempSearch, setTempSearch] = useState('')

	const toggleDark = () => {
		setIsDark(!isDark)
	}

	const handleFontChange = (event) => {
		setSelectedFont(event.target.value)
	}

	const handleSearch = (event) => {
		event.preventDefault()
		setSearch(tempSearch)
	}

	return (
		<>
			<darkThemeContext.Provider value={{ isDark, toggleDark }}>
				<selectedFontContext.Provider value={{ selectedFont, handleFontChange }}>
					<div
						className='app'
						data-theme={isDark ? 'dark' : 'light'}
						style={{ fontFamily: selectedFont }}
					>
						<div className='container'>
							<Navbar />
							<form
								className='search-form'
								onSubmit={handleSearch}
							>
								<input
									type='text'
									className='search-bar'
									value={tempSearch}
									onChange={(event) => setTempSearch(event.target.value)}
								/>
								<button
									type='submit'
									className='search-logo'
								>
									<img src={isDark ? searchDark : searchLight} />
								</button>
							</form>
							{search ? (
								<Content searchValue={search} />
							) : (
								<div className='empty'>
									<div className='empty-logo'>{isDark ? <img src={logoDark} /> : <img src={logoLight} />}</div>
									<div className='empty-title'>Search Something</div>
								</div>
							)}
						</div>
					</div>
				</selectedFontContext.Provider>
			</darkThemeContext.Provider>
		</>
	)
}

export default App
