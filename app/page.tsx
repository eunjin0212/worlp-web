"use client"
import { useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/page.module.css'
import appstore from '@/assets/appstore.svg'
import SearchInput from '../components/searchInput'
import Chip from '@/components/chip'
import api from '@/api/api'

interface Feed {
  id: string;
  cheapest: {
    vendorProductID: string;
    vendor: string;
    title: string;
    thumbnail: string;
    link: string;
    price: {
      listPrice: {
        decimal: number,
        fraction: number,
        currency: string;
      }
    },
  }
}

interface FeedList {
  list: Feed[]
}

const categories = ['전체', '베스트', '할인율 높은순', '신상품']
export default function Home() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('전체')

  const handleSubmit = async () => {
    console.log('enter')
  }

  const handleClick = (value: string) => {
    setCategory(value)
    console.log(value)
  }

  const fetch = async () => {
    try {
      const { data } = await api.get('feed/v1')
    } catch (error) {
      console.error(error)
    }
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
        <div className={styles.category}>
          {categories.map((categoryItem) => (
            <Chip
              label={categoryItem}
              key={categoryItem}
              onClick={() => handleClick(category)}
              active={categoryItem === category}
            />
          ))}
        </div>
      </header>
    </main>
  )
}
