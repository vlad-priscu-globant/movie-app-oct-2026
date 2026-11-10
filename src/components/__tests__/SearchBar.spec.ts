import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '../SearchBar.vue'

describe('SearchBar.vue', () => {
  describe('1. Props Rendering & Defaults', () => {
    it('renders input with modelValue as its initial value', () => {
      const wrapper = mount(SearchBar, {
        props: {
          modelValue: 'Interstellar'
        }
      })

      const input = wrapper.find<HTMLInputElement>('input')
      expect(input.exists()).toBe(true)
      expect(input.element.value).toBe('Interstellar')
    })

    it('renders custom placeholder when provided', () => {
      const wrapper = mount(SearchBar, {
        props: {
          modelValue: '',
          placeholder: 'Filtrează filme...'
        }
      })

      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBe('Filtrează filme...')
    })

    it('falls back to default placeholder "Caută..." when placeholder prop is omitted', () => {
      const wrapper = mount(SearchBar, {
        props: {
          modelValue: ''
        }
      })

      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBe('Caută...')
    })
  })

  describe('2. Two-Way Data Binding (v-model emulation)', () => {
    it('emits update:modelValue with typed value when user inputs text', async () => {
      const wrapper = mount(SearchBar, {
        props: {
          modelValue: ''
        }
      })

      const input = wrapper.find('input')
      await input.setValue('Oppenheimer')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Oppenheimer'])
    })
  })

  describe('3. Clear Action & Edge Cases', () => {
    it('does not render the clear button when modelValue is empty', () => {
      const wrapper = mount(SearchBar, {
        props: {
          modelValue: ''
        }
      })

      const clearBtn = wrapper.find('button[type="button"]')
      expect(clearBtn.exists()).toBe(false)
    })

    it('renders the clear button when modelValue is non-empty', () => {
      const wrapper = mount(SearchBar, {
        props: {
          modelValue: 'Dunkirk'
        }
      })

      const clearBtn = wrapper.find('button[type="button"]')
      expect(clearBtn.exists()).toBe(true)
      expect(clearBtn.text()).toBe('✕')
    })

    it('emits update:modelValue with empty string and clear event when clear button is clicked', async () => {
      const wrapper = mount(SearchBar, {
        props: {
          modelValue: 'Dunkirk'
        }
      })

      const clearBtn = wrapper.find('button[type="button"]')
      await clearBtn.trigger('click')

      // Verifies update:modelValue was called with empty string
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])

      // Verifies clear event was emitted
      expect(wrapper.emitted('clear')).toBeTruthy()
    })
  })
})

