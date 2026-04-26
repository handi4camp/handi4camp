type FundraiserProps = {
  enabled?: boolean | null;
  title?: string | null;
  description?: string | null;
  goal?: number | null;
  current?: number | null;
  deadline?: string | null;
  tinaFields?: {
    title?: string;
    description?: string;
    goal?: string;
    current?: string;
    deadline?: string;
  };
};

type DonationBoxProps = {
  heading?: string;
  accountNumber: string;
  variableSymbol?: string;
  transferMessage?: string;
  iban?: string;
  swift?: string;
  qrCodeImage?: string;
  noteText?: string;
  fundraiser?: FundraiserProps;
  tinaFields?: {
    heading?: string;
    accountNumber?: string;
    iban?: string;
    swift?: string;
    variableSymbol?: string;
    transferMessage?: string;
    qrCodeImage?: string;
    fundraiser?: string;
  };
  children?: React.ReactNode;
};

function formatCzk(amount: number) {
  return new Intl.NumberFormat("cs-CZ", { style: "currency", currency: "CZK", maximumFractionDigits: 0 }).format(amount);
}

function daysUntil(dateStr: string): number {
  return Math.max(0, Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
}

function formatDeadline(dateStr: string): string {
  return new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "long", year: "numeric" }).format(new Date(dateStr));
}

function FundraiserSection({ f }: { f: FundraiserProps }) {
  const goal = f.goal ?? 0;
  const current = Math.min(f.current ?? 0, goal);
  const percent = goal > 0 ? Math.round((current / goal) * 100) : 0;
  const days = f.deadline ? daysUntil(f.deadline) : null;

  return (
    <div className="mb-6 pb-6 border-b border-forest/15" data-tina-field={f.tinaFields?.title}>
      <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
        <span className="text-xs font-semibold text-forest/70 uppercase tracking-wider" data-tina-field={f.tinaFields?.title}>
          {f.title ?? "Aktuální sbírka"}
        </span>
        {f.deadline && days !== null && (
          <span className="text-xs text-dark/40 whitespace-nowrap" data-tina-field={f.tinaFields?.deadline}>
            {days > 0 ? `do ${formatDeadline(f.deadline)}` : "Sbírka skončila"}
          </span>
        )}
      </div>

      <div className="relative h-1.5 bg-dark/10 rounded-full overflow-hidden mb-1.5">
        <div className="h-full bg-forest/60 rounded-full transition-all duration-700" style={{ width: `${percent}%` }} />
      </div>

      <div className="flex items-center justify-between text-xs text-dark/40">
        <span data-tina-field={f.tinaFields?.current}>
          <span className="text-forest/80 font-medium">{formatCzk(current)}</span> vybráno ({percent} %)
        </span>
        <span data-tina-field={f.tinaFields?.goal}>{formatCzk(goal)}</span>
      </div>
    </div>
  );
}

export default function DonationBox({
  heading = "Bankovní převod",
  accountNumber,
  variableSymbol,
  transferMessage,
  iban,
  swift,
  qrCodeImage,
  noteText,
  fundraiser,
  tinaFields,
  children,
}: DonationBoxProps) {
  return (
    <div className="bg-light-green rounded-2xl p-8" data-tina-field={tinaFields?.heading}>
      {fundraiser?.enabled && <FundraiserSection f={fundraiser} />}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <h3 className="font-serif text-2xl font-bold text-forest mb-4" data-tina-field={tinaFields?.heading}>
            {heading}
          </h3>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-2 flex-wrap">
              <dt className="text-dark/60 w-40 flex-none">Č. účtu:</dt>
              <dd className="font-mono font-bold" data-tina-field={tinaFields?.accountNumber}>{accountNumber}</dd>
            </div>
            {variableSymbol && (
              <div className="flex gap-2 flex-wrap">
                <dt className="text-dark/60 w-40 flex-none">Variabilní symbol:</dt>
                <dd className="font-mono font-bold" data-tina-field={tinaFields?.variableSymbol}>{variableSymbol}</dd>
              </div>
            )}
            {transferMessage && (
              <div className="flex gap-2 flex-wrap">
                <dt className="text-dark/60 w-40 flex-none">Zpráva pro příjemce:</dt>
                <dd data-tina-field={tinaFields?.transferMessage}>{transferMessage}</dd>
              </div>
            )}
            {iban && (
              <div className="flex gap-2 flex-wrap">
                <dt className="text-dark/60 w-40 flex-none">IBAN:</dt>
                <dd className="font-mono font-bold" data-tina-field={tinaFields?.iban}>{iban}</dd>
              </div>
            )}
            {swift && (
              <div className="flex gap-2 flex-wrap">
                <dt className="text-dark/60 w-40 flex-none">SWIFT:</dt>
                <dd className="font-mono font-bold" data-tina-field={tinaFields?.swift}>{swift}</dd>
              </div>
            )}
          </dl>
          {noteText && <p className="mt-4 text-xs text-dark/50">{noteText}</p>}
          {children && <div className="mt-6">{children}</div>}
        </div>

        <div className="flex-none text-center">
          <div className="bg-white p-4 rounded-xl inline-block shadow">
            {qrCodeImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrCodeImage} alt="QR kód pro platbu" width={128} height={128} className="rounded" data-tina-field={tinaFields?.qrCodeImage} />
            ) : (
              <div className="w-32 h-32 bg-light-green/60 flex items-center justify-center text-xs text-forest/50 rounded" data-tina-field={tinaFields?.qrCodeImage}>
                QR kód
              </div>
            )}
          </div>
          <p className="text-xs text-dark/60 mt-2">Naskenujte pro platbu</p>
        </div>
      </div>
    </div>
  );
}
