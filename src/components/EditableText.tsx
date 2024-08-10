import { TextField } from '@mui/material';
import { useState } from 'react';
interface EditableTextProps {
  text: string;
  fontSize: string;
  bold?: boolean;
  autoFocus?: boolean;
  onChange: (...args: any[]) => any;
  defaultValue: string;
}

function EditableText({
  text,
  fontSize,
  defaultValue,
  bold,
  autoFocus = false,
  onChange,
}: EditableTextProps) {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    onChange(newText || '');
  };

  return (
    <TextField
      value={text}
      onChange={handleTextChange}
      autoFocus={autoFocus}
      defaultValue={defaultValue}
      fullWidth
      multiline
      variant="standard"
      sx={{
        border: 'none',
        borderRadius: 0,
        '& .MuiOutlinedInput-root': {
          border: 'none',
          borderRadius: 0,
          '&:hover': {},
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 'none',
            borderBottom: '2px #000 solid',
            padding: 0,
          },
        },
        '& .MuiInputBase-root': {
          fontSize: fontSize,
          fontWeight: bold ? 700 : undefined,
          padding: 0,
          '&:focus': {
            outline: 'none',
          },
        },
        '& .MuiOutlinedInput-input': {
          padding: 0,
        },
      }}
    />
  );
}

export default EditableText;
