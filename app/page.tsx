import DateRangeCalendar from "./components/DateRangeCalendar";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-xs md:max-w-3xl flex items-center justify-center">
        <DateRangeCalendar />
      </div>
    </main>
  );
}
