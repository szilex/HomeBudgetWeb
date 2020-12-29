import NumberFormat from 'react-number-format'

function NumberFormatFloat(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              name: props.name,
              value: values.value
            }
          });
        }}
      />
    );
  }

 export function NumberFormatInt(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              name: props.name,
              value: values.value
            }
          });
        }}
        decimalSeparator=""
      />
    );
  }

  export default NumberFormatFloat;