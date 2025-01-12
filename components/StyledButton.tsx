import {
  Pressable,
  PressableProps,
  Text,
  TextProps,
  ViewStyle,
} from 'react-native'

import tw from '@/utils/tw'

export default function StyledButton({
  size = 'middle',
  type = 'default',
  onPress,
  children,
  ghost,
  style,
  textProps,
  shape = 'default',
  pressable = true,
}: {
  size?: 'middle' | 'large' | 'small' | 'mini'
  type?: 'default' | 'secondary' | 'primary'
  shape?: 'default' | 'rounded' | 'rectangular'
  onPress?: PressableProps['onPress']
  children?: string
  ghost?: boolean
  style?: ViewStyle
  textProps?: TextProps
  pressable?: boolean
}) {
  const {
    color,
    activeColor,
    darkColor,
    activeDarkColor,
    textColor,
    darkTextColor,
  }: {
    color: string
    activeColor: string
    darkColor: string
    activeDarkColor: string
    textColor: string
    darkTextColor: string
  } = {
    default: {
      color: `#0f1419`,
      darkColor: `rgb(239,243,244)`,
      textColor: '#fff',
      darkTextColor: '#0f1419',
      activeColor: `rgb(63,67,71)`,
      activeDarkColor: `rgb(191,194,195)`,
    },
    primary: {
      color: `#4d5256`,
      darkColor: `#4d5256`,
      textColor: '#fff',
      darkTextColor: '#fff',
      activeColor: `#778087`,
      activeDarkColor: `#778087`,
    },
    secondary: {
      color: `rgb(29,155,240)`,
      darkColor: `rgb(239,243,244)`,
      textColor: '#fff',
      darkTextColor: 'rgb(29,155,240)',
      activeColor: `rgb(26,140,216)`,
      activeDarkColor: `rgb(26,140,216)`,
    },
  }[type]

  return (
    <Pressable
      style={({ pressed }) =>
        tw.style(
          {
            middle: tw`h-9 px-4`,
            large: tw`h-[52px] px-8`,
            small: tw`h-7 px-3`,
            mini: tw`px-1 py-px`,
          }[size],
          {
            default: size === 'mini' ? tw`rounded-sm` : tw`rounded-lg`,
            rounded: tw`rounded-full`,
            rectangular: tw`rounded-none`,
          }[shape],
          `flex-row items-center justify-center rounded-full border border-solid`,
          pressed && pressable
            ? tw.style(
                `border-[${activeColor}] dark:border-[${activeDarkColor}]`,
                !ghost && tw`bg-[${activeColor}] dark:bg-[${activeDarkColor}]`
              )
            : tw.style(
                `border-[${color}] dark:border-[${darkColor}]`,
                !ghost && tw`bg-[${color}] dark:bg-[${darkColor}]`,
                !pressable && tw`opacity-80`
              ),
          style
        )
      }
      onPress={ev => {
        if (pressable) {
          onPress?.(ev)
        }
      }}
    >
      <Text
        {...textProps}
        style={[
          ghost
            ? tw`dark:text-[${darkColor}] text-[${color}]`
            : tw`text-[${textColor}] dark:text-[${darkTextColor}]`,
          textProps?.style,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  )
}
