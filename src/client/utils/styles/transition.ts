export function genTransition(
  propName: string[],
  duration: number | string | (number | string)[],
  timingFunction: string
) {
  const durationArray = Array.isArray(duration);

  return propName
    .map((p, i) => {
      const currentDuration =
        durationArray && (duration as (number | string)[])[i] ? (duration as (number | string)[])[i] : duration;
      return `${p} ${typeof currentDuration === 'number' ? `${currentDuration}ms` : currentDuration} ${timingFunction}`;
    })
    .join(', ');
}
