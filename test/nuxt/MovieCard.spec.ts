import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MovieCard from '~/components/MovieCard.vue'
import type { Movie } from '#shared/types/movie'

describe('MovieCard.vue', () => {
  const mockMovie: Movie = {
    id: 101,
    title: 'Inception',
    year: 2010,
    image: 'https://image.tmdb.org/t/p/w500/inception.jpg',
  }

  describe('1. Props Rendering', () => {
    it('renders movie title, release year, and poster image correctly', async () => {
      const wrapper = await mountSuspended(MovieCard, { props: { movie: mockMovie } })

      const titleEl = wrapper.find('h3')
      expect(titleEl.exists()).toBe(true)
      expect(titleEl.text()).toBe('Inception')

      const yearEl = wrapper.find('p')
      expect(yearEl.exists()).toBe(true)
      expect(yearEl.text()).toBe('2010')

      // <NuxtImg> serves the poster through the app's image proxy, so the
      // original URL is wrapped rather than requested directly.
      const imgEl = wrapper.find('img')
      expect(imgEl.exists()).toBe(true)
      expect(imgEl.attributes('src')).toContain(mockMovie.image)
      expect(imgEl.attributes('src')).not.toBe(mockMovie.image)
      expect(imgEl.attributes('alt')).toBe(mockMovie.title)
      expect(imgEl.attributes('loading')).toBe('lazy')
      expect(imgEl.attributes('decoding')).toBe('async')
    })

    it('renders a placeholder when the release year is unknown', async () => {
      const wrapper = await mountSuspended(MovieCard, { props: { movie: { ...mockMovie, year: null } } })
      expect(wrapper.find('p').text()).toBe('—')
    })

    it('sets placeholder poster on image load error', async () => {
      const wrapper = await mountSuspended(MovieCard, { props: { movie: mockMovie } })

      await wrapper.find('img').trigger('error')
      expect(wrapper.find('img').attributes('src')).toContain('poster-placeholder.svg')
    })

    it('uses the placeholder poster when the movie has no image', async () => {
      const wrapper = await mountSuspended(MovieCard, { props: { movie: { ...mockMovie, image: '' } } })
      expect(wrapper.find('img').attributes('src')).toContain('poster-placeholder.svg')
    })
  })

  describe('2. Event Emissions', () => {
    it('emits selectMovie with movie payload when the card root is clicked', async () => {
      const wrapper = await mountSuspended(MovieCard, { props: { movie: mockMovie } })

      await wrapper.find('article').trigger('click')

      expect(wrapper.emitted('selectMovie')).toBeTruthy()
      expect(wrapper.emitted('selectMovie')?.[0]).toEqual([mockMovie])
    })

    it('emits toggleFavorite with movieId and stops event propagation when favorite button is clicked', async () => {
      const wrapper = await mountSuspended(MovieCard, { props: { movie: mockMovie, isFavorite: false } })

      const favoriteBtn = wrapper.find('button[type="button"]')
      expect(favoriteBtn.exists()).toBe(true)

      await favoriteBtn.trigger('click')

      expect(wrapper.emitted('toggleFavorite')).toBeTruthy()
      expect(wrapper.emitted('toggleFavorite')?.[0]).toEqual([101])
      expect(wrapper.emitted('selectMovie')).toBeFalsy()
    })
  })

  describe('3. Edge Cases & Optional Props', () => {
    it('renders unfilled star and add title when isFavorite prop is omitted', async () => {
      const wrapper = await mountSuspended(MovieCard, { props: { movie: mockMovie } })

      const favoriteBtn = wrapper.find('button')
      expect(favoriteBtn.attributes('title')).toBe('Adaugă la favorite')
      expect(favoriteBtn.text()).toBe('☆')
    })

    it('renders filled star and remove title when isFavorite is true', async () => {
      const wrapper = await mountSuspended(MovieCard, { props: { movie: mockMovie, isFavorite: true } })

      const favoriteBtn = wrapper.find('button')
      expect(favoriteBtn.attributes('title')).toBe('Șterge din favorite')
      expect(favoriteBtn.text()).toBe('★')
    })

    it('renders unfilled star when isFavorite is explicitly false', async () => {
      const wrapper = await mountSuspended(MovieCard, { props: { movie: mockMovie, isFavorite: false } })

      const favoriteBtn = wrapper.find('button')
      expect(favoriteBtn.attributes('title')).toBe('Adaugă la favorite')
      expect(favoriteBtn.text()).toBe('☆')
    })
  })
})
