import React, { useContext } from 'react'
import { darkThemeContext } from '../App'
import { selectedFontContext } from '../App'

import logoLight from '../assets/logoLight.svg'
import logoDark from '../assets/logoDark.svg'
import themeLight from '../assets/themeLight.svg'
import themeDark from '../assets/themeDark.svg'

const Navbar = () => {
	const { isDark, toggleDark } = useContext(darkThemeContext)
	const { selectedFont, handleFontChange } = useContext(selectedFontContext)
	return (
		<nav>
			<div className='logo'>{isDark ? <img src={logoDark} /> : <img src={logoLight} />}</div>
			<div className='settings'>
				<div className='font-toggle'>
					<div className='dropdown-container'>
						<select
							value={selectedFont}
							onChange={handleFontChange}
							className='font-dropdown'
						>
							<option value='Sans-serif'>Sans-serif</option>
							<option value='Serif'>Serif</option>
							<option value='Monospace'>Monospace</option>
						</select>
					</div>
				</div>
                <div className='vertical-line' />
				<div
					className='theme-toggle'
					onClick={toggleDark}
				>
					{isDark ? <img src={themeDark} /> : <img src={themeLight} />}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
