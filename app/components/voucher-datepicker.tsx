import { useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';

const options = {
  title: 'Expiry Date',
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: 'Clear',
  maxDate: new Date('2030-01-01'),
  minDate: new Date('1950-01-01'),
  theme: {
    background: '',
    todayBtn: '',
    clearBtn: '',
    icons: '',
    text: '',
    disabledText: 'text-gray-200',
    input: '',
    inputIcon: '',
    selected: '',
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: 'top-12',
  defaultDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  language: 'en',
  disabledDates: [],
  weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  inputNameProp: 'date',
  inputIdProp: 'date',
  inputPlaceholderProp: 'Select Date',
  inputDateFormatProp: {
    dateStyle: 'long' as 'long',
  },
};

const VoucherDatepicker = ({
  onChange,
}: {
  onChange: (selectedDate: Date) => void;
}) => {
  const [show, setShow] = useState(false);
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div>
      <Datepicker
        options={options}
        onChange={(date: Date) => {
          onChange(date);
        }}
        show={show}
        setShow={handleClose}
      />
    </div>
  );
};
export default VoucherDatepicker;
