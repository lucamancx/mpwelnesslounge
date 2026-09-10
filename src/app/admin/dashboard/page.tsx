export default function DashboardOverview() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-brand-dark mb-8">Benvenuta, Martina</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">Prenotazioni Oggi</h3>
          <p className="font-serif text-4xl text-brand-dark">5</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">Slot Attivi</h3>
          <p className="font-serif text-4xl text-brand-dark">24</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">Specialisti Registrati</h3>
          <p className="font-serif text-4xl text-brand-dark">3</p>
        </div>
      </div>
    </div>
  );
}
