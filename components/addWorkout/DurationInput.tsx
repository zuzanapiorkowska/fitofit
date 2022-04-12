export function DurationInput() {
  return (
    <div>
      <span>Czas trwania</span>
      <input name="hours" type="number" placeholder="godziny..." />
      <span>:</span>
      <input name="minutes" type="number" placeholder="minuty..." />
      <span>:</span>
      <input name="seconds" type="number" placeholder="sekundy..." />
    </div>
  );
}
