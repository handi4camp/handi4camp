export default function DonationBox() {
  return (
    <div className="bg-light-green rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-1">
        <h3 className="font-serif text-2xl font-bold text-forest mb-4">
          Bankovní převod
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex gap-2 flex-wrap">
            <dt className="text-dark/60 w-40 flex-none">Číslo účtu:</dt>
            <dd className="font-mono font-bold">XXXX-XXXXXX/XXXX</dd>
          </div>
          <div className="flex gap-2 flex-wrap">
            <dt className="text-dark/60 w-40 flex-none">Variabilní symbol:</dt>
            <dd className="font-mono font-bold">2024</dd>
          </div>
          <div className="flex gap-2 flex-wrap">
            <dt className="text-dark/60 w-40 flex-none">
              Zpráva pro příjemce:
            </dt>
            <dd>Handi4Camp – dar</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-dark/50">
          Dar je daňově uznatelný dle § 15 odst. 1 zákona č. 586/1992 Sb.
        </p>
      </div>
      <div className="flex-none text-center">
        <div className="bg-white p-4 rounded-xl inline-block shadow">
          {/* Replace this placeholder with a real QR code image */}
          <div className="w-32 h-32 bg-light-green/60 flex items-center justify-center text-xs text-forest/50 rounded">
            QR kód
          </div>
        </div>
        <p className="text-xs text-dark/60 mt-2">Naskenujte pro platbu</p>
      </div>
    </div>
  );
}
