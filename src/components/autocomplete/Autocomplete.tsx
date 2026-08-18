import { Combobox, type ComboboxProps, type ComboboxItem } from '../combobox/Combobox'

/**
 * Typeahead select. Appica ships both `combobox` and `autocomplete`; they share
 * the same implementation, so `Autocomplete` is a named alias of `Combobox`.
 */
function Autocomplete(props: ComboboxProps) {
  return Combobox(props)
}

export { Autocomplete }
export type { ComboboxProps as AutocompleteProps, ComboboxItem as AutocompleteItem }
