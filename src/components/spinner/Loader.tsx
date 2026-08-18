import { Spinner, type SpinnerProps } from './Spinner'

/** Appica publishes `spinner` and `loader`; `Loader` is the named alias. */
function Loader(props: SpinnerProps) {
  return Spinner(props)
}

export { Loader }
