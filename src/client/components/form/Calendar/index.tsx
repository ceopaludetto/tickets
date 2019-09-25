import React, { useState, useRef, useMemo, useCallback } from 'react';
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
  subYears,
  addYears,
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
  const [mode, setMode] = useState<'day' | 'month' | 'year' | 'yearrange'>(
    'day'
  );

  const today = useMemo(() => new Date(), []);
  const yesterday = useMemo(() => subDays(today, 1), [today]);

  const flatten = useCallback((currentDate: Date, amount = 10) => {
    let cloneDate = currentDate;

    while (getYear(cloneDate) % amount !== 0) {
      cloneDate = subYears(cloneDate, 1);
    }

    return cloneDate;
  }, []);

  const currentYear = useMemo(() => getYear(date), [date]);

  const currentFormatted = useMemo(() => format(date, 'dd/MM/yyyy'), [date]);
  const currentFormattedMonth = useMemo(
    () => format(date, 'MMMM', { locale: ptBR }),
    [date]
  );
  const currentFormattedYearRange = useMemo(() => {
    const flattedDate = flatten(date);

    return `${getYear(flattedDate)}-${getYear(addYears(flattedDate, 9))}`;
  }, [date]);
  const currentFormattedYear = useMemo(
    () => format(date, 'yyyy', { locale: ptBR }),
    [date]
  );

  useLockBodyScroll(isOpen);

  useClickAway(controlRef, e => {
    setOpen(false);
    if (onBlur) {
      onBlur(e);
    }
  });

  function setIf(
    type: 'add' | 'sub',
    fnAdd: (d: Date, v: number) => Date,
    fnSub: (d: Date, v: number) => Date,
    amount: number,
    verify = true
  ) {
    let cloneAmount = amount;
    if (verify) {
      if (type === 'add' && currentYear + amount > maxYear) {
        cloneAmount = maxYear - currentYear;
      }

      if (type === 'sub' && currentYear - amount < minYear) {
        cloneAmount = currentYear - minYear;
      }
    }

    if (type === 'add') {
      setDate(fnAdd(date, cloneAmount));
    } else {
      setDate(fnSub(date, cloneAmount));
    }
  }

  function handleArrow(type: 'add' | 'sub') {
    if (mode === 'month') {
      return () => setIf(type, addYears, subYears, 1);
    }

    if (mode === 'year') {
      return () => setIf(type, addYears, subYears, 10);
    }

    if (mode === 'yearrange') {
      return () => setIf(type, addYears, subYears, 100);
    }

    return () => setIf(type, addMonths, subMonths, 1, false);
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
      setOpen(false);
    };
  }

  function handleMode(m: 'day' | 'month' | 'year' | 'yearrange') {
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
    const flatted = flatten(cloneDay);
    const startYear = getYear(flatted);

    for (let i = startYear - 1; i < startYear + 11; i += 1) {
      const year = setYear(flatted, i);
      const numberYear = getYear(year);
      const yearFormatted = format(year, 'yyyy', { locale: ptBR });

      years.push(
        <WeekOrYearButton
          type="button"
          key={year.toISOString()}
          disabled={numberYear < startYear || numberYear > startYear + 9}
          onClick={handleDayClick(year, () => setMode('month'))}
          className={isSameYear(date, year) ? 'active' : ''}
        >
          {yearFormatted}
        </WeekOrYearButton>
      );
    }

    return years;
  }

  function getRangeYears() {
    const years = [];
    const cloneDay = date;
    const flatted = flatten(cloneDay, 100);
    const startYear = getYear(flatted);

    for (let i = startYear; i < startYear + 111; i += 10) {
      const year = setYear(flatted, i);
      const numberYear = getYear(year);
      const yearFormatted = `${i}-${i + 9}`;

      years.push(
        <WeekOrYearButton
          type="button"
          key={year.toISOString()}
          disabled={numberYear < minYear || numberYear > maxYear}
          onClick={handleDayClick(year, () => setMode('year'))}
          className={currentYear >= i && currentYear <= i + 9 ? 'active' : ''}
        >
          {yearFormatted}
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
        value={currentFormatted}
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
                onClick={handleArrow('sub')}
                type="button"
              >
                <FiChevronLeft />
              </IconButton>
              <span>
                {mode === 'day' && (
                  <HeaderButton onClick={handleMode('month')} type="button">
                    {currentFormattedMonth}
                  </HeaderButton>
                )}{' '}
                <HeaderButton
                  className={mode === 'year' ? 'active' : ''}
                  disabled={mode === 'yearrange'}
                  onClick={
                    mode !== 'year'
                      ? handleMode('year')
                      : handleMode('yearrange')
                  }
                  type="button"
                >
                  {mode !== 'year' && mode !== 'yearrange'
                    ? currentFormattedYear
                    : currentFormattedYearRange}
                </HeaderButton>
              </span>
              <IconButton
                disabled={disableAfter && isAfter(date, yesterday)}
                onClick={handleArrow('add')}
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
            {mode === 'year' && <MonthBody>{getYears()}</MonthBody>}
            {mode === 'yearrange' && <MonthBody>{getRangeYears()}</MonthBody>}
          </Footer>
        }
        {...rest}
      />
    </>
  );
}
