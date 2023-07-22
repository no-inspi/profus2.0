import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  overlay: {
    bg: 'blackAlpha.600', //change the background
  },
  dialog: {
    borderRadius: 'md',
    bg: `rgba(27,36,48,1)`,
    color: "white",
  },
  header: {
    textAlign: 'center',
  },

})

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
})