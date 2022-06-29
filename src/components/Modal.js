import { useState, useRef } from "react";
import { InputLabel, InputGroupLabel } from "./InputsModal";
import { addUser, updateUser } from "./List/Resquest_handler";
const flex_style = "w-100 d-flex justify-content-between";

const valuesForm = {
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: { street: "" },
    company: { name: "" }
}

export default function ModalComp(props) {

    const { status, changeStatus, values, setEmployee, initialVal } = props;
    const [inputValues, setInputValues] = useState(values === null ? valuesForm : values);
    const backShadowRef = useRef(null);
    const modalRef = useRef(null);

    const sendValues = () => {
        if (status.state === 1) {
            addUser(setEmployee, inputValues, initialVal, closeModal);
        } else if (status.state === 2) {
            updateUser(setEmployee, inputValues, initialVal, closeModal);
        }
    }

    const closeModal = () => {
        modalRef.current.classList.add("modal_board_close");
        backShadowRef.current.classList.add("backShadowClose");
        setTimeout(() => {
            modalRef.current.classList.remove("modal_board_close")
            backShadowRef.current.classList.remove("backShadowClose");
            changeStatus(e => ({ ...e, state: 0 }));
        }, 200)
    }

    const handleChange = element => {
        let name = element.target.name;
        let value = element.target.value;
        if (name === "company") {
            value = { name: value }
        } if (name === "address") {
            value = { street: value }
        } if (name === "phone" && isNaN(value.replace(/[x)(\s\-]/g, ""))) {
            value = inputValues.phone;
        }
        setInputValues((initalValues) => ({
            ...initalValues, [name]: value
        }));
    }


    return (
        <>
            <div
                onClick={() => closeModal()}
                className="backShadow"
                ref={backShadowRef}
            ></div>
            <div
                ref={modalRef}
                className="center-absolute modal_board w-50 bg-light rounded-3 p-5">
                <p className="display-6">
                    {
                        status.state === 1
                        && <h1>Add new User</h1>
                    }
                </p>
                <hr />
                <div className={flex_style}>
                    <InputLabel value={inputValues} onChange={handleChange} type="text" label="Name" />
                    <InputLabel value={inputValues} onChange={handleChange} type="text" label="Username" />
                </div>
                <div className={flex_style}>
                    <InputLabel value={inputValues} onChange={handleChange} type="text" label="Address" />
                    <InputLabel value={inputValues} onChange={handleChange} type="text" label="Company" />
                </div>
                <div className={flex_style}>
                    <InputLabel value={inputValues} onChange={handleChange} type="text" label="Email" />
                    <InputLabel value={inputValues} onChange={handleChange} type="text" label="Website" />
                </div>
                <div className={flex_style}>
                    <InputGroupLabel value={inputValues} onChange={handleChange} type="text" label="Phone" />
                </div>
                <div className={flex_style}>
                    <button onClick={() => sendValues()} className="btn btn-primary w-48">Save</button>
                    <button onClick={() => closeModal()} className="btn btn-danger w-48">Cancel</button>
                </div>
            </div>
        </>
    );
}