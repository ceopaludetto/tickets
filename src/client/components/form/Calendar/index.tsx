import React, { useState, useRef, useMemo } from 'react';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useClickAway, useLockBodyScroll } from 'react-use';
import {
  format,
  addMonths,
  subMonths,
  addDays,
  subDays,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  isBefore,
  setMonth,
  setYear,
  getYear,
  isSameYear,
  isAfter,
  parseISO,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Control, ControlProps } from '../Control';
import { IconButton } from '../IconButton';
import {
  Footer,
  Header,
  DayBody,
  MonthBody,
  WeekDay,
  Day,
  HeaderButton,
  WeekOrYearButton,
  YearBody,
} from './styles';

export interface CalendarProps
  extends Omit<ControlProps, 'onChange' | 'onBlur'> {
  disableBefore?: boolean;
  disableAfter?: boolean;
  minYear?: number;
  maxYear?: number;
  onChange?: (date: Date) => void;
  onBlur?: (e: KeyboardEvent) => void;
  initialValue?: Date;
}

export function Calendar({
  disableBefore = false,
  disableAfter = false,
  minYear = 1900,
  maxYear = getYear(new Date()),
  onChange,
  onBlur,
  initialValue,
  ...rest
}: CalendarProps) {
  const controlRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [date, setDate] = useState(
    (typeof initialValue === 'string'
      ? parseISO(initialValue)
      : initialValue) || new Date()
  );
  const [mode, setMode] = useState<'day' | 'month' | 'year'>('day');

  const formatted = useMemo(() => format(date, 'dd/MM/yyyy'), [date]);
  const currentMonth = useMemo(() => format(date, 'MMMM', { locale: ptBR }), [
    date,
  ]);
  const currentYear = useMemo(() => format(date, 'yyyy', { locale: ptBR }), [
    date,
  ]);
  const yesterday = useMemo(() => subDays(new Date(), 1), []);
  const today = useMemo(() => new Date(), []);

  useLockBodyScroll(isOpen);

  useClickAway(controlRef, e => {
    setOpen(false);
    if (onBlur) {
      onBlur(e);
    }
  });

  function addMonth() {
    setDate(addMonths(date, 1));
  }

  function subMonth() {
    setDate(subMonths(date, 1));
  }

  function handleDayClick(day: Date, cb?: () => void) {
    return () => {
      setDate(day);
      if (cb) {
        cb();
      }
      if (onChange) {
        onChange(day);
      }
    };
  }

  function handleMode(m: 'day' | 'month' | 'year') {
    return () => setMode(m);
  }

  function getWeekDay() {
    const days = [];
    const startDate = startOfWeek(date);

    for (let i = 0; i < 7; i += 1) {
      days.push(
        <WeekDay key={i}>
          {format(addDays(startDate, i), 'EEE', { locale: ptBR })}
        </WeekDay>
      );
    }

    return days;
  }

  function getCells() {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = [];
    let day = startDate;

    while (day <= endDate) {
      const formattedDate = format(day, 'd', { locale: ptBR });
      const cloneDay = day;

      days.push(
        <Day
          type="button"
          onClick={handleDayClick(cloneDay)}
          disabled={
            !isSameMonth(day, monthStart) ||
            (disableBefore && isBefore(day, yesterday)) ||
            (disableAfter && isAfter(day, today))
          }
          className={isSameDay(day, date) ? 'active' : ''}
          key={day.toISOString()}
        >
          {formattedDate}
        </Day>
      );

      day = addDays(day, 1);
    }

    return days;
  }

  function getMonths() {
    const months = [];
    const cloneDay = date;
    for (let i = 0; i < 12; i += 1) {
      const month = setMonth(cloneDay, i);
      const monthFormatted = format(month, 'MMM', { locale: ptBR });

      months.push(
        <WeekOrYearButton
          type="button"
          key={month.toISOString()}
          disabled={
            (disableBefore && isBefore(month, yesterday)) ||
            (disableAfter && isAfter(month, today))
          }
          onClick={handleDayClick(month, () => setMode('day'))}
          className={isSameMonth(date, month) ? 'active' : ''}
        >
          {monthFormatted}
        </WeekOrYearButton>
      );
    }

    return months;
  }

  function getYears() {
    const years = [];
    const cloneDay = date;
    for (let i = minYear; i <= maxYear; i += 1) {
      const year = setYear(cloneDay, i);
      const monthFormatted = format(year, 'yyyy', { locale: ptBR });

      years.push(
        <WeekOrYearButton
          type="button"
          key={year.toISOString()}
          disabled={
            (disableBefore && isBefore(year, yesterday)) ||
            (disableAfter && isAfter(year, today))
          }
          onClick={handleDayClick(year, () => setMode('day'))}
          className={isSameYear(date, year) ? 'active' : ''}
        >
          {monthFormatted}
        </WeekOrYearButton>
      );
    }

    return years;
  }

  return (
    <>
      <Control
        onFocus={() => setOpen(true)}
        prepend={<FiCalendar />}
        value={formatted}
        readOnly
        footer={
          <Footer
            ref={controlRef}
            style={{ display: isOpen ? 'block' : 'none' }}
          >
            <Header>
              <IconButton
                disabled={
                  disableBefore && isBefore(subMonths(date, 1), yesterday)
                }
                onClick={subMonth}
                type="button"
              >
                <FiChevronLeft />
              </IconButton>
              <span>
                <HeaderButton
                  className={mode === 'month' ? 'active' : ''}
                  onClick={
                    mode === 'month' ? handleMode('day') : handleMode('month')
                  }
                  type="button"
                >
                  {currentMonth}
                </HeaderButton>{' '}
                <HeaderButton
                  className={mode === 'year' ? 'active' : ''}
                  onClick={
                    mode === 'year' ? handleMode('day') : handleMode('year')
                  }
                  type="button"
                >
                  {currentYear}
                </HeaderButton>
              </span>
              <IconButton
                disabled={disableAfter && isAfter(date, yesterday)}
                onClick={addMonth}
                type="button"
              >
                <FiChevronRight />
              </IconButton>
            </Header>
            {mode === 'day' && (
              <DayBody>
                {getWeekDay()}
                {getCells()}
              </DayBody>
            )}
            {mode === 'month' && <MonthBody>{getMonths()}</MonthBody>}
            {mode === 'year' && <YearBody>{getYears()}</YearBody>}
          </Footer>
        }
        {...rest}
      />
    </>
  );
}
