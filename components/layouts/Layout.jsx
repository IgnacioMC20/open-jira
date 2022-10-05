import { Box } from '@mui/system'
import Head from 'next/head'
import React from 'react'
import { Navbar, Sidebar } from '../ui'

export const Layout = ({ title = 'OpenJira', children }) => {
    return (
        <Box sx={{ flexFlow: 1 }}>
            <Head>
                <title>{title}</title>
            </Head>

            <Navbar />
            <Sidebar />

            <Box sx={{ padding: '40px 6 0px' }}>
                { children }
            </Box>
        </Box>
    )
}
