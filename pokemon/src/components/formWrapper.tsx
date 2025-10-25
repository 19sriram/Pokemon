import { useState } from "react";

const FormWrapper = ()=>{
    const [name,setName] = useState('');
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget));
        setName(formData.name.toString());
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
            <input type="text" name="name"/>
            <input type="text" name="age"/>

            <button type="submit">ok</button>
            </form>
        </div>
    )
}

export default FormWrapper;