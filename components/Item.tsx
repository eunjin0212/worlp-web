import type { Feed, Price } from '@/types/feed'
import Image from 'next/image'
import styles from '@/styles/components/item.module.css'
import { useMemo } from 'react'
import Link from 'next/link'

interface Props {
  item: Feed
}

const Item = ({ item }: Props) => {
  const savePercent = useMemo(() => {
    const salePrice = item.cheapest.price.discount?.amount.decimal || 0
    const originPrice = item.cheapest.price.listPrice?.decimal || 0
    const calcPrice = (salePrice / originPrice)
    return isNaN(salePrice / originPrice) ? 0 : Math.floor(calcPrice * 100)
  }, [item.cheapest.price.discount?.amount.decimal, item.cheapest.price.listPrice?.decimal])

  const currency = (curr: 'KRW' | 'USD' | undefined) => curr ? (curr === 'KRW' ? '₩' : '$') : ''

  const price = (item: Price | undefined) => {
    const locale = item ? (item.currency === 'KRW' ? 'ko-KR' : 'en-US') : ''
    return item?.decimal.toLocaleString(locale)
  }

  return (
    <Link href={item.cheapest.link}>
      <ul className={styles['item-component']}>
        <li className={styles['item__image-wrapper']}>
          <Image
            src={item.cheapest.thumbnail}
            alt={item.cheapest.title}
            fill
            sizes='10.938rem'
            priority
          />
          <div className={styles['item__price-wrapper']}>
            <p>
              -{savePercent}%
            </p>
            <p>
              <span className={styles['item__price--origin']}>
                {currency(item.cheapest.price.listPrice?.currency)}
                {price(item.cheapest.price.listPrice)}
              </span>
              {item.cheapest.price.discount && <span className={styles['item__price--sales']}>
                {currency(item.cheapest.price.discount?.salePrice.currency)}
                {price(item.cheapest.price.discount?.salePrice)}
              </span>}
            </p>
          </div>
        </li>
        <li className={styles['item__brand-name']}>
          {item.cheapest.vendor}
        </li>
        <li className={styles['item__name']}>
          {item.cheapest.title}
        </li>
      </ul>
    </Link>

  )
}

export default Item
