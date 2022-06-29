export function InputLabel(props) {
    const { label, type, onChange, value } = props;
    let labelLow = label.toLowerCase();
    let val = labelLow === "company"
        ? value[labelLow]["name"]
        : labelLow === "address" ? value[labelLow]["street"] :
            value[labelLow];

    return (
        <div class="mb-3 w-48">
            <label for="exampleFormControlInput1" className="form-label">{label}</label>
            <input
                type={type}
                onChange={onChange}
                name={labelLow}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder={label}
                value={val}
            />
        </div>
    );
}

export function InputGroupLabel(props) {
    const { label, type, onChange, value } = props;
    let labelLow = label.toLowerCase();
    return (
        <div className="input-group mb-3 w-48">
            <span className="input-group-text">{label}</span>
            <input
                type={type}
                onChange={onChange}
                name={labelLow}
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={value[labelLow]}
            />
        </div>
    );
}