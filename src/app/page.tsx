'use client'
import DarkMode from '@/components/DarkMode'
import SearchBar from '@/components/SearchBar'
import { useEffect, useRef, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Cat } from '@/type'
import { fetchImages } from '@/server'
import { useDebounce } from 'use-debounce'
import Loading from '@/components/Loading'
import ImageCard from '@/components/ImageCard'

export default function Home() {
  const sentinelRef = useRef(null)
  const [search, setSearch] = useState('')
  const [value] = useDebounce(search, 300)

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery<
  Cat[],
    Error
  >({
    queryKey: ['images', value],
    queryFn: ({ pageParam = 1 }) => fetchImages(pageParam as number, value),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return lastPage.length > 0 ? nextPage : undefined
    },
    initialPageParam: 1,
  })

  useEffect(() => {
    if (!hasNextPage) return
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        fetchNextPage()
      }
    })
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current)
      }
    }
  }, [hasNextPage, fetchNextPage])

  if (!data) {
    return <></>
  }

  const catsPhotos = data?.pages.flatMap((page) => page)

const total = catsPhotos.length;

  return (
    <div className=" flex text-black dark:text-white flex-col gap-3 relative bg-white dark:bg-black min-h-screen">
      <nav className="px-5 bg-white z-10 dark:bg-black py-4 flex  gap-3   justify-between items-center sticky top-0">
        <div className="flex flex-col">
          <h1 className=" text-transparent text-center bg-clip-text font-bold text-3xl whitespace-nowrap bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500">
            Image gallery
          </h1>
          <h4 className="text-transparent text-center bg-clip-text font-bold text-base whitespace-nowrap bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500">
            with infinite scroll
          </h4>
        </div>
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="hidden md:flex"
        />
        <DarkMode />
      </nav>
      <div className=" px-5 md:hidden">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/*  */}
      {isLoading ? (
        <Loading />
      ) : catsPhotos && catsPhotos.length < 1 ? (
        <p className="mx-auto text-center text-gray-400 text-sm">
          No image found
        </p>
      ) : (
        <main className="columns-1 md:columns-2 xl:columns-4 gap-4 p-3">
          {catsPhotos?.map((catPhoto, i) => (
            <ImageCard key={i} cat={catPhoto} />
          ))}
        </main>
      )}
      {hasNextPage && (
        <div ref={sentinelRef} className="mx-auto">
          <Loading />
        </div>
      )}
    </div>
  )
}
