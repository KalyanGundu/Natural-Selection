// Copyright 2020, University of Colorado Boulder

/**
 * SpriteDirection is the direction that a NaturalSelectionSprite (bunny, wolf) is facing.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import naturalSelection from '../../naturalSelection.js';

const SpriteDirection = Enumeration.byKeys( [ 'LEFT', 'RIGHT' ], {

  // {function(Enumeration)} Called before the enumeration is frozen.
  beforeFreeze: SpriteDirection => {

    /**
     * Gets a random enumeration value.
     * @returns {SpriteDirection}
     * @public
     * @static
     */
    SpriteDirection.getRandom = () => phet.joist.random.nextBoolean() ? SpriteDirection.RIGHT : SpriteDirection.LEFT;

    /**
     * Provides the opposite direction.
     * @param {SpriteDirection} direction
     * @returns {SpriteDirection}
     * @public
     * @static
     */
    SpriteDirection.opposite = direction =>
      ( direction === SpriteDirection.RIGHT ) ? SpriteDirection.LEFT : SpriteDirection.RIGHT;

    /**
     * Converts a SpriteDirection to a sign, relative to the x axis. Used to set the sign of the x-scale, which will
     * reflect the sprite about the y axis, making it appear to face in the desired direction. This assumes that the
     * default direction for all sprites is SpriteDirection.RIGHT. For example, this means that all bunny PNG files
     * were drawn with the bunny facing right.
     * @param {SpriteDirection} direction
     * @returns {number}
     * @public
     * @static
     */
    SpriteDirection.toSign = direction => ( direction === SpriteDirection.RIGHT ) ? 1 : -1;
  }
} );

naturalSelection.register( 'SpriteDirection', SpriteDirection );
export default SpriteDirection;