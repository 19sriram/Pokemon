import { useEffect, useRef, useState } from "react";
import { brands, cars, sections } from "./__mocks__/cars";
import useCarDebounce from "./hooks/useCarDebounce";
import AccordionItem from "./accordion/accordionItem";

const FormWrapper = () => {
    const [name, setName] = useState('');
    const [selectCar,setSelectCar] = useState('');
    const [carList, setCarList] = useState(cars);
    const debouncedValue = useCarDebounce(selectCar || '');
    const accordionRef = useRef<HTMLHeadingElement>(null);
    // const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const formData = Object.fromEntries(new FormData(e.currentTarget));
    //     setName(formData.name.toString());
    // }
    const changeHandler=(e:React.FormEvent<HTMLInputElement>)=>{
        setSelectCar(e.currentTarget.value)
    }
    const accordionHandler = (id:number,e:React.FormEvent<HTMLHeadElement>)=> {
        console.log(id,e.currentTarget.className);
    }
  const numberofCars = cars.reduce<Record<string,number>>((count,car:{brand:string})=>{
    const brand  = car.brand;
    count[brand] = (count[brand]||0)+1;
    return count;
  },{})
    console.log(numberofCars);
    useEffect(()=>{
            console.log('debouncedValue',debouncedValue.toLowerCase());
            setCarList(debouncedValue.length>0 ? cars.filter(car => (car.brand).toLowerCase().includes(debouncedValue)):cars);
    },[debouncedValue,selectCar])
 
    return (
        <>
          <div className="accordion">
      <AccordionItem title="Section 1" content={<p>Content 1</p>} />
      <AccordionItem title="Section 2" content={<p>Content 2</p>} />
      <AccordionItem title="Section 3" content={<p>Content 3</p>} />
    </div>
            {/* <div>
            <form onSubmit={onSubmit}>
            <input type="text" name="name"/>
            <input type="text" name="age"/>

            <button type="submit">ok</button>
            </form>
        </div> */}
            <div>
                <input type="text" name="cars" onChange={(e)=>changeHandler(e)} />
                <ul>
                    {carList.map((item, index) => (
                            <li key={index}>
                                {`${item.model} ${item.brand}`}
                            </li>
                    ))}
                </ul>
            </div>
            <div>
                {
                    sections.map((item,index)=>(
                        <h2 className={index===0?'expanded':'collapsed'} onClick={(e)=>accordionHandler(index,e)} ref={accordionRef}>
                            {item.title}
                        </h2>
                    ))
                }
            </div>
        </>
    )
}

export default FormWrapper;