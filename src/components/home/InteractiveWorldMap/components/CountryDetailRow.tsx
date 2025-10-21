interface CountryDetailRowProps {
  label: string;
  value: string;
}

export default function CountryDetailRow({
  label,
  value,
}: CountryDetailRowProps) {
  return (
    <div className="detail-row">
      <span className="label">{label}:</span>
      <span className="value">{value}</span>
    </div>
  );
}
