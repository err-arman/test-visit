import { Loader, createStyles } from '@mantine/core';
import React from 'react'
type Props = {}



const PageLoading = (props: Props) => {
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <Loader />
        </div>
    )
}


const useStyles = createStyles((theme, _params, getRef) => {
    return ({
        root: {
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }
    })
});

export default PageLoading