// Copyright 2020, University of Colorado Boulder

/**
 * WolfSpriteInstance is a specialization of OrganismSpriteInstance for wolves.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sprite from '../../../../../scenery/js/util/Sprite.js';
import naturalSelection from '../../../naturalSelection.js';
import Wolf from '../../model/Wolf.js';
import OrganismSpriteInstance from './OrganismSpriteInstance.js';

class WolfSpriteInstance extends OrganismSpriteInstance {

  /**
   * @param {Wolf} wolf
   * @param {Sprite} sprite
   */
  constructor( wolf, sprite ) {

    assert && assert( wolf instanceof Wolf, 'invalid wolf' );
    assert && assert( sprite instanceof Sprite, 'invalid sprite' );

    super( wolf, sprite, {
      baseScale: 0.25
    } );
  }
}

naturalSelection.register( 'WolfSpriteInstance', WolfSpriteInstance );
export default WolfSpriteInstance;