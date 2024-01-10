import type { ChangeEvent, KeyboardEvent } from 'react';
import styles from '@/styles/components/searchInput.module.css'
import search from '@/assets/search.svg'
import Image from 'next/image';

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEnter: (event: KeyboardEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, onEnter, name, placeholder = "‘아이템'으로 찾아보기" }: Props) {
  return (
    <div className={styles['input-wrapper']}>
      <span className={styles['input-icon-wrapper']}>
        <Image alt='search' src={search} fill />
      </span>
      <input
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        onKeyDown={(e) => e.keyCode === 13 && onEnter(e)}
      />
    </div>
  )
}