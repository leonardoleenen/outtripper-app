import React from 'react'
import Link from 'next/link'


export default () => (
  <div>
    <article className="pre-trip p-5 border-t-2 border-b-2">
      <Link href="/pretip">
        <TripIcon />
        Pre Trip Information
      </Link>
    </article>
    <style>
      {
            `
            article.pre-trip {
              margin: auto;
              text-align: center;
            }
            article.pre-trip svg {
              float:left;
            }
            `
          }
    </style>
  </div>
)

const TripIcon = () => (
  <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.6667 5.18888C14.6667 7.21472 13.0258 8.85555 11 8.85555C8.97417 8.85555 7.33333 7.21472 7.33333 5.18888C7.33333 3.16305 8.97417 1.52222 11 1.52222C13.0258 1.52222 14.6667 3.16305 14.6667 5.18888ZM12.8333 5.18888C12.8333 4.18055 12.0083 3.35555 11 3.35555C9.99167 3.35555 9.16667 4.18055 9.16667 5.18888C9.16667 6.19722 9.99167 7.02222 11 7.02222C12.0083 7.02222 12.8333 6.19722 12.8333 5.18888ZM11 11.193C8.83667 9.17638 5.94 7.93888 2.75 7.93888V18.0222C5.94 18.0222 8.83667 19.2597 11 21.2764C13.1633 19.2689 16.06 18.0222 19.25 18.0222V7.93888C16.06 7.93888 13.1633 9.17638 11 11.193ZM11 18.893C12.8975 17.4997 15.0975 16.6197 17.4167 16.308V9.93722C15.4917 10.2856 13.7042 11.1747 12.2467 12.5314L11 13.6955L9.75333 12.5222C8.29583 11.1655 6.50833 10.2764 4.58333 9.92805V16.2989C6.9025 16.6105 9.11167 17.4997 11 18.893Z" fill="#718096" />
  </svg>

)
