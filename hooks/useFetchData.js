import axios from 'axios';
import { useState, useEffect } from 'react';



function useFetchData(apiEndpoint){
    const [alldata, setAlldata ] = useState([]);
    const [loading, setLoading ] = useState(true);
    const [initialLoad, setInitialLoad ] = useState(true);



    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
            setLoading(false);
            return;
        }

        setLoading(true);


        const fethAllData = async () => {
            try {
                const res = await axios.get(apiEndpoint);
                const alldata = res.data;
                setAlldata(alldata);
                setLoading(false)
            } catch (error) {
                setLoading(false);

            }
        }
        //fetch blog data only if category exists

        if (apiEndpoint) {
            fethAllData()
        }
    }, [initialLoad, apiEndpoint]); // depends on initial load and apiendpoint to trigger api call

    return {alldata, loading}

}


export default useFetchData;