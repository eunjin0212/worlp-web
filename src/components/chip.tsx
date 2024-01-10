import styles from '@/styles/components/chip.module.css'

interface Props {
  label: string;
  onClick: () => void;
  active: boolean;
}

export default function Chip({ label, onClick, active }: Props) {
  return (
    <button className={[styles['chip-component'], active && styles['chip-component--active']].join(' ')} onClick={onClick}>
      {label}
    </button>
  )
}