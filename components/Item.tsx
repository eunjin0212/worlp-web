import { Feed } from '@/types/feed'
import Image from 'next/image'
import styles from '@/styles/components/item.module.css'

interface Props {
  item: Feed
}

const Item = ({ item }: Props) => {
  return (
    <ul className={styles['item-component']}>
      <li className={styles['item__image-wrapper']}>
        <Image
          src={item.cheapest.thumbnail}
          alt={item.cheapest.title}
          fill
        />
        <div className={styles['item__price-wrapper']}>
          <p>
            {/* TODO: 할인 퍼센트 구하기 */}
            {item.cheapest.price.discount?.amount.currency === 'KRW' ? '₩' : '$'}
            {item.cheapest.price.discount?.amount.decimal.toLocaleString()}
          </p>
          <p>
            <span className={styles['item__price--origin']}>
              {item.cheapest.price.listPrice?.currency === 'KRW' ? '₩' : '$'}
              {item.cheapest.price.listPrice?.decimal.toLocaleString()}
            </span>
            <span className={styles['item__price--sales']}>
              {item.cheapest.price.discount?.salePrice.currency === 'KRW' ? '₩' : '$'}
              {item.cheapest.price.discount?.salePrice.decimal.toLocaleString()}
            </span>
          </p>
        </div>
      </li>
      <li className={styles['item__brand-name']}>
        {item.cheapest.vendor}
      </li>
      <li className={styles['item__name']}>
        {/* {item.cheapest.title} */}
      </li>
    </ul>
  )
}

export default Item
