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
    <div className="bg-light-green rounded-2xl p-6 sm:p-8" data-tina-field={tinaFields?.heading}>
      {fundraiser?.enabled && <FundraiserSection f={fundraiser} />}

      {/* Heading + QR side by side, both always inside the card */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <h3 className="font-serif text-2xl font-bold text-forest" data-tina-field={tinaFields?.heading}>
          {heading}
        </h3>
        <div className="flex-none text-center" data-tina-field={tinaFields?.qrCodeImage}>
          <div className="bg-white p-3 rounded-xl inline-block shadow">
            {qrCodeImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrCodeImage} alt="QR kód pro platbu" width={96} height={96} className="rounded block" />
            ) : (
              <div className="w-24 h-24 bg-light-green/60 flex items-center justify-center text-xs text-forest/50 rounded">
                QR kód
              </div>
            )}
          </div>
          <p className="text-xs text-dark/50 mt-1">QR Platba</p>
        </div>
      </div>

      {/* Bank details – label left, value right, no wrapping issues */}
      <dl className="space-y-1.5 text-sm mb-4">
        <div className="flex items-baseline gap-2">
          <dt className="text-dark/60 shrink-0 w-36">Č. účtu:</dt>
          <dd className="font-mono font-bold min-w-0 break-all" data-tina-field={tinaFields?.accountNumber}>{accountNumber}</dd>
        </div>
        {variableSymbol && (
          <div className="flex items-baseline gap-2">
            <dt className="text-dark/60 shrink-0 w-36">Variabilní symbol:</dt>
            <dd className="font-mono font-bold min-w-0" data-tina-field={tinaFields?.variableSymbol}>{variableSymbol}</dd>
          </div>
        )}
        {transferMessage && (
          <div className="flex items-baseline gap-2">
            <dt className="text-dark/60 shrink-0 w-36">Zpráva:</dt>
            <dd className="min-w-0" data-tina-field={tinaFields?.transferMessage}>{transferMessage}</dd>
          </div>
        )}
        {iban && (
          <div className="flex items-baseline gap-2">
            <dt className="text-dark/60 shrink-0 w-36">IBAN:</dt>
            <dd className="font-mono font-bold min-w-0 break-all" data-tina-field={tinaFields?.iban}>{iban}</dd>
          </div>
        )}
        {swift && (
          <div className="flex items-baseline gap-2">
            <dt className="text-dark/60 shrink-0 w-36">SWIFT:</dt>
            <dd className="font-mono font-bold min-w-0" data-tina-field={tinaFields?.swift}>{swift}</dd>
          </div>
        )}
      </dl>

      {noteText && <p className="text-xs text-dark/50 mb-4">{noteText}</p>}
      {children && <div>{children}</div>}
    </div>
  );
}
