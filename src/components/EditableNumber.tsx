import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface EditableNumberProps {
  number: number;
  fontSize: string;
  label: string;
  bold?: boolean;
  onChange: (...args: any[]) => any;
  defaultValue: number;
}

function EditableNumber({
  number,
  label,
  fontSize,
  bold,
  onChange,
  defaultValue,
}: EditableNumberProps) {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = Number(e.target.value);
    onChange(newNumber || defaultValue);
  };

  return (
    <TextField
      value={number}
      label={label}
      type="number"
      defaultValue={defaultValue}
      onChange={handleNumberChange}
      InputProps={{ inputProps: { min: 0, required: true } }}
      sx={{
        border: 'none',
        borderRadius: 0,
        fontSize: fontSize,
        fontWeight: bold ? 'bold' : '',
      }}
    />
  );
}

export default EditableNumber;
