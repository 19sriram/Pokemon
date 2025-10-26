import { debounce } from "lodash";
import { useEffect, useState } from "react"

function useCarDebounce<T>(value:T,delay:number=300){
    const [debouncedValue,setDebouncedValue] = useState<T>(value);
    useEffect(()=>{
        const handler = setTimeout(() => {
         setDebouncedValue(value);   
         return ()=> clearTimeout(handler);
    }, delay);
    },[value,delay]);
    return debouncedValue;
}

export default useCarDebounce;