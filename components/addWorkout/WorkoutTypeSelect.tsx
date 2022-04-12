export function WorkoutTypeSelect() {
  return (
    <div>
      <label htmlFor="workout-type" className="workout-type_label">
        Type:
      </label>
      <select
        name="workout-type"
        data-test="workout-type"
        className="workout-type__select"
      >
        <option value="biking">Rower</option>
        <option value="running">Bieganie</option>
        <option value="swimming">Pływanie</option>
      </select>
    </div>
  );
}
