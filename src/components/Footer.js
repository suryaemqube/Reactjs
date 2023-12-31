import React from 'react'

function Footer() {
    return (
        <footer className='page-footer'>
            <p>
                &copy; {new Date().getFullYear()}
                <span>SimplyRecipes</span>Build with{" "}
                <a href='https://www.gatsbyjs.com'>Gatsby</a>
            </p>
        </footer>
    )
}

export default Footer