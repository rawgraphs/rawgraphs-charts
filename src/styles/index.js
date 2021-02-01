import { convertCSS } from 'css-to-cssinjs'
import rawStyles from './base.css'

const styles = convertCSS(rawStyles, { format: 'object' })

export default styles