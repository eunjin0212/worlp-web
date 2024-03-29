"use client"
import { useState } from 'react'
import type { Feed, FeedList, Next } from '@/types/feed'
import Image from 'next/image'
import appstore from '@/assets/appstore.svg'
import styles from '@/styles/page.module.css'
import api from '@/api/api'
import SearchInput from '@/components/searchInput'
import Chip from '@/components/chip'
import Item from '@/components/Item'
import useInfiniteScrolling from '@/hooks/useInfiniteScrolling'

const categories = ['전체', '베스트', '할인율 높은순', '신상품']
const Home = () => {
  const [search, setSearch] = useState('')
  const [next, setNext] = useState<Next>({ limit: 12, startFrom: '' })
  const [category, setCategory] = useState('전체')
  const [feedList, setFeedList] = useState<Feed[]>([])
  const [observerRef, setObserverRef] = useState<null | HTMLDivElement>(null);

  const getSearchData = async () => {
    try {
      const { data }: { data: Feed[] } = await api.get(`item/v1/items?term=${search}&limit=12${next.startFrom ? `&startFrom=${next.startFrom}` : ''}`)
  
      setNext((prev) => ({ ...prev, startFrom: undefined }))
      setFeedList(data)
  
    } catch (error) {
      console.error(error)
    }
  }

  const getData = async () => {
    try {
      const { data }: { data: FeedList } = await api.get(`feed/v1?limit=12${next.startFrom ? `&startFrom=${next.startFrom}` : ''}`)

      setFeedList((prev) => [...prev, ...data.list])
      setNext((prev) => ({ ...prev, startFrom: data.next?.startFrom }))

    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async () => {
    setFeedList([])
    setNext((prev) => ({ ...prev, startFrom: undefined }))

    if (search) {
      getSearchData()
      return;
    }
    getData()
  }

  const handleClick = (value: string) => {
    setCategory(value)
  }

  const handleChange = (value: string) => {
    setSearch(value)
  }

  useInfiniteScrolling({
    observerRef,
    fetchMore: search ? getSearchData : getData,
    hasMore: next.startFrom !== undefined,
  });

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src={appstore} alt='logo' fill priority />
        </div>
        <SearchInput
          value={search}
          name='term'
          onChange={(e) => handleChange(e.target.value)}
          onEnter={handleSubmit}
        />
        {false && <div className={styles.category}>
          {categories.map((categoryItem) => (
            <Chip
              label={categoryItem}
              key={categoryItem}
              onClick={() => handleClick(category)}
              active={categoryItem === category}
            />
          ))}
        </div>}
      </header>
      <p className={styles['separator']}></p>
      <section className={styles['feed-section']}>
        <div>
          {feedList.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </div>
        <div ref={setObserverRef}></div>
      </section>
    </main>
  )
}

export default Home
