

const randomnumber = (maximum: number, minimum: number) => {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

export default randomnumber
