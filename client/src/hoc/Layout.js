import React from 'react'

export  const Layout = ({children, auth}) => {

    const cls = ['layout']
    if (!auth) {
        cls.push('dark')
    }

    return (
        <div className={cls.join(' ')}>{children}</div>
    )
}
