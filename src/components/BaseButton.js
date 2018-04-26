/* @flow */

import * as React from 'react';
import { Animated } from 'react-native';
import color from 'color';
import Paper from './Paper';
import TouchableRipple from './TouchableRipple';
import { black, white } from '../styles/colors';
import withTheme from '../core/withTheme';
import type { Theme } from '../types';

const AnimatedPaper = Animated.createAnimatedComponent(Paper);

type Props = {
  /**
   * Custom text color for flat button, or background color for raised button.
   */
  backgroundColor: string,
  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean,
  /**
   * Use a compact look, useful for flat buttons in a row.
   */
  compact?: boolean,
  /**
   * Add elevation to button, as opposed to default flat appearance. Typically used on a flat surface.
   */
  raised?: boolean,
  /**
   * Use to primary color from theme. Typically used to emphasize an action.
   */
  primary?: boolean,
  /**
   * Text color of button, a dark button will render light text and vice-versa.
   */
  dark?: boolean,
  /**
   * Label text of the button.
   */
  children: string | Array<string>,
  /**
   * Function to execute on press.
   */
  onPress?: Function,
  style?: any,
  /**
   * @optional
   */
  theme: Theme,
};

type State = {
  elevation: Animated.Value,
};

/**
 * A button is component that the user can press to trigger an action.
 *
 * <div class="screenshots">
 *   <img src="screenshots/button-raised.png" />
 *   <img src="screenshots/button-primary.png" />
 *   <img src="screenshots/button-custom.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Button } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Button raised onPress={() => console.log('Pressed')}>
 *     Press me
 *   </Button>
 * );
 * ```
 */
class Button extends React.Component<Props, State> {
  state = {
    elevation: new Animated.Value(this.props.raised ? 2 : 0),
  };

  _handlePressIn = () => {
    if (this.props.raised) {
      Animated.timing(this.state.elevation, {
        toValue: 8,
        duration: 200,
      }).start();
    }
  };

  _handlePressOut = () => {
    if (this.props.raised) {
      Animated.timing(this.state.elevation, {
        toValue: 2,
        duration: 150,
      }).start();
    }
  };

  render() {
    const {
      disabled,
      compact,
      raised,
      primary,
      dark,
      loading,
      children,
      onPress,
      style,
      theme,
      backgroundColor,
      textColor
    } = this.props;
    const { colors, roundness } = theme;

    let isDark;

    if (typeof dark === 'boolean') {
      isDark = dark;
    } else {
      isDark =
        backgroundColor === 'transparent'
          ? false
          : !color(backgroundColor).light();
    }

    const rippleColor = color(textColor)
      .alpha(0.32)
      .rgb()
      .string();
    const buttonStyle = { backgroundColor, borderRadius: roundness };
    const touchableStyle = { borderRadius: roundness, alignSelf: 'stretch' }
    const elevation = disabled ? 0 : this.state.elevation;

    return (
      <AnimatedPaper
        style={[
          { elevation },
          buttonStyle,
          style,
        ]}
      >
        {disabled ? (
          children
        ) : (
          <TouchableRipple
            borderless
            delayPressIn={0}
            onPress={onPress}
            onPressIn={this._handlePressIn}
            onPressOut={this._handlePressOut}
            rippleColor={rippleColor}
            style={touchableStyle}
          >
            {children}
          </TouchableRipple>
        )}
      </AnimatedPaper>
    );
  }
}


export default withTheme(Button);
