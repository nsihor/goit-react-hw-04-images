import { Grid } from  'react-loader-spinner'

export const Loader = () =>     
<Grid
    height="80"
    width="80"
    color= 'blue'
    ariaLabel="grid-loading"
    radius="12.5"
    wrapperStyle={{position: 'fixed', top: '100px', left: '50%', transform: "translateX(-50%)"}}
    wrapperClass=""
    // visible={true}
/>