/* eslint-disable no-unused-expressions */



import *  as mock from './mock';
const mockData1 = {
  name: "Ram",
  address: {
    city: "Berlin",
    postal: 12167,
    country: {
      name: "Germany",
      code: "DE",
    },
  },
};
//console.log(mock.flattenObj(mockData1));
//console.log(mock.reverseString());
console.log(mock.matchinParanthesis());
const PaginationComponent=()=>{
    const mockData = [1, [2, [3, 4]], 5];
    
    return (
        <div>
            {'paginationcomponents'}
        </div>
    )
}
export default PaginationComponent;