import { Discuss } from "react-loader-spinner";

export const Loader = () => {
    return (
        <Discuss
        visible={true}
        height="80"
        width="80"
        ariaLabel="discuss-loading"
        wrapperStyle={{}}
        wrapperClass="discuss-wrapper"
        color="#fff"
        backgroundColor="#F4442E"
        margin="auto"
        display="flex"
        justifyContent="center" 
        alignSelf="center"/>
    )
}