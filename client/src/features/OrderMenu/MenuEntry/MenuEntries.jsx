import React from "react";
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Fade
} from "@material-ui/core";
import useStyles from "../useStyles";
import mainFrameImage from "assets/mainFrame.png";
import { handleSelectEntryName } from "../slices/orderSlice";
import { useDispatch } from "react-redux";
import MenuEntryTitle from "./MenuEntryTitle";

const MenuEntries = ({ menu }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const menuEntries = menu.menuEntries;

    return (
        <Fade in>
            <Grid container spacing={2}>
                {menuEntries.map(menuEntry => {
                    return (
                        <Grid key={menuEntry.name} item md={6} xs={12}>
                            <Card>
                                <CardActionArea
                                    onClick={dispatch(handleSelectEntryName(menuEntry.name))}
                                >
                                    {false && ( //todo: add image?
                                        <CardMedia
                                            className={classes.media}
                                            image={mainFrameImage}
                                            title="Contemplative Reptile"
                                        />
                                    )}
                                    <CardContent>
                                        <MenuEntryTitle menuEntry={menuEntry} />
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {menuEntry.summary}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Fade>
    );
};

export default MenuEntries;
