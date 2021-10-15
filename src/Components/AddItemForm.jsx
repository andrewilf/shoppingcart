import { useState } from 'react'

//regular expression
function validateName(name) {
    const re = /^[a-zA-Z][a-zA-Z0-9-_\s]{2,32}$/
    return re.test(String(name))
}

function validatePrice(enteredPrice) {
    const re = /^\d{0,8}(\.\d{1,4})?$/
    console.log(re.test(String(enteredPrice)))
    return re.test(String(enteredPrice))
}

function validateDesc(desc) {
    const re = /^[a-zA-Z][a-zA-Z0-9-_\s]{2,32}$/
    return re.test(String(desc));
}

export default function AddItemForm(props) {
    const [name, setName] = useState("name")
    const [price, setPrice] = useState("price in $")
    const [desc, setDesc] = useState("item description")

    const [isNameValid, setIsNameValid] = useState(true)
    const [isPriceValid, setIsPriceValid] = useState(true)
    const [isDescValid, setIsDescValid] = useState(true)

    const handleSubmit = () => {
        console.log("sent submit")
        let priceString = price
        // console.log(priceString.search("/."))
        // if (priceString.search(/./) === -1) {
        //     priceString += ".00"
        // } 
        if (isNameValid && validatePrice(price) && isDescValid) {
            props.handleSubmit({
                name: name,
                price: priceString,
                description: desc
            })
        }
        
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
        setIsNameValid(validateName(event.target.value))
    }

    const handlePriceChange = (event) => {
        let priceString = event.target.value
        setPrice(priceString)
        setIsPriceValid(validatePrice(priceString))

    }

    const handleDescChange = (event) => {
        setDesc(event.target.value)
        setIsDescValid(validateDesc(event.target.value))
    }


    return (
        <div className="form">
            {isNameValid ? <input name="itemName" value={name || ''} type='text' onChange={handleNameChange} /> :
                <input name="itemName" className="invalidField" value={name || ''} type='text' onChange={handleNameChange} />
            }
            {isPriceValid ? <input name="price" value={price || ''} type='text' onChange={handlePriceChange} /> :
                <input name="price" className="invalidField" value={price || ''} type='text' onChange={handlePriceChange} />
            }
            {isDescValid ? <input name="description" value={desc || ''} type='text' onChange={handleDescChange} /> :
                <input name="description" className="invalidField" value={desc || ''} type='text' onChange={handleDescChange} />
            }
            {isNameValid && isPriceValid && isDescValid ?
                <input type='submit' onClick={handleSubmit} /> :
                <input type='submit' disabled={true} value={"invalid" || ''} />
            }

        </div>
    )
}