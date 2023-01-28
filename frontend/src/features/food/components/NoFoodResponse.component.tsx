import { FC } from "react";
import { Grid, Column, Tile } from '@carbon/react';

const NoFoodResponseComponent: FC = () => {
    return (
        <Grid style={{ marginTop: "2em" }}>
            <Column lg={4} md={0} sm={0}></Column>
            <Column lg={8} md={8} sm={4}>
                <Tile>
                    <h3 style={{ fontWeight: 600 }}>Woah you must be a chef! 😅</h3>
                    <hr></hr>
                    <p>You just cooked a food that I'm unable to find.</p>
                    <p>Try searching for another food</p>
                </Tile>
            </Column>
            <Column lg={4} md={0} sm={0}></Column>
        </Grid>
    );
};

export default NoFoodResponseComponent;