import { block } from './utils'

const gl: any = global

const NAY_CLASS = 'nay-blocked'
gl.NAY_CLASS = NAY_CLASS

const confirm = jest.fn()
gl.confirm = confirm

/* eslint-disable no-unused-expressions */
describe('block', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('on links matching a rule', () => {
    it('adds the Nay! class', async () => {
      const link = document.createElement('a')
      const rule = { id: 'XXX', match: 'medium.com' }

      link.textContent = 'Clickbait'
      link.href = 'medium.com/blabla'

      expect(link.classList).not.toContain(NAY_CLASS)

      await block([link], Promise.resolve([rule]))

      return expect(link.classList).toContain(NAY_CLASS)
    })

    it('calls sendMessage', async () => {
      const link = document.createElement('a')
      const rule = { id: 'XXX', match: 'medium.com' }

      link.textContent = 'Clickbait'
      link.href = 'medium.com/blabla'

      await block([link], Promise.resolve([rule]))

      return expect(browser.runtime.sendMessage).toHaveBeenCalled()
    })

    describe('adds an onclick handler which', () => {
      const preventDefault = jest.fn()
      const mockMouseEvent: MouseEvent = { preventDefault, ...({} as any) }

      beforeEach(() => {
        preventDefault.mockClear()
      })

      it('prevents default', async () => {
        const link = document.createElement('a')
        const rule = { id: 'XXX', match: 'medium.com' }

        link.textContent = 'Clickbait'
        link.href = 'medium.com/blabla'

        await block([link], Promise.resolve([rule]))

        link.onclick?.(mockMouseEvent)

        return expect(preventDefault).toHaveBeenCalled()
      })

      it('calls confirm to ask the user if they want to continue', async () => {
        const link = document.createElement('a')
        const rule = { id: 'XXX', match: 'medium.com' }

        link.textContent = 'Clickbait'
        link.href = 'medium.com/blabla'

        await block([link], Promise.resolve([rule]))

        link.onclick?.(mockMouseEvent)

        return expect(confirm).toHaveBeenCalledWith(expect.stringContaining(rule.match))
      })

      it('shows the reason added by the user in the rule if present', async () => {
        const link = document.createElement('a')
        const rule = { id: 'XXX', match: 'medium.com', reason: 'Their UI is really bloated' }

        link.textContent = 'Clickbait'
        link.href = 'medium.com/blabla'

        await block([link], Promise.resolve([rule]))

        link.onclick?.(mockMouseEvent)

        return expect(confirm).toHaveBeenCalledWith(expect.stringContaining(rule.reason))
      })
    })

    describe('if the links contain a media tag', () => {
      it('does not add the Nay! class', async () => {
        const link = document.createElement('a')
        const rule = { id: 'XXX', match: 'medium.com' }

        link.textContent = 'Clickbait'
        link.href = 'medium.com/blabla'
        link.appendChild(document.createElement('img'))

        document.body.appendChild(link)

        await block([link], Promise.resolve([rule]))

        return expect(link.classList).not.toContain(NAY_CLASS)
      })
    })

    describe('if the links have no text content', () => {
      it('does not add the Nay! class', async () => {
        const link = document.createElement('a')
        const rule = { id: 'XXX', match: 'medium.com' }

        link.textContent = ''
        link.href = 'medium.com/blabla'

        document.body.appendChild(link)

        await block([link], Promise.resolve([rule]))

        return expect(link.classList).not.toContain(NAY_CLASS)
      })
    })
  })

  describe('on links that do not match any rule', () => {
    it('does nothing', async () => {
      const link = document.createElement('a')
      const rule = { id: 'XXX', match: 'theguardian.com' }

      link.textContent = 'Clickbait'
      link.href = 'medium.com/blabla'

      expect(link.classList).not.toContain(NAY_CLASS)

      await block([link], Promise.resolve([rule]))

      return expect(link.classList).not.toContain(NAY_CLASS)
    })
  })

  describe('when a rule matches the current origin', () => {
    it('excludes it', async () => {
      const link = document.createElement('a')
      const rule = { id: 'XXX', match: 'techcrunch.com' }

      link.textContent = 'Clickbait'
      link.href = 'techcrunch.com/bloo'

      delete window.location
      gl.location = { origin: 'https://techcrunch.com' }

      await block([link], Promise.resolve([rule]))

      return expect(link.classList).not.toContain(NAY_CLASS)
    })
  })
})
