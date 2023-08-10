import './quote.css'
import { Component, ReactNode } from 'react'
import { FaTwitter, FaQuoteLeft } from 'react-icons/fa'

type quoteProps = {
  styleNames?: string
  text?: string
  author?: string
  color?: string
}

type QuoteState = {
  text: string
  author: string
  color: string
}

class Quote extends Component<quoteProps, QuoteState> {
  constructor(props: quoteProps) {
    super(props)
    this.state = {
      text: '',
      author: '',
      color: '#e0e0e0',
    }
    this.fetchRandomQuote = this.fetchRandomQuote.bind(this)
  }

  async fetchRandomQuote() {
    try {
      const response = await fetch('https://api.quotable.io/random')
      if (response.ok) {
        const data = await response.json()
        this.setState({ text: data.content, author: data.author, color: this.getColor() })
      } else {
        console.error('Failed to fetch quote.')
      }
    } catch (error) {
      console.error('Error fetching quote:', error)
    }
  }

  getRandomColorComponent = (): number => {
    return Math.round(Math.random() * 100)
  }

  getColor = (): string => {
    const red = this.getRandomColorComponent()
    const green = this.getRandomColorComponent()
    const blue = this.getRandomColorComponent()

    console.dir({ red, green, blue })
    return `rgb(${red}, ${green}, ${blue})`
  }

  handleClick = () => {
    this.fetchRandomQuote()
  }

  componentDidMount() {
    this.fetchRandomQuote()
  }

  render(): ReactNode {
    return (
      <div
        className='quote-wrapper'
        style={{ backgroundColor: this.state.color }}>
        <div id='quote-box'>
          <main
            id='content'
            style={{ color: this.state.color }}>
            <blockquote id='text'>
              <span className=''>
                <FaQuoteLeft size='30' />
              </span>
              <span className=''>{this.state.text}</span>
            </blockquote>
            <p id='author'>-{this.state.author}</p>
          </main>
          <div className='btn-group'>
            <a
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${this.state.text}`}
              id='tweet-quote'
              target='_blank'
              style={{ backgroundColor: this.state.color, color: 'white' }}>
              <FaTwitter />
            </a>

            <button
              id='new-quote'
              onClick={this.handleClick}
              style={{ backgroundColor: this.state.color, color: 'white' }}>
              new quote
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Quote
