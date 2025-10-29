import { useRef } from "react";

const TaskComponent = () => {
    const mockCalendarData = [[[8, 22]], [[1, 2], [2, 4], [1, 3]]];
   function getConflict(intervals) {
  for (const time of intervals) {
    const sorted = time.sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < sorted.length - 1; i++) {
      const [start1, end1] = sorted[i];
      const [start2, end2] = sorted[i + 1];
      if (end1 > start2) console.log('Conflict:', sorted[i], sorted[i + 1]);
    }
  }
}

// function debounce(func, timeout = 200) {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => func.apply(this, args), timeout);
//   };
// }
// const deboucneNow = debounce(()=>console.log('now'),2000);
// const saveTime = (e)=>{
//     console.log('new', new Date());
    
//     deboucneNow();
// }

function debounce(func,timeOut=2000) {
    let timer;
    return (...args)=>{
        clearTimeout(timer);
        timer = setTimeout(() => {func(...args)}, timeOut);
}
}

function debounce_leading (func,timeOut=2000){
    let timer;
    return(...args)=>{
        if(!timer) {
            func(...args)
        }
        timer = setTimeout(() => {
            timer = undefined
        }, timeOut);
    }
}
const saveTime = ()=>console.log('saving',new Date());
const debouncedSave = useRef(
    debounce(saveTime, 2000)
  ).current;


    //console.log(getConflict(mockCalendarData));
    
    return (
        <div>
            Task
            <button type="submit" onClick={(e)=>debouncedSave(e)}>asd</button>
        </div>
    )
}

export default TaskComponent;