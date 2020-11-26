import { handleOpenModal } from "app/Indicator/indicatorSlice";
import { parseLocalStorageOrDefault } from "common";
import React from "react";
import { useDispatch } from "react-redux";

const TestingWarning = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (true) {
            const previousTime = parseLocalStorageOrDefault("testingWarning", 0);
            if ((new Date() - previousTime) / 60000 > 10) {
                dispatch(
                    handleOpenModal({
                        title: "Testing Enviroment Warning",
                        message:
                            "This is a testing environment so you can do whatever you want! Use fake testing credit card etc",
                        messages: [
                            "Manager account ph: 8032260689 pw: weijie0192",
                            "Customer account ph: 1111111111 pw: 123456"
                        ],
                        onConfirm: () => {
                            localStorage.setItem("testingWarning", new Date().getTime());
                        }
                    })
                );
            }
        }
    }, [dispatch]);
    return null;
};

export default TestingWarning;
