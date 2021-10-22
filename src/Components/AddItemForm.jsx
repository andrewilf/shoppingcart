import { useReducer } from 'react'

//regular expression
function validateName(name) {
    const re = /^[a-zA-Z][a-zA-Z0-9-_\s]{2,32}$/
    return re.test(String(name))
}

function validatePrice(enteredPrice) {
    const re = /^\d{0,8}(\.\d{1,4})?$/
    return re.test(String(enteredPrice))
}

function validateDesc(desc) {
    const re = /^[a-zA-Z][a-zA-Z0-9-_\s]{2,32}$/
    return re.test(String(desc));
}

export default function AddItemForm(props) {

    const itemReducer = (state, action) => {
        switch (action.type) {
            case "NAME":
                return {
                    ...state,
                    name: action.value,
                    nameValid: validateName(action.value)
                }
            case "PRICE":
                return {
                    ...state,
                    price: action.value,
                    priceValid: validatePrice(action.value)
                }
            case "DESC":
                return {
                    ...state,
                    desc: action.value,
                    descValid: validateDesc(action.value)
                }
            default:
                return state
        }
    }


    const [entry, dispatchItem] = useReducer(itemReducer, {
        name: "name",
        nameValid: true,
        price: "price in $",
        priceValid: true,
        desc: "item description",
        descValid: true
    })
    //const [valid, dispatchValid] = useReducer()

    const handleSubmit = () => {
        console.log("sent submit")
        dispatchItem({ type: "NAME", value: entry.name })
        dispatchItem({ type: "PRICE", value: entry.price })
        dispatchItem({ type: "DESC", value: entry.desc })
        if ((validateName(entry.name) && validatePrice(entry.price) && validateDesc(entry.desc))) {
            props.handleSubmit({
                type: "ADD", value: {
                    name: entry.name,
                    price: entry.price,
                    description: entry.desc
                }
            })
        }
    }

    const handleNameChange = (event) => {
        dispatchItem({ type: "NAME", value: event.target.value })
        //setName(event.target.value)
        //setIsNameValid(validateName(event.target.value))
    }

    const handlePriceChange = (event) => {
        dispatchItem({ type: "PRICE", value: event.target.value })

    }

    const handleDescChange = (event) => {
        dispatchItem({ type: "DESC", value: event.target.value })
    }


    return (
        <div className="form">
            {entry.nameValid ? <input name="itemName" value={entry.name || ''} type='text' onChange={handleNameChange} /> :
                <input name="itemName" className="invalidField" value={entry.name || ''} type='text' onChange={handleNameChange} />
            }
            {entry.priceValid ? <input name="price" value={entry.price || ''} type='text' onChange={handlePriceChange} /> :
                <input name="price" className="invalidField" value={entry.price || ''} type='text' onChange={handlePriceChange} />
            }
            {entry.descValid ? <input name="description" value={entry.desc || ''} type='text' onChange={handleDescChange} /> :
                <input name="description" className="invalidField" value={entry.desc || ''} type='text' onChange={handleDescChange} />
            }
            <input type='submit' onClick={handleSubmit} disabled={!(entry.nameValid && entry.priceValid && entry.descValid)} />

        </div>
    )
}