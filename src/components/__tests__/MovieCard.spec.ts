import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieCard from '../MovieCard.vue'
import type { Movie } from '../../types'

describe('MovieCard.vue', () => {
  const mockMovie: Movie = {
    id: 101,
    title: 'Inception',
    year: 2010,
    image: 'https://image.tmdb.org/t/p/w500/inception.jpg'
  }

  describe('1. Props Rendering', () => {
    it('renders movie title, release year, and poster image correctly', () => {
      const wrapper = mount(MovieCard, {
        props: {
          movie: mockMovie
        }
      })

      // Title validation
      const titleEl = wrapper.find('h3')
      expect(titleEl.exists()).toBe(true)
      expect(titleEl.text()).toBe('Inception')

      // Year validation
      const yearEl = wrapper.find('p')
      expect(yearEl.exists()).toBe(true)
      expect(yearEl.text()).toBe('2010')

      // Poster image validation
      const imgEl = wrapper.find('img')
      expect(imgEl.exists()).toBe(true)
      expect(imgEl.attributes('src')).toBe(mockMovie.image)
      expect(imgEl.attributes('alt')).toBe(mockMovie.title)
      expect(imgEl.attributes('loading')).toBe('lazy')
      expect(imgEl.attributes('decoding')).toBe('async')
    })

    it('sets placeholder poster on image load error', async () => {
      const wrapper = mount(MovieCard, {
        props: {
          movie: mockMovie
        }
      })

      const imgEl = wrapper.find('img')
      await imgEl.trigger('error')
      expect(imgEl.element.src).toContain('placehold.co')
    })
  })

  describe('2. Event Emissions', () => {
    it('emits selectMovie with movie payload when the card root is clicked', async () => {
      const wrapper = mount(MovieCard, {
        props: {
          movie: mockMovie
        }
      })

      // Click the root card container
      await wrapper.trigger('click')

      expect(wrapper.emitted('selectMovie')).toBeTruthy()
      expect(wrapper.emitted('selectMovie')?.[0]).toEqual([mockMovie])
    })

    it('emits toggleFavorite with movieId and stops event propagation when favorite button is clicked', async () => {
      const wrapper = mount(MovieCard, {
        props: {
          movie: mockMovie,
          isFavorite: false
        }
      })

      const favoriteBtn = wrapper.find('button[type="button"]')
      expect(favoriteBtn.exists()).toBe(true)

      // Click favorite button overlay
      await favoriteBtn.trigger('click')

      // toggleFavorite should be emitted with movie.id
      expect(wrapper.emitted('toggleFavorite')).toBeTruthy()
      expect(wrapper.emitted('toggleFavorite')?.[0]).toEqual([101])

      // selectMovie should NOT be emitted due to stopPropagation()
      expect(wrapper.emitted('selectMovie')).toBeFalsy()
    })
  })

  describe('3. Edge Cases & Optional Props', () => {
    it('renders unfilled star and add title when isFavorite prop is omitted', () => {
      const wrapper = mount(MovieCard, {
        props: {
          movie: mockMovie
        }
      })

      const favoriteBtn = wrapper.find('button')
      expect(favoriteBtn.attributes('title')).toBe('Adaugă la favorite')
      expect(favoriteBtn.text()).toBe('☆')
    })

    it('renders filled star and remove title when isFavorite is true', () => {
      const wrapper = mount(MovieCard, {
        props: {
          movie: mockMovie,
          isFavorite: true
        }
      })

      const favoriteBtn = wrapper.find('button')
      expect(favoriteBtn.attributes('title')).toBe('Șterge din favorite')
      expect(favoriteBtn.text()).toBe('★')
    })

    it('renders unfilled star when isFavorite is explicitly false', () => {
      const wrapper = mount(MovieCard, {
        props: {
          movie: mockMovie,
          isFavorite: false
        }
      })

      const favoriteBtn = wrapper.find('button')
      expect(favoriteBtn.attributes('title')).toBe('Adaugă la favorite')
      expect(favoriteBtn.text()).toBe('☆')
    })
  })
})

