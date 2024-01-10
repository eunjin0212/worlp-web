"use client"
import Image from 'next/image'
import styles from '@/styles/page.module.css'
import appstore from '@/assets/appstore.svg'
import SearchInput from '@/components/searchInput'
import { useState } from 'react'

export default function Home() {
  const [search, setSearch] = useState('')

  const handleSubmit = async () => {
    console.log('enter')
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src={appstore} alt='logo' fill priority />
        </div>
        <SearchInput
          value={search}
          name='term'
          onChange={(e) => setSearch(e.target.value)}
          onEnter={handleSubmit}
        />
      </header>
    </main>
  )
}
