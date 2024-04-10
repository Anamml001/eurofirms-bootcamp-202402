function ColorButton(props) {
    function handleClick() {
        console.debug('colorButton handleClick')

        props.onClick()
    }

    console.debug('ColorButton render')

    return <button
        className={`color-button ${props.selected ? 'color-button-selected' : ''}`}
        style={{ backgroundColor: props.color }}
        onClick={() => handleClick()}
    />

}