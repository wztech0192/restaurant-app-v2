import React, {useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Tooltip } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
// import { setEditCardInfo } from "../accountSlice";
import AddCircleIcon from '@material-ui/icons/AddCircle';

const CardList = ({ match, canEdit }) => {
	const dispatch = useDispatch();
	const cards = useSelector((state) => state.account.accountInfo.cards);
	const [ showRemoved, setShowRemoved ] = React.useState(false);
	const selectedID = useSelector((state) => state.account.selectedCard.id);

	const carryback = useMemo(
		() => ({
			match,
			dispatch,
			canEdit,
			selectedID
		}),
		[ match, dispatch, canEdit, selectedID ]
    );

    //Switch to setEditCardInfo
    // const handleToggleEdit = state => e => {
    //     dispatch(setEditCardInfo(state));
    // };

    console.log("test", cards, selectedID);


    return (
        <>
            <div>
                {cards.map((card, index) => {
                    return (
                        <div key={index}>
                            <Box component="div" display="inline">Card ending in {card.lastFourDigit}</Box>

                            {!canEdit && (
                                <Tooltip title="Edit">
                                    <IconButton
                                        // onClick={handleToggleEdit(cardInfo)}
                                        color="primary"
                                        size="small"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </div>
                    )
                })}
                <br />
                <Tooltip title="Add">
                    <IconButton
                        // onClick={handleToggleAdd(cardInfo)}
                        color="primary"
                        size="small"
                    >
                        <AddCircleIcon />
                    </IconButton>
                </Tooltip>
                Add new card
            </div>
        </>
    )
};

export default CardList;