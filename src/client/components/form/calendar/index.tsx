import React, { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { useMeasure, useMedia } from 'react-use';

import clsx from 'clsx';
import {
  format,
  addDays,
  addMonths,
  subMonths,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isSameDay,
  isSameMonth,
  isSameYear,
  isAfter,
  isBefore,
  setYear,
  setHours,
  getYear,
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import produce from 'immer';
import { ArrowBack, ArrowForward } from 'mdi-norm';

import { Button } from '@/client/components/form/button';
import { IconButton } from '@/client/components/form/iconbutton';
import { Flex, Grid, GridItem } from '@/client/components/layout';
import u from '@/client/scss/utils.scss';

import s from './calendar.scss';
import { Container, NoPaddingButton, ShowingDate, Week } from './styles';

interface CalendarProps extends Omit<HTMLMotionProps<'div'>, 'onChange' | 'onSubmit'> {
  float?: boolean;
  value?: Date;
  showButtons?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (v: Date) => void;
  onCancel?: (e: React.MouseEvent) => void;
  onSubmit?: (d: Date, e: React.MouseEvent) => void;
  onPageChange?: (d: Date, isPreviousAfter: boolean, e: React.MouseEvent) => void;
}

const animationVariants = {
  animate: {
    x: '0%',
    opacity: 1,
    transition: { duration: 0.2, ease: [0.35, 0.8, 0.4, 1] },
  },
  initial: (isPreviousAfter: boolean) => ({
    opacity: 0,
    x: isPreviousAfter ? '-10%' : '10%',
  }),
  exit: (isPreviousAfter: boolean) => ({
    opacity: 0,
    x: isPreviousAfter ? '10%' : '-10%',
    transition: { duration: 0.2, ease: [0.35, 0.8, 0.4, 1] },
  }),
};

export function Calendar({
  value = new Date(),
  float = false,
  showButtons = true,
  disablePast = false,
  disableFuture = false,
  minDate = new Date('01-01-1899'),
  maxDate = new Date('12-31-2099'),
  onChange,
  onCancel,
  onSubmit,
  onPageChange,
  ...rest
}: CalendarProps) {
  const currDate = new Date();
  const [ref, { height }] = useMeasure();
  const [selected, setSelected] = useState(value);
  const [showingDate, setShowingDate] = useState(currDate);
  const [type, setType] = useState<'d' | 'y'>('d');
  const showingFormatted = useMemo(() => format(showingDate, 'MMM yyyy', { locale: ptBR }), [showingDate]);
  const formattedYear = useMemo(() => format(selected, 'yyyy', { locale: ptBR }), [selected]);
  const formattedDate = useMemo(() => format(selected, "eee, d 'de' MMMM", { locale: ptBR }), [selected]);
  const currentYear = useMemo(() => getYear(currDate), [currDate]);
  const minYear = useMemo(() => getYear(minDate), [minDate]);
  const maxYear = useMemo(() => getYear(maxDate), [maxDate]);
  const smallWindow = useMedia('(max-width: 375px)');
  const selectedYearRef = useRef<HTMLButtonElement>();
  const [isPreviousAfter, setIsPreviousAfter] = useState(false);
  const shouldMoveToNextMonth = useMemo(
    () => (!disableFuture ? !isAfter(showingDate, maxDate) : !isAfter(showingDate, setHours(currDate, 0))),
    [showingDate, maxDate, disableFuture, currDate]
  );
  const shouldMoveToPrevMonth = useMemo(
    () => (!disablePast ? !isBefore(showingDate, minDate) : !isBefore(showingDate, setHours(currDate, 24))),
    [showingDate, minDate, !disablePast, currDate]
  );
  const resolveButtonDisabled = useCallback(
    (d: Date) => {
      const isAfterOk = !disableFuture ? isAfter(d, maxDate) : isAfter(d, currDate);
      const isBeforeOk = !disablePast ? isBefore(d, minDate) : isBefore(d, currDate);

      return !isSameDay(d, currDate) && (isAfterOk || isBeforeOk);
    },
    [currDate]
  );

  async function changePreviousAfter(v: boolean) {
    return new Promise(resolve => {
      if (isPreviousAfter !== v) {
        setIsPreviousAfter(v);
      }
      resolve();
    });
  }

  function nextMonth(e: React.MouseEvent) {
    changePreviousAfter(false).then(() => {
      const newMonth = addMonths(showingDate, 1);
      if (onPageChange) onPageChange(newMonth, false, e);
      setShowingDate(newMonth);
    });
  }

  function prevMonth(e: React.MouseEvent) {
    changePreviousAfter(true).then(() => {
      const newMonth = subMonths(showingDate, 1);
      if (onPageChange) onPageChange(newMonth, true, e);
      setShowingDate(newMonth);
    });
  }

  function handleDate(d: Date, t?: 'd' | 'y') {
    setSelected(d);
    if (t) setType(t);
  }

  function handleShowingDate(d: Date, t?: 'd' | 'y') {
    setShowingDate(d);
    if (t) setType(t);
  }

  useEffect(() => {
    if (onChange) onChange(selected);
  }, [selected]);

  useEffect(() => {
    if (type === 'y' && selectedYearRef.current && selectedYearRef.current.scrollIntoView) {
      try {
        selectedYearRef.current.scrollIntoView({
          block: 'center',
        });
      } catch (e) {
        selectedYearRef.current.scrollIntoView();
      }
    }
  }, [type]);

  const renderWeekDays = useCallback(() => {
    const dateFormat = smallWindow ? 'EEEEE' : 'EE';
    let els: React.ReactNodeArray = [];

    const startDate = startOfWeek(showingDate);
    els = produce(els, draft => {
      for (let i = 0; i < 7; i += 1) {
        draft.push(
          <div key={i} className={clsx(u['xs:grid-column-1'], s['week-item'], s['button-like'])}>
            {format(addDays(startDate, i), dateFormat, { locale: ptBR })}
          </div>
        );
      }
    });

    return els;
  }, [smallWindow]);

  const renderCells = useCallback(() => {
    const monthStart = startOfMonth(showingDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    let days: React.ReactNodeArray = [];
    let day = startDate;

    days = produce(days, draft => {
      while (day <= endDate) {
        const cloneDate = day;
        draft.push(
          <GridItem size={{ xs: 1 }}>
            <Button
              disabled={!isSameMonth(cloneDate, monthStart) || resolveButtonDisabled(cloneDate)}
              variant={isSameDay(cloneDate, selected) ? 'contained' : 'flat'}
              key={format(day, 'd/M/Y')}
              onClick={() => handleDate(cloneDate)}
              className={s['week-button']}
            >
              {format(day, dateFormat, { locale: ptBR })}
            </Button>
          </GridItem>
        );
        day = addDays(day, 1);
      }
      const rowsRendered = 6 - draft.length / 7;
      const cloneDate = day;
      for (let i = 0; i < 7 * rowsRendered; i += 1) {
        draft.push(
          <Button
            disabled={!isSameMonth(cloneDate, monthStart)}
            variant={isSameDay(cloneDate, selected) ? 'contained' : 'flat'}
            key={format(day, 'd/M/Y')}
            className={clsx(s['week-button'], s['hidden-button'])}
            aria-hidden
          />
        );
        day = addDays(day, 1);
      }
    });

    return days;
  }, [showingDate, selected]);

  const renderYears = useCallback(() => {
    const yearStart = selected;

    const dateFormat = 'yyyy';
    let months: React.ReactNodeArray = [];

    months = produce(months, draft => {
      for (let i = !disablePast ? minYear : currentYear; i <= (!disableFuture ? maxYear : currentYear); i += 1) {
        const cloneDate = setYear(yearStart, i);
        const isYearSelected = isSameYear(cloneDate, selected);
        draft.push(
          <button
            ref={isYearSelected ? (selectedYearRef as React.MutableRefObject<HTMLButtonElement>) : undefined}
            className={clsx(s.button, s['button-like'], {
              [s.active]: isYearSelected,
            })}
            key={format(cloneDate, dateFormat)}
            onClick={() => {
              handleShowingDate(setYear(showingDate, i));
              handleDate(cloneDate, 'd');
            }}
          >
            {format(cloneDate, dateFormat, { locale: ptBR })}
          </button>
        );
      }
    });

    return months;
  }, [showingDate, selected, smallWindow]);

  return (
    <Container small={float} {...rest}>
      <>
        <Flex alignItems={{ xs: 'center' }} flexWrap={{ xs: 'wrap' }}>
          <Flex.Item size={{ xs: 12 }}>
            <NoPaddingButton color={type === 'y' ? 'secondary' : 'primary'} onClick={() => setType('y')} variant="flat">
              {formattedYear}
            </NoPaddingButton>
          </Flex.Item>
          <Flex.Item size={{ xs: 12 }}>
            <ShowingDate color={type === 'd' ? 'secondary' : 'primary'} onClick={() => setType('d')} variant="flat">
              {formattedDate}
            </ShowingDate>
          </Flex.Item>
        </Flex>
        {type === 'd' && (
          <div ref={ref}>
            <Flex alignItems={{ xs: 'center' }}>
              <div className={u['xs:px-3']}>
                <IconButton aria-label="Mês anterior" disabled={!shouldMoveToPrevMonth} onClick={prevMonth}>
                  <ArrowBack />
                </IconButton>
              </div>
              <AnimatePresence exitBeforeEnter initial={false}>
                <motion.div
                  variants={animationVariants}
                  custom={isPreviousAfter}
                  animate="animate"
                  initial="initial"
                  exit="exit"
                  key={showingFormatted}
                  className={clsx(u['xs:px-3'], u['xs:col'], u['xs:ta-center'], s['button-like'])}
                >
                  {showingFormatted}
                </motion.div>
              </AnimatePresence>
              <div className={u['xs:px-3']}>
                <IconButton aria-label="Próximo mês" disabled={!shouldMoveToNextMonth} onClick={nextMonth}>
                  <ArrowForward />
                </IconButton>
              </div>
            </Flex>
            <AnimatePresence exitBeforeEnter initial={false}>
              <Week
                variants={animationVariants}
                custom={isPreviousAfter}
                animate="animate"
                initial="initial"
                exit="exit"
                key={showingFormatted}
              >
                {renderWeekDays()}
                {renderCells()}
              </Week>
            </AnimatePresence>
          </div>
        )}
        {type === 'y' && (
          <Grid className={clsx(u['xs:ta-center'], s.gap)}>
            <div className={clsx(u['xs:grid-column-12'], s.overflow)} style={{ height }}>
              {renderYears()}
            </div>
          </Grid>
        )}
        {showButtons && (
          <div className={clsx(u['xs:ta-right'], u['xs:mt-2'])}>
            <Button variant="flat" color="secondary" onClick={onCancel}>
              Cancelar
            </Button>{' '}
            <Button variant="contained" onClick={e => (onSubmit ? onSubmit(selected, e) : {})}>
              OK
            </Button>
          </div>
        )}
      </>
    </Container>
  );
}
