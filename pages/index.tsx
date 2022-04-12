export default function UserPage() {
  return (
    <div className="container">
      <h1>Hello!</h1>
      <a href="/addworkout">
        <button>Add new workout</button>
      </a>
      <div>
        <p>My previous trainings</p>
        <div>training1</div>
        <div>training2</div>
      </div>
    </div>
  );
}
