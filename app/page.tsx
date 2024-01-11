"use client"
import { useEffect, useState } from 'react'
import type { Feed, FeedList } from '@/types/feed'
import Image from 'next/image'
import appstore from '@/assets/appstore.svg'
import styles from '@/styles/page.module.css'
import api from '@/api/api'
import SearchInput from '@/components/searchInput'
import Chip from '@/components/chip'
import Item from '@/components/Item'

const categories = ['전체', '베스트', '할인율 높은순', '신상품']
const Home = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('전체')
  const [feedList, setFeedList] = useState<Feed[]>([])

  const handleSubmit = async () => {
    console.log('enter')
    try {
      const { data }: { data: Feed[] } = await api.get(`item/v1/items?term=${search}`)
      setFeedList(data)
    } catch (error) {
      
    }
  }

  const handleClick = (value: string) => {
    setCategory(value)
    console.log(value)
  }

  const getData = async () => {
    try {
      const { data }: { data: FeedList } = await api.get('feed/v1')
      setFeedList(data.list)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
    return () => { }
  }, [])

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
      <p className={styles['separator']}></p>
      <section className={styles['feed-list']}>
        {feedList.map((item) => (
          <Item key={item.id} item={item}/>
        ))}
      </section>
    </main>
  )
}

export default Home
