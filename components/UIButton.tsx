import React from 'react'
import { Button, ButtonProps, StyleProp, ViewStyle, Text, TextStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../style/Colors'

export const UIButtonOutline: React.FC<Props> = (props) => {
  return (
    <UIButton
      {...props}
      style={{
        backgroundColor: Colors.Transparent,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: Colors[props.color ?? 'Dark'],
        ...props.style,
      }}
      textStyle={{
        color: props.color,
      }}
    />
  )
}

type Props = {
  color?: keyof typeof Colors
  style?: ViewStyle
  textStyle?: TextStyle
  title?: string
  onPress: () => void
  children?: React.ReactNode
  disabled?: boolean
  direction?: 'horizontal' | 'vertical'
}
const UIButton: React.FC<Props> = ({
  color = 'Primary',
  title = '',
  onPress,
  style = undefined,
  textStyle = undefined,
  children,
  disabled = false,
  direction = 'horizontal',
}) => {
  const directionStyle: ViewStyle =
    direction === 'horizontal'
      ? {
          flexDirection: 'row',
          alignItems: 'center',
        }
      : {}
  return (
    //
    <TouchableOpacity
      style={[
        {
          backgroundColor: Colors[color],
          width: 'auto',
          height: 48,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
        },
        directionStyle,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {children ? (
        children
      ) : (
        <Text
          style={{
            color: color == 'White' ? Colors.Dark : Colors.White,
            fontSize: 14,
            ...textStyle,
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}
export default UIButton
