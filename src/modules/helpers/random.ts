

const randomnumber = (maximum: number, minimum: number) => {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}


export const users = () => {
    return [
        {
            "age": 20,
            "email": "Jayne.Mitchell48@yahoo.com",
            "firstName": "Rickie",
            "id": "123",
            "lastName": "Legros",
            "username": "Rickie Legros",
        },
        {
            "age": 21,
            "email": "Jayne.Mitchell48@yahoo.com",
            "firstName": "Rickie",
            "id": "123",
            "lastName": "Legros",
            "username": "Rickie Legros",
        }
    ]
}

export default randomnumber
