import { createContext, useState } from "react";

export const HeaderContext = React.createContext()

export default function HeaderMain() {
    const [openDate, setOpenDate] = useState(false);
    const [openOpt, setOpenOpt] = useState(false);

    const changeStateDate = () => {
        if (openOpt === false) {
            setOpenDate(!openDate)
        }
        else {
            setOpenOpt(!openOpt);
            setOpenDate(!openDate)
        }
    }
    const changeStateOpt = () => {
        if (openDate === false) {
            setOpenOpt(!openOpt)
        }
        else {
            setOpenDate(!openDate);
            setOpenOpt(!openOpt);
        }
    }
    const closeDateOpt = () => {
        if (openDate) setOpenDate(!openDate);
        else if (openOpt) setOpenOpt(!openOpt);
        else return;
    }
}


export const HeaderContextProvider = ({ children }) => {
    return (
        <HeaderContext.Provider>
            {children}
        </HeaderContext.Provider>
    )
}