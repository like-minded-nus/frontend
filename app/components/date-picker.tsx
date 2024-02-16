import { useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';

interface DateProps {
  setDate: (date: Date) => void;
}
const options = {
  title: '',
  autoHide: true,
  todayBtn: false,
  clearBtn: false,
  clearBtnText: 'Clear',
  maxDate: new Date('2030-01-01'),
  minDate: new Date('1950-01-01'),
  theme: {
    background: '',
    todayBtn: '',
    clearBtn: '',
    icons: '',
    text: '',
    disabledText: '',
    input: '',
    inputIcon: '',
    selected: 'bg-gray-700',
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <GrLinkPrevious />,
    next: () => <GrLinkNext />,
  },
  datepickerClassNames: 'top-12',
  defaultDate: new Date(),
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

const DatePicker: React.FC<DateProps> = ({ setDate }) => {
  const [show, setShow] = useState(false);

  const handleChange = (selectedDate: Date) => {
    console.log(selectedDate);
    setDate(selectedDate);
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div>
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      />
    </div>
  );
};
export default DatePicker;
