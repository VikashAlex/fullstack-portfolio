import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

function LayoutWrapper({children}) {
    return (
        <>
            <Header />
            <div className="md:h-[75vh] md:overflow-hidden bg-white relative">
                <div  className={`md:hidden  w-[100%] h-[100%] bg-white fixed duration-300 transition-all top-0 `}><Sidebar /></div>
                <div className="md:flex h-full">
                    <div className="h-full md:block hidden"><Sidebar /></div>
                    <div className="w-full overflow-y-auto">{children}</div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LayoutWrapper