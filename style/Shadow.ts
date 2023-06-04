import { ViewStyle } from 'react-native'

export function shadowCrossPlatform({
  elevation,
  opacity = 0.3,
  color = '#000000',
  offsetY = 0.5,
}: {
  elevation: number
  /** e.g. 0.3 */
  opacity?: number
  color?: string
  /** e.g. 0.5 or 1.0 */
  offsetY?: number
}): ViewStyle {
  return {
    elevation,
    shadowColor: color,
    shadowOffset: { width: 0, height: offsetY * elevation },
    shadowOpacity: opacity,
    shadowRadius: 0.8 * elevation,
  }
}
