import './warning.css'

const warning = ({message}) => {
    if (message) {
        return (
            <div className="warning">
                {message}
            </div>
        )
    }
    return null
}

export default warning