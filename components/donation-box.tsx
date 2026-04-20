type DonationBoxProps = {
  accountNumber: string;
  variableSymbol?: string;
  noteText?: string;
  children?: React.ReactNode;
};

export default function DonationBox({ accountNumber, variableSymbol = "2024", noteText, children }: DonationBoxProps) {
  return (
    <div className="bg-light-green rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-1">
        <h3 className="font-serif text-2xl font-bold text-forest mb-4">
          Bankovní převod
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex gap-2 flex-wrap">
            <dt className="text-dark/60 w-40 flex-none">Číslo účtu:</dt>
            <dd className="font-mono font-bold">{accountNumber}</dd>
          </div>
          <div className="flex gap-2 flex-wrap">
            <dt className="text-dark/60 w-40 flex-none">Variabilní symbol:</dt>
            <dd className="font-mono font-bold">{variableSymbol}</dd>
          </div>
          <div className="flex gap-2 flex-wrap">
            <dt className="text-dark/60 w-40 flex-none">Zpráva pro příjemce:</dt>
            <dd>Handi4Camp – dar</dd>
          </div>
        </dl>
        {noteText && (
          <p className="mt-4 text-xs text-dark/50">{noteText}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
      <div className="flex-none text-center">
        <div className="bg-white p-4 rounded-xl inline-block shadow">
          <div className="w-32 h-32 bg-light-green/60 flex items-center justify-center text-xs text-forest/50 rounded">
            QR kód
          </div>
        </div>
        <p className="text-xs text-dark/60 mt-2">Naskenujte pro platbu</p>
      </div>
    </div>
  );
}
